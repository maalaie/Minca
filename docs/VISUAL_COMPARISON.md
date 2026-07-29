# Visual Comparison Document

## Purpose

This document compares the M&C Workbench v0.1 implementation against the reference INCA workflow to ensure layout, density, and information architecture match the target user experience.

**Note**: This is NOT about pixel-perfect copying of protected visual elements (icons, colors, logos). The goal is to match:
- Panel proportions
- Information density
- Hierarchy and layout patterns
- Interaction affordances

---

## Reference Screens (from Video Analysis)

### Screen 1: Main Database Manager (00:00:01)

**Reference Layout**:
```
┌────────────────────────────────────────────────────────────┐
│ Window Title                                               │
├────────────────────────────────────────────────────────────┤
│ Menu Bar                                                   │
├────────────────────────────────────────────────────────────┤
│ Compact Toolbar                                            │
├─────────────────┬──────────────────────────────────────────┤
│                 │                                          │
│ Database Tree   │         Object Detail Area               │
│ (22-24% width)  │         (Workspace/Project content)      │
│                 │                                          │
│                 │                                          │
├─────────────────┤                                          │
│ Object Comment  │                                          │
│ (resizable)     │                                          │
├─────────────────┴──────────────────────────────────────────┤
│ Status Bar                                                 │
└────────────────────────────────────────────────────────────┘
```

**Key Characteristics**:
- Left panel narrow (~1/4 of window)
- Tree compact with small row height (~20px)
- Comment panel below tree, ~30% of left panel height
- Right panel shows contextual content
- Dense information presentation
- Minimal whitespace

**Implementation Target**:
- CSS Grid with 22% / 78% column split
- Tree row height: 20px
- Font size: 12px UI, 11px small
- Comment panel: flex with min-height 100px

---

### Screen 2: Workspace Detail (00:02:31)

**Reference Layout**:
```
┌────────────────────────────────────────────────────────────┐
│ 3 Experiment                                               │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ [Toolbar] Selected: Experiment_1                       │ │
│ │ [Add] [Change] [Remove]                                │ │
│ └────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ 4 Project/device                                           │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Project: EngineControl                                 │ │
│ │ Working Dataset: WorkingDataset_A  [✓]                │ │
│ │ Reference Dataset: ReferenceDataset [✓]               │ │
│ │ XCP Device: VirtualAdapter:1                           │ │
│ │ [Assign] [Change] [Remove]                             │ │
│ └────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ 5 Hardware                                                 │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ VirtualAdapter:1                                       │ │
│ │ └── CAN:1                                              │ │
│ │     └── XCP:1                                          │ │
│ │         [ECU OFF]                                      │ │
│ │                                                        │ │
│ │            [Configure hardware...]                     │ │
│ └────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────┤
│ 6 CDM configuration                                        │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ No CDM configuration assigned                          │ │
│ │ [Add] [Change] [Remove] (disabled)                     │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**Key Characteristics**:
- Numbered sections (3, 4, 5, 6)
- Each section has header with number + title
- Section toolbar on right side of header
- Content area with compact rows
- Hardware tree miniaturized
- "Configure hardware" button prominent

**Implementation Target**:
- Section component with numbered header
- Row height: 24px for data rows
- Hardware tree: same icons as main tree, smaller
- Button spacing: 4px between buttons

---

### Screen 3: Hardware Configuration Editor (00:03:11)

**Reference Layout**:
```
┌────────────────────────────────────────────────────────────┐
│ Hardware Configuration - OFFLINE MODE                      │
├────────────────────────────────────────────────────────────┤
│ Menu Bar                                                   │
├────────────────────────────────────────────────────────────┤
│ Toolbar                                                    │
├─────────────────┬──────────────────────────────────────────┤
│                 │  Parameters | Info                       │
│ HWK Workspace   │──────────────────────────────────────────│
│ └── VirtualAdap │ Name                    │ Value         │
│     Serial: ... │─────────────────────────│───────────────│
│     └── CAN:1   │ Measurement failure...  │ Ignore        │
│         └── XCP │ Timestamp quantization  │ 1 ms          │
│             ECU │ Connection behavior     │ Passive       │
│             OFF │ Project                 │ EngineControl │
│                 │ Working data            │ Working_A     │
│                 │ Reference data          │ Reference_A   │
│                 │ ... (scrollable)        │               │
├─────────────────┼──────────────────────────────────────────┤
│ Status Legend   │ Property description area                │
│ ● Inactive      │ "Defines behavior when measurement..."   │
│ ○ Not connected │                                          │
│ ● Connected     │                                          │
│ ! No init       │                                          │
│ ? Cannot detect │                                          │
└─────────────────┴──────────────────────────────────────────┘
                        [Additional...] [Apply]    [Reset]
