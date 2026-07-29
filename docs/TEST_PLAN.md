# Test Plan

## Overview

This document outlines the testing strategy for M&C Workbench v0.1.

## Testing Pyramid

```
        /\
       /  \      E2E Tests (Playwright)
      /----\     - Critical user journeys
     /      \    - Visual regression
    /--------\   
   /          \  Integration Tests
  /------------\ - Component interactions
 /              \- API boundary tests
/----------------\
|                | Unit Tests (Vitest, cargo test)
|                | - Pure functions
|                | - Domain logic
|                | - Repositories
------------------
```

## Frontend Testing

### Unit Tests (Vitest + React Testing Library)

#### Tree Component Tests
- [ ] `Tree.test.tsx`
  - Renders root node
  - Expands/collapses on click
  - Expands/collapses on Enter key
  - Selects node on click
  - Shows context menu on right-click
  - Keyboard navigation (arrow keys)
  - Inline rename with F2
  - Delete confirmation dialog

#### Command System Tests
- [ ] `CommandRegistry.test.tsx`
  - Registers commands
  - isVisible predicate works
  - isEnabled predicate works
  - disabledReason returns text
  - execute calls handler
  - Error handling in execute

#### Workspace Detail Tests
- [ ] `WorkspaceDetail.test.tsx`
  - Renders 4 sections
  - Experiment section shows assignment
  - Hardware section shows mini tree
  - "Configure hardware" button opens editor
  - Empty states render correctly

#### Hardware Config Tests
- [ ] `HardwareConfigEditor.test.tsx`
  - Renders hardware tree
  - Renders parameter grid
  - Apply button persists changes
  - Reset button restores values
  - Dirty state visible
  - Tabs switch content

#### Memory Page Manager Tests
- [ ] `MemoryPageManager.test.tsx`
  - Opens as modal
  - Radio buttons change state
  - Flash programming disabled with explanation
  - File dialog opens on Download+File
  - Inspection results display
  - Warning shows on mismatch
  - Progress bar updates
  - Cancel stops operation
  - Close closes modal

#### Dialog Tests
- [ ] `ConfirmationDialog.test.tsx`
  - Renders title and message
  - Escape closes (non-destructive)
  - Enter activates primary action
  - Focus trapped within dialog
  - Cancel button works

### Integration Tests

#### Database Manager Flow
- [ ] `DatabaseManager.integration.test.tsx`
  - Load tree from mock API
  - Select node → detail updates
  - Create object → tree refreshes
  - Rename object → persists
  - Delete object → confirmation → removes

#### Persistence Flow
- [ ] `Persistence.integration.test.tsx`
  - Save layout → reload → restored
  - Create object → restart → still present
  - Comment edit → blur → saved

### E2E Tests (Playwright)

#### Critical User Journeys
- [ ] `e2e/database-flow.spec.ts`
  1. App starts
  2. Tree loads with demo data
  3. User expands Powertrain
  4. User selects Workspace
  5. Right panel shows workspace detail
  6. User clicks "Configure hardware"
  7. Hardware editor opens
  8. User changes parameter
  9. User clicks Apply
  10. Change persists after reload

- [ ] `e2e/memory-operation.spec.ts`
  1. Open Memory Page Manager
  2. Select Download action
  3. Select File source
  4. File dialog opens
  5. Select test fixture S19 file
  6. Inspection results show
  7. Click "Do it"
  8. Confirmation dialog appears
  9. Confirm
  10. Progress bar animates
  11. Completion message shows
  12. Operation log entry added

### Visual Regression Tests

#### Screenshot Comparisons
- [ ] `visual/main-database-manager.spec.ts`
  - Resolution: 1920×1050
  - Capture full window
  - Compare against baseline

- [ ] `visual/workspace-selected.spec.ts`
  - Resolution: 1920×1050
  - Workspace node selected
  - All 4 sections visible

- [ ] `visual/hardware-configuration.spec.ts`
  - Resolution: 1920×1050
  - Hardware editor open
  - Parameter grid visible

- [ ] `visual/memory-page-manager.spec.ts`
  - Resolution: 1920×1050
  - Modal open
  - File inspection results shown

## Backend Testing

### Unit Tests (cargo test)

#### Domain Layer
- [ ] `domain/database_object_tests.rs`
  - Constructor validates name
  - Constructor validates type
  - ID is UUID
  - Parent relationship valid

- [ ] `domain/hardware_config_tests.rs`
  - Draft vs applied state
  - Dirty flag set on change
  - Reset restores applied

#### Repository Layer
- [ ] `infrastructure/database_repository_tests.rs`
  - Insert creates row
  - Update modifies row
  - Delete removes row
  - FindById returns correct object
  - FindChildren returns ordered list
  - Transaction rollback on error

- [ ] `infrastructure/settings_repository_tests.rs`
  - Save layout settings
  - Load layout settings
  - Returns defaults if not found

