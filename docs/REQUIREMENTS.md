# Requirements Specification

## Functional Requirements

### FR-DBM: Database Manager

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-DBM-001 | The system shall display a hierarchical tree of database objects in the left panel | P0 | Visual inspection, test |
| FR-DBM-002 | The system shall allow expanding and collapsing tree nodes | P0 | Test, manual |
| FR-DBM-003 | The system shall allow single selection of tree nodes | P0 | Test |
| FR-DBM-004 | The system shall support keyboard navigation in the tree (arrow keys, Enter, F2, Delete) | P0 | Test |
| FR-DBM-005 | The system shall display a context menu on right-click of tree nodes | P0 | Test |
| FR-DBM-006 | The system shall support creating child objects (Experiment, Workspace, Folder) via context menu | P0 | Test |
| FR-DBM-007 | The system shall support copying a tree node | P1 | Test |
| FR-DBM-008 | The system shall support pasting a copied node as a child | P1 | Test |
| FR-DBM-009 | The system shall support duplicating a node | P1 | Test |
| FR-DBM-010 | The system shall support inline rename of nodes (F2) | P1 | Test |
| FR-DBM-011 | The system shall support deleting nodes with confirmation dialog | P0 | Test |
| FR-DBM-012 | The system shall prevent deletion of read-only nodes | P0 | Test |
| FR-DBM-013 | The system shall display an object comment panel below the tree | P0 | Visual inspection |
| FR-DBM-014 | The system shall auto-save comment changes on blur or debounce | P0 | Test |
| FR-DBM-015 | The system shall persist all database objects to SQLite | P0 | Test |
| FR-DBM-016 | The system shall load the database tree from SQLite on startup | P0 | Test |
| FR-DBM-017 | The system shall display status icons (ok, warning, error, offline) for tree nodes | P1 | Visual inspection |
| FR-DBM-018 | The system shall support refresh action on tree nodes | P2 | Test |

### FR-WS: Workspace Detail View

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-WS-001 | The system shall display Workspace detail when a Workspace node is selected | P0 | Visual inspection |
| FR-WS-002 | The system shall display Section 3: Experiment with assigned experiment info | P0 | Visual inspection |
| FR-WS-003 | The system shall provide Add/Change/Remove actions for Experiment assignment | P0 | Test |
| FR-WS-004 | The system shall display Section 4: Project/Device with project and dataset info | P0 | Visual inspection |
| FR-WS-005 | The system shall display Working Dataset and Reference Dataset badges | P0 | Visual inspection |
| FR-WS-006 | The system shall display XCP device assignment status | P0 | Visual inspection |
| FR-WS-007 | The system shall display Section 5: Hardware with mini hardware tree | P0 | Visual inspection |
| FR-WS-008 | The system shall provide "Configure hardware" button that opens Hardware Configuration Editor | P0 | Test |
| FR-WS-009 | The system shall display Section 6: CDM Configuration with assignment info | P0 | Visual inspection |
| FR-WS-010 | The system shall show disabled state explanations where actions are unavailable | P0 | Visual inspection |
| FR-WS-011 | The system shall persist workspace assignments to SQLite | P0 | Test |

### FR-PRJ: Project/Dataset Detail View

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-PRJ-001 | The system shall display Project/Dataset detail when ECU Project or Dataset node is selected | P0 | Visual inspection |
| FR-PRJ-002 | The system shall display a list of datasets with status indicators | P0 | Visual inspection |
| FR-PRJ-003 | The system shall display dataset entries (Working, Reference) with metadata | P0 | Visual inspection |
| FR-PRJ-004 | The system shall display a comment area for Project/Dataset | P0 | Test |
| FR-PRJ-005 | The system shall display an ECU Documentation section | P0 | Visual inspection |
| FR-PRJ-006 | The system shall display object metadata including EPK identifier | P0 | Visual inspection |
| FR-PRJ-007 | The system shall display file source/path for the dataset | P0 | Visual inspection |
| FR-PRJ-008 | The system shall display timestamp and size information | P0 | Visual inspection |

