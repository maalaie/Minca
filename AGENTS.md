# AGENTS.md - M&C Workbench Development Guide

## Project Overview

M&C Workbench v0.1 is an INCA-inspired automotive measurement and calibration workbench built with React, TypeScript, Tauri 2, and Rust. This is an **offline functional vertical slice** that demonstrates workflows without requiring real hardware.

## Quick Reference

### Tech Stack
- **Frontend**: React 18, TypeScript, Vite, Zustand, CSS Modules
- **Desktop**: Tauri 2
- **Backend**: Rust stable, SQLite (sqlx)
- **Testing**: Vitest, React Testing Library, Playwright, cargo test

### Key Directories
```
/workspace/
├── apps/desktop/src/          # Frontend source
├── apps/desktop/src-tauri/    # Rust backend
├── docs/                      # Documentation
│   ├── REQUIREMENTS.md        # Functional requirements
│   ├── ARCHITECTURE.md        # System architecture
│   ├── UI_INVENTORY.md        # UI components with IDs
│   └── adr/                   # Architecture Decision Records
└── tests/fixtures/            # Test fixtures
```

## Development Principles

### 1. Analysis First
Before implementing any feature:
1. Check `docs/REQUIREMENTS.md` for relevant requirements
2. Check `docs/UI_INVENTORY.md` for component specifications
3. Check `docs/ASSUMPTIONS.md` for documented decisions
4. If unclear, add to assumptions rather than guessing

### 2. No Proprietary Assets
- **DO NOT** use ETAS/INCA names, logos, or icons
- **DO NOT** copy tooltip text verbatim from reference
- **DO** create original SVG icons
- **DO** use generic technical language

### 3. Virtual Mode Explicit
- Always indicate "OFFLINE MODE" or "VIRTUAL MODE" clearly
- Never claim real hardware operations
- Mock operations must show progress but not claim actual hardware modification
- Disabled features should explain why (e.g., "Requires real XCP/CAN")

### 4. Type Safety
- TypeScript: `strict: true`, no `any` without documentation
- Rust: No `unwrap()` in production code, proper error types
- Use Zod for runtime validation at boundaries

### 5. Command Pattern
All user actions flow through the command registry:
```typescript
interface WorkbenchCommand {
  id: string;
  label: string;
  isVisible(context): boolean;
  isEnabled(context): boolean;
  disabledReason?(context): string | undefined;
  execute(context): Promise<void>;
}
```

## Implementation Order

Follow milestones strictly:

### Milestone 0: Analysis ✅ COMPLETE
- [x] Video analysis document
- [x] UI inventory
- [x] Requirements specification
- [x] Architecture document
- [x] Assumptions documented
- [x] ADRs created

### Milestone 1: Workbench Shell
- [ ] Tauri 2 app initialized
- [ ] Main menu bar
- [ ] Compact toolbar
- [ ] Split layout (CSS Grid)
- [ ] Panel headers
- [ ] Status bar
- [ ] Classic theme tokens
- [ ] Layout persistence

### Milestone 2: Database Manager
- [ ] SQLite schema + migrations
- [ ] Seed demo database
- [ ] Tree component with CRUD
- [ ] Selection state
- [ ] Comment panel
- [ ] Context menus
- [ ] Confirmation dialogs
- [ ] Persistence

### Milestone 3: Workspace and Project Views
- [ ] Dynamic right-side views
- [ ] Experiment section (Section 3)
- [ ] Project/device section (Section 4)
- [ ] Hardware section (Section 5)
- [ ] CDM section (Section 6)
- [ ] Dataset metadata view
- [ ] ECU documentation sections

### Milestone 4: Hardware Configuration Editor
- [ ] Dedicated route/window
- [ ] Hardware tree
- [ ] Parameter grid
- [ ] Parameters/Info tabs
- [ ] Apply/Reset functionality
- [ ] Dirty state marking
- [ ] Offline/virtual indicators
- [ ] Open Memory Page Manager button

### Milestone 5: Memory Page Manager
- [ ] Standard/Enhanced tabs
- [ ] Action/scope/source/destination state
- [ ] Native file picker (.s19, .srec, .mot)
- [ ] S-record inspection (Rust parser)
- [ ] Mismatch warning
- [ ] Confirmation dialog
- [ ] Mock progress/cancel
- [ ] Operation log entry

### Milestone 6: Testing and Fidelity
- [ ] Automated tests
- [ ] Visual screenshots
- [ ] Visual comparison document updated
- [ ] Accessibility pass
- [ ] Performance pass
- [ ] Packaging verification
- [ ] README updated with screenshots

## Coding Standards

