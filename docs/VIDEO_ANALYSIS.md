# Video Analysis Document

## Video Metadata

**NOTE**: The reference video file `reference/Inca_6WGz1YXyai-output.mp4` was not available in the repository at time of analysis. This document is based on the detailed workflow descriptions provided in the implementation prompt (Sections 0-5).

| Property | Value |
|----------|-------|
| Source File | `Inca_6WGz1YXyai-output.mp4` |
| Expected Duration | ~4 minutes 49 seconds |
| Content | INCA 7.2 Database Manager workflow |
| Key Screens | Database Manager, Workspace View, Hardware Configuration Editor, Memory Page Manager |

## Timeline and Screen Inventory

Based on the implementation prompt's timestamp references:

### 00:00:00 - 00:00:30: Initial Database Manager

**Screen**: UI-DBM-001 Main Database Manager

**Visible Components**:
- Native window title bar
- Menu bar (File, Edit, View, Database, Tools, Window, Help)
- Compact classic toolbar with icons
- Left panel: Database Objects tree (UI-DBM-002)
- Right panel: Object detail area (UI-DBM-003)
- Bottom panel: Object Comment (UI-DBM-004)
- Status bar with filter/database path/user status

**Tree Structure Observed**:
```
DemoDatabase
├── Powertrain
│   ├── Experiment
│   ├── Experiment_1
│   └── Experiment_2
├── EngineControl
│   ├── Calibration
│   ├── Development
│   ├── WorkingDataset_A
│   ├── WorkingDataset_B
│   ├── ReferenceDataset
│   ├── NewExperiment
│   └── Workspace
├── TransmissionControl
│   ├── Experiment
│   ├── MasterDataset
│   └── Workspace
└── Templates
```

**User Actions**:
- Tree expansion/collapse
- Single selection
- Context menu invocation (right-click)

---

### 00:00:30 - 00:01:00: Context Menu Interaction

**Screen**: UI-DBM-001 with context menu overlay

**Context Menu Items** (inferred from prompt):
- Create → Experiment / Workspace / Folder
- Copy
- Paste
- Duplicate
- Rename
- Delete
- Properties
- Refresh

**Dialog**: Confirmation dialog for destructive actions (Delete)

---

### 00:01:00 - 00:02:00: Workspace Detail View

**Screen**: UI-WS-001 Workspace Experiment section

When a Workspace object is selected, right panel shows stacked sections:

**Section 3: Experiment**
- Local toolbar
- Selected experiment name display
- Add/Change/Remove buttons
- Empty state when no assignment

**Section 4: Project/Device**
- Project name
- Working dataset
- Reference dataset
- XCP device assignment
- Add/Change/Remove actions
- Status indicators

**Section 5: Hardware**
- Hierarchical hardware tree:
```
VirtualAdapter:1
└── CAN:1
    └── XCP:1
```
- "Configure hardware" command button

**Section 6: CDM Configuration**
- Toolbar
- Empty/add/change/remove states
- Disabled-state explanations

---

### 00:02:00 - 00:03:00: Project/Dataset Detail View

**Screen**: UI-PRJ-001 Project/Dataset Details

When ECU Project or Dataset is selected:

**Sections**:
- Datasets list with status indicators
- Dataset entries (Working, Reference, etc.)
- Project/Dataset Comment
- ECU Documentation section
- Object metadata panel:
  - EPK-like identifier
  - File source/path
  - Timestamp
  - Size

---

### 00:03:00 - 00:04:00: Hardware Configuration Editor

**Screen**: UI-HWC-001 Hardware Configuration Editor

Opens as dedicated window or full-workbench route.

**Layout**:
```
┌────────────────────────┬──────────────────────────────────────┐
│ 1 Hardware devices     │ 2 Parameters | 3 Info              │
│ hierarchical tree      │ property grid                       │
│                        │                                     │
├────────────────────────┼──────────────────────────────────────┤
│ Status legend          │ Property description                │
└────────────────────────┴──────────────────────────────────────┘
                                      [Additional…]
                              [Apply]              [Reset]
```

**Hardware Tree**:
```
HWK Workspace
└── VirtualAdapter:1
    ├── Serial Number: VIRTUAL-0001
    └── CAN:1
        └── XCP:1
            └── ECU OFF / No init. / no ECU access
```

**Parameter Grid Fields**:
- Name
- Measurement failure behavior
- Timestamp quantization
- Connection behavior
- Project
- Working data
- Reference data
- Differences (bytes)
- Logout behavior
- ECU description handling
- Seed & Key provider
- Seed & Key privileges
- Checksum provider
- Fast Start
- ECU Connect Mode
- CAN interface
- Confirm page switch
- CAN baud rate
- Check memory pages at initialization
- Optimized upload/download

**Status Legend**:
- Device inactive
- Device not connected
- Device connected
- No initialization / no access
- Hardware status cannot be detected

**Controls**:
- Parameters tab
- Info tab
- Apply (persists changes)
- Reset (restores last applied)
- Additional...
- Add device
- Remove device
- Initialize
- Connect
- Disconnect
- Open Memory Page Manager

**State Behavior**:
- Dirty values visibly marked
- Offline mode indicator in title/breadcrumb

---

