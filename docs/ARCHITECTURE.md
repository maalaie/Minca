# Architecture Document

## System Context

```
┌─────────────────────────────────────────────────────────────────┐
│                         User                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   M&C Workbench v0.1                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   React     │◄─┤   Tauri    │─►│   Rust Backend          │ │
│  │  Frontend   │  │   Bridge   │  │  - Domain Layer         │ │
│  │  (TypeScript)│  │  (IPC)     │  │  - Application Layer    │ │
│  └─────────────┘  └─────────────┘  │  - Infrastructure       │ │
│                                     │  - Persistence (SQLite) │ │
│                                     └─────────────────────────┘
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     External Systems                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ File System  │  │   SQLite     │  │  Mock Hardware       │  │
│  │ (S19/SREC)   │  │  Database    │  │  (Virtual Adapter)   │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend/Backend Boundaries

### Frontend Responsibilities
- UI rendering and user interaction
- Local state management (Zustand)
- Form validation (React Hook Form + Zod)
- Command invocation
- Layout management

### Backend Responsibilities
- Domain logic and validation
- Database operations (SQLite)
- File parsing (S-record)
- Mock hardware simulation
- Event emission for state changes

### Communication Boundary
- Tauri commands for request/response
- Tauri events for notifications
- No direct database access from frontend
- No business logic in frontend components

## Command Flow

```
User Action (click, keyboard)
        │
        ▼
┌──────────────────┐
│  CommandContext  │
│  (selection,     │
│   state)         │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ WorkbenchCommand │
│ - isVisible()    │
│ - isEnabled()    │
│ - execute()      │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│  API Service     │
│  (frontend)      │
└──────────────────┘
        │
        │ invoke_command(...)
        ▼
┌──────────────────┐
│  Tauri Command   │
│  (Rust)          │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Application      │
│ Service (Rust)   │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Domain Layer     │
│ (entities,       │
│  validation)     │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Infrastructure   │
│ (SQLite repo,    │
│  file ops)       │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│ Result/Error     │
│ (serialized)     │
└──────────────────┘
        │
        │ via event or response
        ▼
┌──────────────────┐
│  Frontend State  │
│  Update          │
└──────────────────┘
        │
        ▼
┌──────────────────┐
│  UI Re-render    │
└──────────────────┘
```

## Persistence Flow

### Object Creation
```
User creates object
        │
        ▼
Frontend validates input
        │
        ▼
invoke_command("create_database_object", { parentId, type, name })
        │
        ▼
Rust command validates
        │
        ▼
Domain entity created
        │
        ▼
Repository.insert() within transaction
        │
        ▼
SQLite persists
        │
        ▼
Event emitted: "object-created"
        │
        ▼
Frontend refreshes tree
```

### Layout Persistence
```
User resizes splitter
        │
        ▼
Frontend updates Zustand state
        │
        ▼
Debounced save (500ms)
        │
        ▼
invoke_command("save_layout", { mainSplit, treeCommentSplit })
        │
        ▼
Rust stores in settings table
        │
        ▼
Confirmation returned
```

### Startup Restoration
```
App starts
        │
        ▼
invoke_command("initialize_app")
        │
        ▼
Rust loads:
  - Database tree
  - Last selected object
  - Layout settings
  - Operation log
        │
        ▼
Returns initial state
        │
        ▼
Frontend initializes stores
        │
        ▼
UI renders with restored state
```

## Mock Hardware Boundary

### Interface Definition (Rust)
```rust
pub trait CanAdapter: Send + Sync {
    fn id(&self) -> &str;
    fn display_name(&self) -> &str;
    fn enumerate_channels(&self) -> Result<Vec<CanChannelInfo>, CoreError>;
    fn open_channel(&self, config: CanChannelConfig) -> Result<Box<dyn CanChannel>, CoreError>;
}

pub trait XcpTransport: Send + Sync {
    fn connect(&mut self) -> Result<(), CoreError>;
    fn disconnect(&mut self) -> Result<(), CoreError>;
    fn send_cto(&mut self, payload: &[u8]) -> Result<Vec<u8>, CoreError>;
}