#### S-record Parser
- [ ] `files/srecord_parser_tests.rs`
  - Valid S19 parses successfully
  - Valid S28 parses successfully
  - Valid S37 parses successfully
  - Invalid checksum rejected
  - Malformed line rejected
  - Address range computed correctly
  - Data byte count correct
  - File size limit enforced
  - Empty file handled gracefully

#### Service Layer
- [ ] `application/database_service_tests.rs`
  - Create object succeeds
  - Create with invalid name fails
  - Rename object succeeds
  - Delete object succeeds
  - Delete read-only fails
  - Duplicate creates copy

- [ ] `application/hardware_service_tests.rs`
  - Apply persists draft
  - Reset clears draft
  - Get config returns applied
  - Virtual adapter enumerated

- [ ] `application/memory_service_tests.rs`
  - Inspect valid file succeeds
  - Inspect invalid file fails
  - Start operation returns handle
  - Cancel stops operation
  - Progress updates emitted

### Integration Tests

#### Database Transactions
- [ ] `integration/transaction_tests.rs`
  - Multi-step operation atomic
  - Rollback on partial failure
  - Concurrent access handled

#### Tauri Commands
- [ ] `integration/command_tests.rs`
  - initialize_app returns state
  - create_database_object creates
  - get_workspace_detail returns detail
  - apply_hardware_configuration persists

## Performance Tests

### Frontend Performance
- [ ] `perf/tree-rendering.bench.ts`
  - Render 1,000 nodes < 100ms
  - Render 5,000 nodes < 500ms
  - Expand/collapse < 16ms (1 frame)

- [ ] `perf/splitter.bench.ts`
  - Drag update < 16ms
  - No layout shift during drag

### Backend Performance
- [ ] `perf/database_queries.bench.rs`
  - Load full tree < 50ms
  - Single object lookup < 5ms
  - Save operation < 20ms

- [ ] `perf/srecord_inspection.bench.rs`
  - 1 MB file < 1 second
  - 10 MB file < 5 seconds
  - 25 MB file < 10 seconds

## Accessibility Tests

### Manual Testing Checklist
- [ ] Keyboard navigation works throughout
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces dynamic content
- [ ] Color not sole indicator of status
- [ ] Dialog focus trap works
- [ ] All images/icons have alt text
- [ ] Form labels associated with inputs
- [ ] Error messages linked to inputs

### Automated Tests (axe-core)
- [ ] `a11y/main-screen.spec.ts`
  - No critical violations on main screen
  - No serious violations on any screen

## Security Tests

### Input Validation
- [ ] `security/sql-injection.spec.ts`
  - SQL injection attempts rejected
  - Special characters handled safely

- [ ] `security/path-traversal.spec.ts`
  - Path traversal attempts rejected
  - Only allowed directories accessible

- [ ] `security/file-upload.spec.ts`
  - Executable files rejected
  - Oversized files rejected
  - Directory upload rejected

## Test Fixtures

### S-record Files
Location: `tests/fixtures/srecord/`

- [ ] `valid-small.s19` - 10 lines, valid checksum
- [ ] `valid-medium.s19` - 1000 lines, valid checksum
- [ ] `valid-s2.srec` - S2 format example
- [ ] `invalid-checksum.s19` - One record with bad checksum
- [ ] `malformed-line.s19` - Missing fields
- [ ] `empty.s19` - Zero bytes
- [ ] `too-large.s19` - >25 MB (generated)

### Database Seeds
- [ ] `demo-database.sql` - Standard demo hierarchy
- [ ] `large-tree.sql` - 5,000 nodes for performance
- [ ] `corrupted.sql` - For error handling tests

## Test Execution

### Local Development
```bash
# Frontend unit tests
pnpm test

# Rust unit tests
cd apps/desktop/src-tauri && cargo test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Visual tests
pnpm test:visual

# All tests
pnpm check
```

### CI Pipeline
```yaml
# GitHub Actions workflow
- Checkout
- Install dependencies
- Type check (pnpm typecheck)
- Lint (pnpm lint)
- Frontend tests (pnpm test)
- Rust tests (cargo test)
- Build (pnpm build)
- E2E tests (pnpm test:e2e)
- Upload coverage
```

## Coverage Targets

| Category | Target |
|----------|--------|
| Frontend statements | 80% |
| Frontend branches | 75% |
| Frontend functions | 85% |
| Rust lines | 90% |
| Rust branches | 80% |
| Critical paths | 100% |

## Defect Management

### Severity Levels
- **P0**: Application crash, data loss, security vulnerability
- **P1**: Core feature broken, no workaround
- **P2**: Feature impaired, workaround exists
- **P3**: Minor issue, cosmetic, edge case

### Exit Criteria for v0.1
- No P0 defects open
- No P1 defects open
- P2 defects documented with workarounds
- P3 defects tracked in backlog

---

*This test plan should be updated as features are implemented.*
