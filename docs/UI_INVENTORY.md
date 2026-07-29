# UI Inventory

## Screen Identifiers

| ID | Screen/Component | Description |
|----|------------------|-------------|
| UI-DBM-001 | Main Database Manager | Primary application window |
| UI-DBM-002 | Database Objects Tree | Hierarchical tree view (left panel) |
| UI-DBM-003 | Object Detail Area | Dynamic content area (right panel) |
| UI-DBM-004 | Comment Panel | Object comment editor (below tree) |
| UI-WS-001 | Workspace Experiment Section | Section 3 in workspace detail |
| UI-WS-002 | Project/Device Section | Section 4 in workspace detail |
| UI-WS-003 | Hardware Section | Section 5 in workspace detail |
| UI-WS-004 | CDM Configuration Section | Section 6 in workspace detail |
| UI-HWC-001 | Hardware Configuration Editor | Dedicated hardware config window |
| UI-HWC-002 | Hardware Device Tree | Left panel of HWC editor |
| UI-HWC-003 | Parameter Grid | Property grid in HWC editor |
| UI-MPM-001 | Memory Page Manager | Memory operations dialog/window |
| UI-MPM-002 | S-record File Selection | Native file picker flow |
| UI-PRJ-001 | Project/Dataset Detail | Detail view for ECU projects/datasets |
| UI-DLG-001 | Confirmation Dialog | Generic confirmation dialog |
| UI-DLG-002 | Error/Warning Dialog | Error/warning message dialog |
| UI-MNU-001 | Main Menu Bar | Application menu bar |
| UI-MNU-002 | Context Menu | Right-click context menu |
| UI-TBR-001 | Main Toolbar | Primary toolbar |
| UI-TBR-002 | Section Toolbar | Local toolbar within sections |
| UI-STB-001 | Status Bar | Bottom status bar |
| UI-SPL-001 | Vertical Splitter | Left/right panel splitter |
| UI-SPL-002 | Horizontal Splitter | Tree/comment splitter |

---

## Component Details

### UI-DBM-001: Main Database Manager

**Container Type**: Main application window

**Child Components**:
- UI-MNU-001 (Menu Bar)
- UI-TBR-001 (Main Toolbar)
- UI-SPL-001 (Vertical Splitter)
  - Left subtree: UI-DBM-002, UI-DBM-004
  - Right subtree: UI-DBM-003
- UI-STB-001 (Status Bar)

**Layout Constraints**:
- Left panel: 22-24% of content width
- Tree/Comment split: ~70/30 default
- Minimum left panel width: 200px
- Minimum right panel width: 400px

**State Properties**:
- `leftPanelWidth: number`
- `treeCommentSplit: number`
- `selectedObjectId: string | null`
- `expandedNodeIds: Set<string>`

---

### UI-DBM-002: Database Objects Tree

**Component Type**: Hierarchical tree view

**Features**:
- Expand/collapse nodes
- Single selection
- Keyboard navigation (arrow keys, Enter, F2, Delete)
- Inline rename (F2)
- Context menu (right-click)
- Drag-and-drop (deferred)
- Checkbox selection (deferred)

**Node Properties**:
```ts
interface TreeNode {
  id: string;
  parentId: string | null;
  type: DatabaseObjectType;
  name: string;
  icon: string;
  children?: TreeNode[];
  readOnly: boolean;
  status?: "ok" | "warning" | "error" | "offline";
  expanded: boolean;
  selected: boolean;
}
```

**Supported Operations**:
- Create child object
- Copy node
- Paste as child
- Duplicate
- Rename
- Delete
- Refresh
- Show properties

**Icon Mapping**:
| Object Type | Icon Name |
|-------------|-----------|
| database | icon-database |
| folder | icon-folder |
| experiment | icon-experiment |
| workspace | icon-workspace |
| ecuProject | icon-ecu-project |
| dataset | icon-dataset |
| workingDataset | icon-working-dataset |
| referenceDataset | icon-reference-dataset |

---

### UI-DBM-003: Object Detail Area

**Component Type**: Dynamic content container

**Content Variants**:
- Workspace detail (when Workspace selected)
- Project/Dataset detail (when ECU Project or Dataset selected)
- Empty state (when nothing or non-detail object selected)
- Folder detail (minimal, deferred)

**Rendering Strategy**: Switch based on `selectedObject.type`

---

### UI-DBM-004: Comment Panel

**Component Type**: Text editor (textarea or contenteditable)

**Features**:
- Multi-line text input
- Auto-save on blur or debounce
- Character count (optional)
- Read-only indicator if object is read-only

**State**:
- `commentText: string`
- `isDirty: boolean`
- `isSaving: boolean`

---

### UI-WS-001 to UI-WS-004: Workspace Sections

**Component Type**: Stacked section panels

**Common Structure**:
```tsx
<section className="workspace-section">
  <header className="section-header">
    <span className="section-number">3</span>
    <h3>Experiment</h3>
    <div className="section-toolbar">...</div>
  </header>
  <div className="section-content">
    {/* Content based on assignment state */}
  </div>
</section>
```