### TypeScript
```typescript
// ✅ Good: Typed, exhaustive
type ObjectType = 'database' | 'folder' | 'experiment';

function createObject(type: ObjectType, name: string) {
  switch (type) {
    case 'database': return createDatabase(name);
    case 'folder': return createFolder(name);
    case 'experiment': return createExperiment(name);
  }
}

// ❌ Bad: Any, non-null assertions
function createObject(type: any, name: string) {
  if (type === 'database') {
    return createDatabase(name!);
  }
}
```

### Rust
```rust
// ✅ Good: Proper error handling
pub fn create_object(
    &self,
    name: &str,
) -> Result<DatabaseObject, CoreError> {
    validate_name(name)?;
    let obj = DatabaseObject::new(name)?;
    self.repo.insert(&obj).await?;
    Ok(obj)
}

// ❌ Bad: unwrap in production
pub fn create_object(&self, name: &str) -> DatabaseObject {
    let obj = DatabaseObject::new(name).unwrap();
    self.repo.insert(&obj).await.unwrap();
    obj
}
```

### CSS
```css
/* ✅ Good: Token-based, compact */
.tree-node {
  height: var(--tree-row-height); /* 20px */
  font-size: var(--font-size-ui); /* 12px */
  padding: var(--space-1) var(--space-2); /* 2px 4px */
}

/* ❌ Bad: Modern spacious web app style */
.tree-node {
  height: 48px;
  font-size: 16px;
  padding: 16px;
  border-radius: 8px;
}
```

## Common Patterns

### Creating a New Feature Component
1. Add requirement to `docs/REQUIREMENTS.md` (if missing)
2. Create component in `apps/desktop/src/features/feature-name/`
3. Add CSS Module for styling
4. Wire to command registry
5. Add Tauri command if backend needed
6. Write tests
7. Update documentation

### Adding a Tauri Command
```rust
// 1. Command handler (thin)
#[tauri::command]
async fn my_command(
    arg1: String,
    state: State<'_, AppServices>,
) -> Result<MyDto, AppError> {
    state.my_service.do_work(&arg1).await.map(|r| r.to_dto())
}

// 2. Register in main.rs
.invoke_handler(tauri::generate_handler![my_command])

// 3. Frontend wrapper
export async function myCommand(arg1: string) {
  return invoke('my_command', { arg1 });
}
```

### Adding Database Entity
```rust
// 1. Domain entity
#[derive(Clone, Debug)]
pub struct MyEntity {
    id: String,
    // ... fields
}

// 2. Repository trait
pub trait MyRepository: Send + Sync {
    async fn find_by_id(&self, id: &str) -> Result<Option<MyEntity>, CoreError>;
    async fn insert(&self, entity: &MyEntity) -> Result<(), CoreError>;
}

// 3. SQLite implementation
pub struct SqliteMyRepository { pool: SqlitePool }

// 4. Migration in SQL file
CREATE TABLE IF NOT EXISTS my_entities (
    id TEXT PRIMARY KEY,
    -- ... columns
);
```

## Testing Checklist

Before marking a milestone complete:
- [ ] Frontend type check passes (`pnpm typecheck`)
- [ ] Rust formatting passes (`cargo fmt --check`)
- [ ] Rust clippy passes (`cargo clippy -- -D warnings`)
- [ ] Frontend tests pass (`pnpm test`)
- [ ] Rust tests pass (`cargo test`)
- [ ] Build succeeds (`pnpm build`)

## Known Gotchas

### Tauri 2 Specific
- Use `@tauri-apps/api` v2 imports
- Capabilities configured in `tauri.conf.json`
- Events use new event API

### SQLite
- Always use transactions for multi-step writes
- Indexes on foreign keys and frequently queried columns
- Migrations run on startup

### S-record Parser
- Never allocate based on untrusted address values
- Use saturating arithmetic
- Cap file size at 25 MB for inspection
- Validate checksums before processing

## When in Doubt

1. **Check documentation first**: Most answers are in `/workspace/docs/`
2. **Follow existing patterns**: Look at similar implemented features
3. **Document assumptions**: If you must decide, record it in `ASSUMPTIONS.md`
4. **Prefer simple over clever**: Maintainability > cleverness
5. **Test incrementally**: Don't implement everything before testing

## Communication

When reporting progress or asking for clarification:
1. Reference specific requirement IDs (e.g., "FR-DBM-005")
2. Include relevant file paths
3. Show actual vs. expected behavior
4. Provide reproduction steps for issues

---

**Remember**: This is v0.1 - a vertical slice demonstrating workflows. Focus on getting the core experience right rather than implementing every possible feature.