### 00:04:00 - 00:04:49: Memory Page Manager

**Screen**: UI-MPM-001 Memory Page Manager

Modal or child window.

**Structure**:
- Title with adapter/channel/XCP device identification
- Menu: Dataset, Utilities
- Tabs: Standard, Enhanced
- Action radio buttons: Download / Copy / Flash programming
- "Apply to" selector: Data / Code & data
- From list
- To list
- Calibration access checkbox
- Device group active checkbox
- Visual source/destination diagram
- Working page / Reference page / Code page displays
- Dataset names
- Checksum states
- EPK/EPROM ID area
- Do it button
- Close button
- Auto close checkbox

**Download-from-File Flow**:
1. Native Tauri file dialog opens
2. Filters: `.s19`, `.srec`, `.mot`, optionally `.hex`
3. File selected
4. Rust parser inspects file
5. Results displayed:
   - Filename
   - File size
   - Detected format
   - Address range
   - Checksum
   - Demo EPK/EPROM ID
6. Warning if demo file ID ≠ project ID
7. Explicit confirmation required
8. Cancellable mock progress operation
9. Operation log entry added
10. Original file never modified

**Flash Programming State**:
- Disabled in v0.1
- Tooltip explains: requires real XCP/CAN implementation

---

## Panel Hierarchy Summary

```
Main Application Window
├── Menu Bar
├── Main Toolbar
├── Content Area (resizable split)
│   ├── Left Panel (~22-24% width)
│   │   ├── Database Objects Tree
│   │   └── Object Comment (below tree, resizable vertical split)
│   └── Right Panel (dynamic content)
│       ├── Workspace Detail (stacked sections 3-6)
│       ├── Project/Dataset Detail
│       ├── Hardware Configuration Editor (separate window/route)
│       └── Memory Page Manager (modal/child window)
└── Status Bar
```

## Interaction Patterns

### Tree Navigation
- Click: Select
- Double-click: Expand/collapse or open default action
- Right-click: Context menu
- Arrow keys: Navigate
- Enter: Activate/expand
- F2: Inline rename
- Delete: Delete with confirmation
- Ctrl+C/V: Copy/Paste

### Dialogs
- Escape: Close (non-destructive)
- Enter: Primary action
- Tab: Navigate between fields
- Focus trap within modal

### Splitter Behavior
- Drag to resize
- Double-click to reset to default
- Positions persisted across sessions

### Context Menus
- Appear on right-click
- Disabled items show reason on hover
- Destructive actions require confirmation

## Data Object Types Identified

| Type | Description |
|------|-------------|
| Database | Root container |
| Folder | Organizational container |
| Experiment | Test/experiment configuration |
| Workspace | Working environment binding experiments, projects, hardware |
| ECU Project | ECU-specific project with datasets |
| Dataset | Calibration/measurement dataset (Working, Reference) |
| CDM Configuration | Configuration module assignment |
| Hardware Device | Virtual or physical adapter |
| CAN Channel | CAN bus channel configuration |
| XCP Device | XCP protocol device |
| Memory Page | ECU memory page mapping |

## Transitions Between Screens

1. **Database Manager → Workspace Detail**: Select Workspace node in tree
2. **Database Manager → Project/Dataset Detail**: Select ECU Project or Dataset node
3. **Workspace → Hardware Config**: Click "Configure hardware" in Hardware section
4. **Hardware Config → Memory Page Manager**: Click "Open Memory Page Manager" button
5. **Memory Page Manager → File Dialog**: Select Download + File, then browse
6. **Any → Confirmation Dialog**: Trigger destructive action (Delete, Flash)

## Open Questions

| ID | Question | Resolution |
|----|----------|------------|
| Q-001 | Exact color values for status indicators? | Use standard semantic colors (green/orange/red/blue) per design tokens |
| Q-002 | Specific icon designs for each object type? | Create original SVG icons following Fluent System Icons style |
| Q-003 | Maximum tree depth supported? | Design for 10+ levels; test with demo hierarchy |
| Q-004 | S-record file size limit for inspection? | Cap at 25 MB for v0.1 |
| Q-005 | Exact layout percentages for splits? | Left panel: 22-24%; Tree/Comment: 70/30 default |
| Q-006 | Keyboard shortcuts for all commands? | Implement common ones (Ctrl+N, Ctrl+O, F2, Del); others deferred |

## Implementation Priority

**P0 (Required for v0.1)**:
1. Main application shell with menu/toolbar/statusbar
2. Database tree with CRUD operations
3. Workspace detail view with 4 sections
4. Hardware Configuration Editor
5. Memory Page Manager with file picker
6. SQLite persistence
7. Command registry
8. Context menus
9. Confirmation dialogs
10. Layout persistence

**P1 (Important but can be minimal)**:
1. Tooltips on all commands
2. Inline rename
3. Copy/Paste/Duplicate
4. Property grid in Hardware Config
5. S-record inspection results display

**P2 (Deferred or minimal in v0.1)**:
1. Enhanced tab in Memory Page Manager
2. Complex docking layouts
3. Full keyboard shortcut coverage
4. Advanced filtering/search in trees
5. Visual comparison automation

---

*Document created based on implementation prompt specifications. Video file not available for direct analysis.*