**Section 3: Experiment**
- Assigned experiment display
- Add/Change/Remove buttons
- Empty state: "No experiment assigned"

**Section 4: Project/Device**
- Project name
- Working dataset badge
- Reference dataset badge
- XCP device assignment
- Status indicators

**Section 5: Hardware**
- Mini hardware tree (read-only summary)
- "Configure hardware" button → opens UI-HWC-001

**Section 6: CDM Configuration**
- Assigned CDM modules list
- Add/Change/Remove
- Disabled state with explanation

---

### UI-HWC-001: Hardware Configuration Editor

**Component Type**: Dedicated editor window/route

**Layout**:
```
┌─────────────────────┬───────────────────────┐
│ Hardware Tree       │ Parameters | Info     │
│ (UI-HWC-002)        │ (UI-HWC-003)          │
├─────────────────────┼───────────────────────┤
│ Status Legend       │ Property Description  │
└─────────────────────┴───────────────────────┘
                        [Additional] [Apply] [Reset]
```

**State Model**:
```ts
interface HardwareConfigState {
  mode: "offline" | "virtual" | "online";
  devices: HardwareNode[];
  selectedNodeId: string | null;
  draftProperties: Record<string, PropertyValue>;
  appliedProperties: Record<string, PropertyValue>;
  dirty: boolean;
}
```

---

### UI-HWC-002: Hardware Device Tree

**Component Type**: Hierarchical tree (similar to UI-DBM-002)

**Root**: "HWK Workspace"

**Default Structure**:
```
HWK Workspace
└── VirtualAdapter:1
    ├── Serial Number: VIRTUAL-0001
    └── CAN:1
        └── XCP:1
            └── ECU OFF / No init. / no ECU access
```

**Node Types**:
- adapter
- canChannel
- xcpDevice
- ecuInstance

**Status Indicators**:
- inactive (gray)
- notConnected (orange)
- connected (green)
- noInit (yellow)
- cannotDetect (red)

---

### UI-HWC-003: Parameter Grid

**Component Type**: Property grid / table

**Columns**:
| Column | Width | Editable |
|--------|-------|----------|
| Name | 200px | No |
| Value | 250px | Yes (type-dependent) |
| Unit | 80px | No |
| Description | auto | No |

**Property Types**:
- String (text input)
- Integer (number input with min/max)
- Enum (dropdown)
- Boolean (checkbox)
- FilePath (text + browse button)

**Dirty State**: Changed cells highlighted with background color

---

### UI-MPM-001: Memory Page Manager

**Component Type**: Modal dialog or child window

**Tabs**:
- Standard (default)
- Enhanced (deferred/minimal in v0.1)

**Action Radio Group**:
- Download
- Copy
- Flash programming (disabled in v0.1)

**Scope Selector**:
- Data
- Code & data

**Source/Destination Lists**:
- From: [File, ECU, Dataset options]
- To: [ECU, Dataset, File options]

**Checkboxes**:
- Calibration access
- Device group active
- Auto close

**Visual Diagram**: Source → Destination flow illustration

**Page Displays**:
- Working page info
- Reference page info
- Code page info
- Checksum status
- EPK/EPROM ID

**Buttons**:
- Do it (primary action)
- Close
- Additional... (deferred)

---

### UI-MPM-002: S-record File Selection

**Component Type**: Native Tauri file dialog

**Filters**:
```ts
[
  { name: "Motorola S-record", extensions: ["s19", "srec"] },
  { name: "Motorola S-record (alternative)", extensions: ["mot"] },
  { name: "Intel HEX", extensions: ["hex"] }, // optional
]
```

**Post-Selection Flow**:
1. Display selected file path
2. Invoke Rust parser via Tauri command
3. Show inspection results:
   - Filename
   - Size (bytes)
   - Format (S19/S28/S37/HEX)
   - Address range (start-end)
   - Data byte count
   - Checksum status
   - EPK/EPROM ID (demo value)
4. Compare with project ID → show warning if mismatch
5. Require explicit confirmation
6. Start mock progress operation
7. Log operation result

---

### UI-PRJ-001: Project/Dataset Detail

**Component Type**: Multi-section detail view

**Sections**:
1. Datasets list
2. Dataset entries with status
3. Comment area
4. ECU Documentation
5. Metadata panel

**Metadata Fields**:
- EPK identifier
- File source/path
- Timestamp (created/modified)
- Size (bytes)

**Status Indicators**:
- Valid (green check)
- Warning (yellow triangle)
- Invalid (red X)
- Unknown (gray circle)

---

### UI-DLG-001: Confirmation Dialog

**Component Type**: Modal dialog

**Structure**:
```
┌────────────────────────────────────┐
│ [Icon] Confirmation Title          │
├────────────────────────────────────┤
│ Message text explaining action     │
│ and consequences                   │
├────────────────────────────────────┤
│              [Cancel] [Confirm]    │
└────────────────────────────────────┘
```