### FR-HW: Hardware Configuration

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-HW-001 | The system shall open Hardware Configuration Editor as dedicated window/route | P0 | Test |
| FR-HW-002 | The system shall display "OFFLINE MODE" indicator in title/breadcrumb | P0 | Visual inspection |
| FR-HW-003 | The system shall display a hardware device tree in the left panel | P0 | Visual inspection |
| FR-HW-004 | The system shall display VirtualAdapter:1 with CAN:1 and XCP:1 hierarchy by default | P0 | Visual inspection |
| FR-HW-005 | The system shall display a parameter grid in the right panel | P0 | Visual inspection |
| FR-HW-006 | The system shall provide Parameters and Info tabs | P0 | Test |
| FR-HW-007 | The system shall display property description for selected parameter | P0 | Visual inspection |
| FR-HW-008 | The system shall provide Apply button that persists changes | P0 | Test |
| FR-HW-009 | The system shall provide Reset button that restores last applied values | P0 | Test |
| FR-HW-010 | The system shall visually mark dirty (modified) values | P0 | Visual inspection |
| FR-HW-011 | The system shall provide Additional... button (placeholder in v0.1) | P1 | Visual inspection |
| FR-HW-012 | The system shall provide Add device and Remove device actions | P1 | Test |
| FR-HW-013 | The system shall provide Initialize, Connect, Disconnect actions | P1 | Test |
| FR-HW-014 | The system shall provide "Open Memory Page Manager" button | P0 | Test |
| FR-HW-015 | The system shall display a status legend explaining device states | P0 | Visual inspection |
| FR-HW-016 | The system shall support editing parameter values (string, integer, enum, boolean, file path) | P0 | Test |
| FR-HW-017 | The system shall persist hardware configuration to SQLite | P0 | Test |

### FR-MPM: Memory Page Manager

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-MPM-001 | The system shall open Memory Page Manager as modal or child window | P0 | Test |
| FR-MPM-002 | The system shall display title identifying selected adapter/channel/XCP device | P0 | Visual inspection |
| FR-MPM-003 | The system shall provide Standard and Enhanced tabs | P0 | Test |
| FR-MPM-004 | The system shall provide Download, Copy, Flash programming radio buttons | P0 | Visual inspection |
| FR-MPM-005 | The system shall disable Flash programming with explanation in v0.1 | P0 | Visual inspection, test |
| FR-MPM-006 | The system shall provide "Apply to" selector (Data / Code & data) | P0 | Test |
| FR-MPM-007 | The system shall provide From and To lists for source/destination | P0 | Visual inspection |
| FR-MPM-008 | The system shall provide Calibration access checkbox | P0 | Test |
| FR-MPM-009 | The system shall provide Device group active checkbox | P0 | Test |
| FR-MPM-010 | The system shall display visual source/destination diagram | P0 | Visual inspection |
| FR-MPM-011 | The system shall display Working page, Reference page, Code page info | P0 | Visual inspection |
| FR-MPM-012 | The system shall display checksum states | P0 | Visual inspection |
| FR-MPM-013 | The system shall display EPK/EPROM ID area | P0 | Visual inspection |
| FR-MPM-014 | The system shall provide "Do it" button for executing operation | P0 | Test |
| FR-MPM-015 | The system shall provide Close button | P0 | Test |
| FR-MPM-016 | The system shall provide Auto close checkbox | P0 | Test |
| FR-MPM-017 | The system shall open native file dialog when Download+File is selected | P0 | Test |
| FR-MPM-018 | The system shall filter file dialog to .s19, .srec, .mot, optionally .hex | P0 | Test |
| FR-MPM-019 | The system shall inspect selected S-record file using Rust parser | P0 | Test |
| FR-MPM-020 | The system shall display inspection results (filename, size, format, address range, checksum, EPK) | P0 | Visual inspection |
| FR-MPM-021 | The system shall display warning if demo file ID does not match project ID | P0 | Test |
| FR-MPM-022 | The system shall require explicit confirmation before simulated operation | P0 | Test |
| FR-MPM-023 | The system shall run cancellable mock progress operation | P0 | Test |
| FR-MPM-024 | The system shall add operation log entry after completion | P0 | Test |
| FR-MPM-025 | The system shall never modify the original selected file | P0 | Test |

### FR-CMD: Command System

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-CMD-001 | The system shall implement a typed command registry | P0 | Code review |
| FR-CMD-002 | Commands shall be reusable across menu, toolbar, context menu, and keyboard shortcuts | P0 | Code review, test |
| FR-CMD-003 | Commands shall have isVisible and isEnabled predicates | P0 | Test |
| FR-CMD-004 | Commands shall provide disabledReason text when disabled | P0 | Test |
| FR-CMD-005 | Commands shall execute asynchronously and report errors | P0 | Test |
| FR-CMD-006 | The system shall provide standard commands (new, open, save, copy, paste, delete, rename) | P0 | Test |
| FR-CMD-007 | The system shall provide workspace commands (assignExperiment, configureHardware) | P0 | Test |
| FR-CMD-008 | The system shall provide hardware commands (apply, reset, openMemoryPageManager) | P0 | Test |
| FR-CMD-009 | The system shall provide memory commands (download, copy, flash) | P0 | Test |

