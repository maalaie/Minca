# M&C Workbench v0.1 - Implementation Plan

## Current Status

**Milestone 0 (Analysis) - COMPLETE**

The following analysis documents have been created:

- ✅ `docs/VIDEO_ANALYSIS.md` - Video workflow analysis and screen inventory
- ✅ `docs/UI_INVENTORY.md` - UI component inventory with stable identifiers
- ✅ `docs/REQUIREMENTS.md` - Functional and non-functional requirements
- ✅ `docs/ASSUMPTIONS.md` - Documented assumptions and decisions
- ✅ `docs/ARCHITECTURE.md` - System architecture documentation
- ✅ `docs/SECURITY.md` - Security controls and threat model
- ✅ `docs/TEST_PLAN.md` - Testing strategy and requirements
- ✅ `docs/VISUAL_COMPARISON.md` - Visual regression testing plan
- ✅ `docs/adr/` - Architecture Decision Records (5 ADRs)

**Note**: The reference video file (`reference/Inca_6WGz1YXyai-output.mp4`) is not present in the repository. All analysis is based on the detailed implementation prompt specifications.

## Repository Structure Created

```
mnc-workbench/
├── AGENTS.md                          # Agent instructions
├── README.md                          # Main documentation
├── .gitignore                         # Git ignore rules
├── reference/                         # Reference video (to be added)
├── docs/                              # Documentation
│   ├── VIDEO_ANALYSIS.md
│   ├── UI_INVENTORY.md
│   ├── REQUIREMENTS.md
│   ├── ASSUMPTIONS.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   ├── TEST_PLAN.md
│   ├── VISUAL_COMPARISON.md
│   └── adr/                           # Architecture Decision Records
├── apps/                              # Applications
│   └── desktop/                       # Main Tauri application
│       ├── src/                       # Frontend source (to be created)
│       └── src-tauri/                 # Rust backend (to be created)
├── packages/                          # Shared packages
│   ├── ui-kit/                        # UI component library
│   ├── command-system/                # Command registry
│   └── contracts/                     # TypeScript/Rust type contracts
├── scripts/                           # Build and utility scripts
└── tests/                             # Test fixtures and e2e tests
    └── fixtures/
        └── srecord/                   # S-record test files
```

## Next Milestones

### Milestone 1 — Workbench Shell

**Objective**: Create the basic Tauri 2 application shell with classic theme.

**Deliverables**:
1. Initialize pnpm workspace with root `package.json`
2. Create Vite + React + TypeScript frontend in `apps/desktop/`
3. Initialize Tauri 2 backend in `apps/desktop/src-tauri/`
4. Implement design tokens CSS
5. Create main application shell components:
   - Menu bar
   - Main toolbar
   - Split pane layout
   - Panel headers
   - Status bar
6. Implement layout persistence with SQLite

**Estimated effort**: 2-3 days

---

### Milestone 2 — Database Manager

**Objective**: Implement interactive database object management.

**Deliverables**:
1. SQLite schema and migrations for database objects
2. Seed demo database hierarchy
3. Tree component with:
   - Expand/collapse
   - Single selection
   - Keyboard navigation
   - Context menu
   - Inline rename
4. CRUD operations (Create, Rename, Delete, Duplicate, Copy, Paste)
5. Confirmation dialogs for destructive actions
6. Object comment panel
7. Persistence layer

**Estimated effort**: 3-4 days

---

### Milestone 3 — Workspace and Project/Dataset Views

**Objective**: Dynamic right-side views based on tree selection.

**Deliverables**:
1. Workspace detail view with 4 sections:
   - Experiment section
   - Project/device section
   - Hardware section
   - CDM configuration section
2. Project/Dataset detail view with:
   - Datasets list
   - Metadata display
   - ECU documentation section
3. Section toolbars and actions
4. State management for selections

**Estimated effort**: 2-3 days

---

### Milestone 4 — Hardware Configuration Editor

**Objective**: Dedicated hardware configuration window/editor.

**Deliverables**:
1. Separate Tauri window or full-workbench route
2. Hardware device tree
3. Parameter grid with tabs (Parameters/Info)
4. Apply/Reset functionality
5. Dirty state tracking
6. Offline/virtual mode indicators
7. Status legend
8. "Open Memory Page Manager" action

**Estimated effort**: 3-4 days

---

### Milestone 5 — Memory Page Manager

**Objective**: Memory page operations with S-record file handling.

**Deliverables**:
1. Modal dialog or child window
2. Standard/Enhanced tabs
3. Action radio buttons (Download/Copy/Flash)
4. Native file picker integration
5. S-record parser in Rust
6. File inspection results display
7. Mismatch warning dialog
8. Mock progress operation with cancellation
9. Operation log entries
10. Flash programming disabled with explanation

**Estimated effort**: 3-4 days

---

### Milestone 6 — Testing and Fidelity

**Objective**: Complete testing suite and visual verification.

**Deliverables**:
1. Frontend unit tests (Vitest + React Testing Library)
2. Rust unit tests
3. S-record parser property tests
4. Visual regression screenshots
5. Accessibility audit
6. Performance optimization
7. Production build verification
8. Updated README with screenshots

**Estimated effort**: 2-3 days

---

## Implementation Sequence

```
Week 1: Milestones 1-2 (Shell + Database Manager)
Week 2: Milestones 3-4 (Workspace/Hardware Config)
Week 3: Milestones 5-6 (Memory Page Manager + Testing)
```

## Technical Decisions Made

1. **Package Manager**: pnpm (workspace support, disk efficiency)
2. **State Management**: Zustand (lightweight, focused stores)
3. **Styling**: CSS Modules with design tokens
4. **Database**: SQLite via sqlx (Rust-owned persistence)
5. **Testing**: Vitest (frontend), cargo test (Rust), Playwright (e2e)
6. **Icons**: Original SVG icons + Fluent System Icons
7. **Layout**: CSS Grid with explicit splitters (no docking framework for v0.1)

## Open Items Requiring User Input

1. **Reference Video**: The video file `reference/Inca_6WGz1YXyai-output.mp4` needs to be added to the repository for frame extraction and detailed visual comparison.

2. **Windows Development Environment**: Full Tauri build requires Windows with Visual Studio Build Tools. Current environment is Linux-based.

3. **Icon Design**: Confirm preference for original icon designs vs. Fluent System Icons as base.

## Immediate Next Steps

1. Create root `package.json` with pnpm workspace configuration
2. Initialize frontend application with Vite + React + TypeScript
3. Initialize Tauri 2 backend with Rust
4. Set up basic project structure and imports
5. Implement design tokens and shell components

---

*This plan follows the milestone structure defined in the Master Implementation Prompt (Section 18).*