```

**Key Characteristics**:
- Split view: hardware tree (left), parameters (right)
- Parameter grid: two columns (name, value)
- Tabs above parameter grid
- Status legend below tree
- Property description below grid
- Action buttons bottom-right
- "OFFLINE MODE" in title

**Implementation Target**:
- Left panel: 30% width
- Parameter grid: fixed name column (250px), value auto
- Tab heights: 24px
- Status legend: compact list with colored dots
- Buttons: 80px minimum width

---

### Screen 4: Memory Page Manager (00:03:59)

**Reference Layout**:
```
┌────────────────────────────────────────────────────────────┐
│ Memory Page Manager - VirtualAdapter:1/CAN:1/XCP:1         │
├────────────────────────────────────────────────────────────┤
│ Dataset | Utilities                                        │
├────────────────────────────────────────────────────────────┤
│ ○ Standard | ● Enhanced                                    │
├────────────────────────────────────────────────────────────┤
│ Action:   ● Download  ○ Copy  ○ Flash programming (disabled)│
├────────────────────────────────────────────────────────────┤
│ Apply to: ○ Data  ● Code & data                            │
├──────────────┬─────────────────────────────────────────────┤
│ From:        │ To:                                         │
│ ● File       │ ● ECU                                       │
│ ○ ECU        │ ○ Dataset                                   │
│ ○ Dataset    │ ○ File                                      │
├──────────────┴─────────────────────────────────────────────┤
│ ☐ Calibration access    ☐ Device group active              │
├────────────────────────────────────────────────────────────┤
│           [Diagram: Source → Destination]                  │
├────────────────────────────────────────────────────────────┤
│ Working page: 0x0000-0xFFFF  Dataset: Working_A  [OK]      │
│ Reference page: 0x0000-0xFFFF Dataset: Reference_A [OK]    │
│ Code page: 0x0000-0xFFFF     Dataset: (none)      [--]     │
├────────────────────────────────────────────────────────────┤
│ EPK: ABCD1234                                                │
├────────────────────────────────────────────────────────────┤
│ ☐ Auto close                                                 │
└────────────────────────────────────────────────────────────┘
                         [Do it]              [Close]
```

**Key Characteristics**:
- Modal dialog or child window
- Tabs at top (Standard/Enhanced)
- Radio groups for action and scope
- From/To selectors
- Checkboxes for options
- Visual diagram (simplified in v0.1)
- Page information table
- EPK display
- Primary action button "Do it"

**Implementation Target**:
- Modal: 800×600 minimum
- Radio groups: horizontal layout
- Page info: compact table, 3 rows
- Diagram: SVG placeholder
- Buttons: "Do it" primary (blue), Close secondary

---

## Implementation Verification Checklist

### Layout Proportions

| Element | Reference | Implementation | Match? |
|---------|-----------|----------------|--------|
| Left panel width | 22-24% | TBD after impl | ⬜ |
| Tree row height | ~20px | TBD after impl | ⬜ |
| Comment panel height | ~30% of left | TBD after impl | ⬜ |
| Section header height | ~24px | TBD after impl | ⬜ |
| Toolbar height | ~38px | TBD after impl | ⬜ |
| Status bar height | ~23px | TBD after impl | ⬜ |

### Density Metrics

| Metric | Reference | Implementation | Match? |
|--------|-----------|----------------|--------|
| Font size (UI) | 11-12px | TBD after impl | ⬜ |
| Button padding | 4-6px | TBD after impl | ⬜ |
| Icon size (tree) | 16×16 | TBD after impl | ⬜ |
| Icon size (toolbar) | 22-24×22-24 | TBD after impl | ⬜ |
| Row spacing | 2-4px | TBD after impl | ⬜ |

### Interaction Patterns

| Pattern | Reference | Implementation | Match? |
|---------|-----------|----------------|--------|
| Tree expand on click | Yes | TBD after impl | ⬜ |
| Context menu on right-click | Yes | TBD after impl | ⬜ |
| F2 for rename | Yes | TBD after impl | ⬜ |
| Delete with confirmation | Yes | TBD after impl | ⬜ |
| Splitter drag + double-click reset | Yes | TBD after impl | ⬜ |
| Escape closes dialogs | Yes | TBD after impl | ⬜ |

### Visual Differences (Acceptable)

| Element | Reference | Implementation | Reason |
|---------|-----------|----------------|--------|
| Icons | INCA proprietary | Original SVG/Fluent | Copyright |
| Colors | ETAS brand colors | Semantic colors | Brand independence |
| Window chrome | Windows classic/modern | Tauri native | Framework default |
| Font family | System default | Segoe UI/Arial | Cross-platform |

### Visual Differences (Not Acceptable)

| Issue | Impact | Fix Required |
|-------|--------|--------------|
| Panels too spacious | Loses engineering tool feel | Reduce padding, font sizes |
| Modern web aesthetics | Doesn't match mental model | Remove rounded corners, gradients |
| Large touch targets | Wastes space | Reduce to 16-20px |
| Excessive whitespace | Reduces information density | Compact layouts |

---

## Screenshot Capture Plan

After implementation, capture screenshots at:
- Resolution: 1920×1050
- Windows scaling: 100%
- Theme: Light (default)

**Required Screenshots**:
1. `main-database-manager.png` - Initial state with tree
2. `workspace-selected.png` - Workspace detail visible
3. `project-dataset-selected.png` - Project/dataset detail
4. `hardware-configuration.png` - Hardware editor open
5. `memory-page-manager.png` - Memory manager modal
6. `file-inspection.png` - S-record results displayed

**Comparison Method**:
1. Place reference frame beside implementation screenshot
2. Annotate major differences
3. Document acceptable vs. requires-fix differences
4. Update this document with findings

---

## Remaining Mismatches

*To be filled after implementation and visual comparison.*

| ID | Description | Severity | Planned Fix |
|----|-------------|----------|-------------|
| M-001 | TBD | TBD | TBD |

---

*This document should be updated after Milestone 6 (Testing and fidelity) with actual comparison results.*