### FR-DLG: Dialogs

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-DLG-001 | The system shall display confirmation dialogs for destructive actions | P0 | Test |
| FR-DLG-002 | The system shall close non-destructive dialogs on Escape key | P0 | Test |
| FR-DLG-003 | The system shall activate primary safe action on Enter key | P0 | Test |
| FR-DLG-004 | The system shall trap focus within modal dialogs | P0 | Test |
| FR-DLG-005 | The system shall display error/warning dialogs with structured error messages | P0 | Test |
| FR-DLG-006 | The system shall not expose raw Rust debug output in user dialogs | P0 | Test |

### FR-PER: Persistence

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-PER-001 | The system shall use SQLite for data persistence | P0 | Code review |
| FR-PER-002 | The system shall persist object hierarchy, names, types, and comments | P0 | Test |
| FR-PER-003 | The system shall persist workspace assignments | P0 | Test |
| FR-PER-004 | The system shall persist hardware draft and applied settings | P0 | Test |
| FR-PER-005 | The system shall persist operation history/log | P0 | Test |
| FR-PER-006 | The system shall persist window/layout state (splitter positions, window dimensions) | P0 | Test |
| FR-PER-007 | The system shall persist last selected object ID | P0 | Test |
| FR-PER-008 | The system shall use database migrations for schema changes | P0 | Code review |
| FR-PER-009 | The system shall use transactions for multi-step mutations | P0 | Code review, test |
| FR-PER-010 | The system shall store only file paths and metadata for S-record files, not binary content | P0 | Code review |
| FR-PER-011 | The system shall reopen in the previous saved state | P0 | Test |

### FR-SRC: S-record Handling

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| FR-SRC-001 | The system shall detect S0/S1/S2/S3/S5/S7/S8/S9 records | P0 | Test |
| FR-SRC-002 | The system shall validate line structure of S-records | P0 | Test |
| FR-SRC-003 | The system shall validate hexadecimal encoding | P0 | Test |
| FR-SRC-004 | The system shall validate per-record checksum | P0 | Test |
| FR-SRC-005 | The system shall compute and display address range | P0 | Test |
| FR-SRC-006 | The system shall count and display data bytes | P0 | Test |
| FR-SRC-007 | The system shall reject malformed input gracefully with error message | P0 | Test |
| FR-SRC-008 | The system shall cap maximum accepted file size for inspection (25 MB) | P0 | Test |
| FR-SRC-009 | The system shall never allocate based on untrusted address range | P0 | Code review |
| FR-SRC-010 | The system shall never execute or modify input data | P0 | Code review |

---

## Non-Functional Requirements

### NFR-UI: User Interface

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| NFR-UI-001 | The UI shall use a compact classic theme resembling engineering desktop tools | P0 | Visual inspection |
| NFR-UI-002 | The UI shall avoid modern consumer web app patterns (large whitespace, rounded surfaces, gradients, glass effects) | P0 | Visual inspection |
| NFR-UI-003 | The UI shall be usable at 1920×1050 with 100% Windows scaling | P0 | Visual inspection |
| NFR-UI-004 | The UI shall remain usable at 1366×768, 1920×1080, 2560×1440 resolutions | P0 | Visual inspection |
| NFR-UI-005 | The UI shall support 125% and 150% Windows scaling | P0 | Visual inspection |
| NFR-UI-006 | The system shall use a token-based styling system for theming | P0 | Code review |
| NFR-UI-007 | All toolbar commands shall have tooltips | P0 | Visual inspection |
| NFR-UI-008 | Tooltips shall include command name, one-sentence description, and shortcut | P0 | Visual inspection |
| NFR-UI-009 | Disabled commands shall expose the reason on hover | P0 | Test |
| NFR-UI-010 | The system shall use original icons, not ETAS/INCA branding | P0 | Code review, visual inspection |
| NFR-UI-011 | Tree icons shall be 16×16, local toolbar icons 18-20×18-20, main toolbar icons 22-24×22-24 | P0 | Visual inspection |

### NFR-PERF: Performance

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| NFR-PERF-001 | The application shall start quickly on a normal Windows development machine | P0 | Manual timing |
| NFR-PERF-002 | The system shall avoid rendering the entire tree when not visible | P0 | Code review, profiling |
| NFR-PERF-003 | The system shall avoid unnecessary React re-renders | P0 | Profiling |
| NFR-PERF-004 | Long-running operations shall run outside the UI thread | P0 | Code review |
| NFR-PERF-005 | The UI shall remain responsive while progress operations are running | P0 | Test |
| NFR-PERF-006 | The system shall handle at least 5,000 database tree nodes | P0 | Test |
| NFR-PERF-007 | The system shall handle at least 20,000 metadata rows in future table scenarios | P0 | Design review |
| NFR-PERF-008 | The system shall inspect a 25 MB S-record file within reasonable time (< 10 seconds) | P0 | Test |
| NFR-PERF-009 | Long operations shall support cancellation | P0 | Test |