pub trait MemoryOperationService: Send + Sync {
    fn inspect_file(&self, path: &Path) -> Result<MemoryFileInfo, CoreError>;
    fn start_operation(&self, request: MemoryOperationRequest) -> Result<OperationId, CoreError>;
    fn cancel_operation(&self, id: OperationId) -> Result<(), CoreError>;
}
```

### Version 0.1 Implementations
- `VirtualCanAdapter` - returns mock channel info
- `VirtualXcpTransport` - simulates connection states
- `MockMemoryOperationService` - fake progress, no real operations

### Future Real Integration Points
- PEAK-System PCAN adapter
- Kvaser CAN adapter
- Vector VN16xx interface
- ETAS ES58x devices

Integration will occur by implementing the traits above without changing domain logic.

## Error Handling

### Error Types (Rust)
```rust
pub enum CoreError {
    NotFound(String),
    Validation(String),
    Database(SqliteError),
    Io(std::io::Error),
    Parse(String),
    Hardware(String),
    Canceled,
}

pub enum AppError {
    code: String,
    message: String,
    userMessage: String,
    details: Option<Value>,
    recoverable: bool,
}
```

### Error Mapping
```
CoreError::NotFound     → APP_NOT_FOUND (recoverable)
CoreError::Validation   → APP_VALIDATION (recoverable)
CoreError::Database     → APP_DATABASE (may be unrecoverable)
CoreError::Io           → APP_IO (depends on context)
CoreError::Parse        → APP_PARSE (recoverable)
CoreError::Hardware     → APP_HARDWARE (recoverable in virtual mode)
CoreError::Canceled     → APP_CANCELED (informational)
```

### Frontend Error Display
- Recoverable errors: toast notification or inline error
- Unrecoverable errors: modal dialog with retry option
- All errors logged to operation log

## Progress and Cancellation

### Long Operation Pattern
```rust
// Rust side
pub struct OperationHandle {
    id: OperationId,
    cancel_sender: CancellationToken,
    progress_receiver: Receiver<ProgressUpdate>,
}

pub async fn start_memory_operation(
    &self,
    request: MemoryOperationRequest,
) -> Result<OperationHandle, CoreError> {
    let (cancel_tx, cancel_rx) = tokio::sync::broadcast::channel(1);
    let (progress_tx, progress_rx) = tokio::sync::mpsc::channel(100);
    
    // Spawn background task
    tokio::spawn(async move {
        // Perform operation with progress updates
        for step in steps {
            if cancel_rx.try_recv().is_ok() {
                return Err(CoreError::Canceled);
            }
            progress_tx.send(ProgressUpdate { current, total }).await.ok();
        }
    });
    
    Ok(OperationHandle { ... })
}
```

### Frontend Progress Display
```tsx
// Frontend subscribes to progress events
const { progress, isRunning, cancel } = useOperationProgress(operationId);

return (
  <ProgressBar
    value={progress.percent}
    onCancel={cancel}
    label={progress.label}
  />
);
```

## Extension Strategy

### Adding New Object Types
1. Add type to `DatabaseObjectType` union (TypeScript/Rust)
2. Add icon to icon registry
3. Add detail view component
4. Add CRUD commands
5. Add database migration if new fields needed

### Adding New Hardware Adapters
1. Implement `CanAdapter` trait
2. Register in adapter registry
3. Add configuration UI if needed
4. Test with hardware simulator first

### Adding New Commands
1. Define command in `WorkbenchCommand` registry
2. Add Tauri command handler
3. Add application service method
4. Wire to menu/toolbar/context menu
5. Add tests

### Adding New Dialogs
1. Create dialog component with consistent structure
2. Use existing dialog hooks for state
3. Follow accessibility patterns (focus trap, Escape handling)
4. Add to command system if triggered by commands

---

*This architecture supports incremental development while maintaining clear boundaries for future expansion.*
