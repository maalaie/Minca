# ADR-0002: Rust-Owned Domain and Persistence

## Status
Accepted

## Context
The application requires:
- Persistent storage of database objects, workspace assignments, hardware configuration
- Transactional integrity for multi-step operations
- Clear separation between domain logic and UI
- Future extensibility for real hardware integration

## Decision
Implement domain entities and persistence entirely in Rust with the following layer structure:

```
src-tauri/src/
├── commands/         # Tauri command handlers (thin adapters)
├── application/      # Application services (use cases)
├── domain/           # Domain entities and business logic
├── infrastructure/   # SQLite repositories, file ops, mock hardware
└── events/           # Event definitions for frontend notification
```

### Key Principles
1. **Domain entities are Rust structs** - not derived from frontend types
2. **Repositories own SQLite access** - commands call repositories, not direct SQL
3. **Transactions at application layer** - multi-step operations wrapped in transactions
4. **DTOs for serialization** - separate internal domain from IPC boundary

### Example Flow
```rust
// Command (thin)
#[tauri::command]
async fn create_database_object(
    parent_id: String,
    object_type: String,
    name: String,
    state: State<'_, AppServices>,
) -> Result<DatabaseObjectDto, AppError> {
    state
        .database_service
        .create_object(&parent_id, &object_type, &name)
        .await
        .map(|obj| obj.to_dto())
}

// Application Service
pub async fn create_object(
    &self,
    parent_id: &str,
    object_type: &str,
    name: &str,
) -> Result<DatabaseObject, CoreError> {
    // Validate
    self.validate_object_name(name)?;
    
    // Create entity
    let obj = DatabaseObject::new(parent_id, object_type, name)?;
    
    // Persist within transaction
    let mut tx = self.db.begin().await?;
    self.repo.insert(&mut tx, &obj).await?;
    tx.commit().await?;
    
    // Emit event
    self.events.emit("object-created", obj.id());
    
    Ok(obj)
}
```

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Frontend owns domain (Rust just DB access) | Simpler Rust code | Business logic in TypeScript, duplication risk | Violates separation of concerns |
| Shared types via wasm-bindgen | Single source of truth | Complex build, tight coupling | Clear boundaries more maintainable |
| ORM with macros (SeaORM, sqlx macros) | Less boilerplate | Runtime overhead, less control | Manual SQL gives full control for v0.1 |
| JSON file storage | Simple, no DB | No transactions, concurrent access issues | SQLite required for reliability |

## Consequences
### Positive
- Single source of truth for business rules
- Type-safe database operations
- Easy to test domain logic independently
- Clear migration path for real hardware (swap infrastructure layer)
- Transactions ensure data consistency

### Negative
- More boilerplate (DTOs, repositories)
- Rust compilation slower than TypeScript
- Need to maintain parallel type definitions (domain + DTO)

### Mitigation
- Use derive macros for common patterns (Clone, Debug, Serialize)
- Keep DTOs simple with From/Into traits
- Comprehensive tests at repository layer

## References
- Clean Architecture patterns
- Repository pattern
- Domain-Driven Design (simplified)