**Variants**:
- Delete confirmation
- Unsaved changes confirmation
- Mismatch warning
- Destructive operation confirmation

**Keyboard Behavior**:
- Escape → Cancel
- Enter → Confirm (if safe) or Cancel (if destructive)

---

### UI-DLG-002: Error/Warning Dialog

**Component Type**: Modal dialog

**Structure**:
```
┌────────────────────────────────────┐
│ [Error/Warning Icon] Title         │
├────────────────────────────────────┤
│ Detailed error message             │
│ Technical details (collapsible)    │
├────────────────────────────────────┤
│              [OK]                  │
└────────────────────────────────────┘
```

**Error Contract**:
```ts
interface AppError {
  code: string;
  message: string;
  userMessage: string;
  details?: Record<string, unknown>;
  recoverable: boolean;
}
```

---

### UI-MNU-001: Main Menu Bar

**Menu Structure**:
```
File       Edit    View    Database    Tools    Window    Help
├─ New     ├─ Copy ─┐      ─┐         ─┐       ─┐        ─┐
├─ Open    ├─ Paste ─┤      ├─ Refresh │       ├─ Options │
├─ Save    └─ Delete┘      └─ Compact ─┘       └─ ...     │
├─ Save As                                                │
├─ Exit                                                   │
```

**Menu Items with Shortcuts**:
- New: Ctrl+N
- Open: Ctrl+O
- Save: Ctrl+S
- Copy: Ctrl+C
- Paste: Ctrl+V
- Delete: Del
- Rename: F2

---

### UI-MNU-002: Context Menu

**Trigger**: Right-click on tree node or UI element

**Dynamic Content**: Based on selected object type and state

**Common Items**:
- Create (submenu by type)
- Copy
- Paste (disabled if clipboard empty)
- Duplicate
- Rename
- Delete (disabled if read-only)
- Properties
- Refresh

**Disabled State Handling**:
- Grayed out
- Tooltip explains reason

---

### UI-TBR-001: Main Toolbar

**Layout**: Horizontal row of icon buttons

**Button Size**: 22-24px icons with text labels (optional)

**Commands** (subset):
- New Database
- Open Database
- Save
- Create Experiment
- Create Workspace
- Configure Hardware
- Memory Page Manager
- Options

**Tooltip Format**:
```
Command Name
One-sentence description.
Shortcut: Ctrl+X
```

---

### UI-TBR-002: Section Toolbar

**Layout**: Compact horizontal toolbar within section header

**Button Size**: 18-20px icons, no text labels

**Context-Specific Commands**:
- Experiment section: Add, Change, Remove
- Project section: Assign, Change, Remove
- Hardware section: Configure
- CDM section: Add, Change, Remove

---

### UI-STB-001: Status Bar

**Layout**: Horizontal bar with sections

**Sections**:
- Left: Current database path / filter
- Center: Operation progress / status messages
- Right: User status / connection state

**Height**: 23px

---

### UI-SPL-001 / UI-SPL-002: Splitters

**Type**: Draggable divider

**Behavior**:
- Drag to resize adjacent panels
- Double-click to reset to default position
- Persist position on change

**Visual**: 4-6px wide/narrow line with hover cursor change

**Persistence Key**:
- `layout.mainSplit` (vertical)
- `layout.treeCommentSplit` (horizontal)

---

## Icon Inventory

| Icon Name | Usage | Size |
|-----------|-------|------|
| icon-database | Database root | 16×16 |
| icon-folder | Folder node | 16×16 |
| icon-experiment | Experiment | 16×16 |
| icon-workspace | Workspace | 16×16 |
| icon-ecu-project | ECU Project | 16×16 |
| icon-dataset | Dataset | 16×16 |
| icon-working-dataset | Working Dataset | 16×16 |
| icon-reference-dataset | Reference Dataset | 16×16 |
| icon-adapter | Hardware Adapter | 16×16 |
| icon-can-channel | CAN Channel | 16×16 |
| icon-xcp-device | XCP Device | 16×16 |
| icon-memory-page | Memory Page | 16×16 |
| icon-upload | Upload action | 18×18 |
| icon-download | Download action | 18×18 |
| icon-checksum | Checksum | 18×18 |
| icon-connect | Connect | 18×18 |
| icon-disconnect | Disconnect | 18×18 |
| icon-configure | Configure | 18×18 |
| icon-add | Add/Create | 18×18 |
| icon-remove | Remove/Delete | 18×18 |
| icon-edit | Edit/Rename | 18×18 |
| icon-copy | Copy | 18×18 |
| icon-paste | Paste | 18×18 |
| icon-refresh | Refresh | 18×18 |
| icon-settings | Settings | 18×18 |
| icon-info | Info | 18×18 |
| icon-warning | Warning | 18×18 |
| icon-error | Error | 18×18 |
| icon-success | Success | 18×18 |

All icons are original SVG assets or from permissively licensed sets (e.g., Fluent System Icons). No ETAS/INCA branding is used.

---

*This inventory provides stable identifiers for traceability between requirements, implementation, and tests.*