### NFR-SEC: Security

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| NFR-SEC-001 | Tauri permissions/capabilities shall follow least privilege principle | P0 | Code review |
| NFR-SEC-002 | Filesystem permissions shall be limited | P0 | Code review |
| NFR-SEC-003 | Native file dialogs shall be used for file selection | P0 | Test |
| NFR-SEC-004 | Arbitrary recursive filesystem access shall not be granted to frontend | P0 | Code review |
| NFR-SEC-005 | File parsing shall occur in Rust backend | P0 | Code review |
| NFR-SEC-006 | All paths shall be validated | P0 | Code review, test |
| NFR-SEC-007 | Directories shall be rejected when a file is expected | P0 | Test |
| NFR-SEC-008 | Unsupported extensions shall be rejected | P0 | Test |
| NFR-SEC-009 | File-size limits shall be enforced | P0 | Test |
| NFR-SEC-010 | Shell execution from user-controlled input shall be avoided | P0 | Code review |
| NFR-SEC-011 | Remote content shall not be enabled | P0 | Code review |
| NFR-SEC-012 | Content security policy shall be restrictive and compatible with the app | P0 | Code review |
| NFR-SEC-013 | Tauri globals shall not be exposed unless needed | P0 | Code review |
| NFR-SEC-014 | eval() shall not be used | P0 | Code review |
| NFR-SEC-015 | Secrets shall not be included in frontend bundles | P0 | Code review |
| NFR-SEC-016 | Unsafe Rust shall not be used without documented necessity | P0 | Code review |

### NFR-ACC: Accessibility

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| NFR-ACC-001 | Buttons and menus shall use semantic HTML/button elements | P0 | Code review |
| NFR-ACC-002 | Interactive elements shall have accessible names | P0 | Test |
| NFR-ACC-003 | Keyboard focus shall be visible | P0 | Visual inspection |
| NFR-ACC-004 | Keyboard navigation shall be supported throughout the application | P0 | Test |
| NFR-ACC-005 | Status communication shall not rely on color alone | P0 | Visual inspection |
| NFR-ACC-006 | Tooltips shall provide text descriptions | P0 | Visual inspection |
| NFR-ACC-007 | Dialogs shall trap focus | P0 | Test |
| NFR-ACC-008 | Escape key shall close non-destructive dialogs | P0 | Test |
| NFR-ACC-009 | Enter key shall activate the primary safe action | P0 | Test |
| NFR-ACC-010 | Destructive actions shall not be the default action | P0 | Test |
| NFR-ACC-011 | System-aware font rendering shall be used | P0 | Visual inspection |
| NFR-ACC-012 | High-DPI scaling shall be supported | P0 | Visual inspection |

### NFR-DEV: Development Experience

| ID | Requirement | Priority | Verification |
|----|-------------|----------|--------------|
| NFR-DEV-001 | TypeScript strict mode shall be enabled | P0 | Code review |
| NFR-DEV-002 | No `any` type shall be used unless documented at external boundaries | P0 | Code review |
| NFR-DEV-003 | No non-null assertions shall be used without justification | P0 | Code review |
| NFR-DEV-004 | Switch statements on domain unions shall be exhaustive | P0 | Code review |
| NFR-DEV-005 | Business logic shall not be embedded in JSX | P0 | Code review |
| NFR-DEV-006 | Tauri calls shall use an API/service layer, not direct calls from components | P0 | Code review |
| NFR-DEV-007 | Rust code shall be formatted with cargo fmt | P0 | CI check |
| NFR-DEV-008 | Rust code shall pass clippy with -D warnings | P0 | CI check |
| NFR-DEV-009 | No unwrap() or expect() in production Rust code | P0 | Code review |
| NFR-DEV-010 | Structured logging with tracing shall be used | P0 | Code review |
| NFR-DEV-011 | Dependencies shall be minimal and licenses checked | P0 | Code review |
| NFR-DEV-012 | Versions shall be pinned through lockfiles | P0 | Code review |

---

## Out of Scope for Version 0.1

The following are explicitly **out of scope** for v0.1 and shall not be implemented:

| Category | Items |
|----------|-------|
| Real Hardware Communication | Real XCP over CAN, DAQ, STIM, real-time measurement, ECU flashing, real hardware drivers |
| Proprietary Integration | ETAS SDK integration, Seed & Key DLL execution |
| Advanced Features | Measurement instruments, oscilloscope, calibration map editing, MDF recording, UDS, DoIP, XCP on Ethernet |
| Cloud/Accounts | Cloud services, user accounts, licensing |
| Production Operations | Production-ready XCP over CAN, pluggable real CAN-adapter interface |

These features may have safe disabled placeholders with explanatory messages but shall not be functionally implemented in v0.1.

---

*This requirements document provides traceability from implementation prompt specifications to verifiable requirements.*
