# Assumptions Document

## Video Reference

**ASSUMP-001**: The reference video file `reference/Inca_6WGz1YXyai-output.mp4` is not present in the initial repository. All UI analysis, screen layouts, interaction patterns, and workflow descriptions are derived from the detailed implementation prompt (Section 5: Required user-visible screens and related sections).

**ASSUMP-002**: Where specific pixel values, exact colors, or precise icon designs are not specified in the prompt, reasonable engineering defaults will be selected based on standard Windows desktop application conventions and documented in `docs/UI_INVENTORY.md`.

## Technical Stack

**ASSUMP-003**: Windows is the primary target platform for version 0.1. Linux and macOS support may be added in future versions but is not required for v0.1 definition of done.

**ASSUMP-004**: SQLite database file will be stored in the platform-appropriate application data directory (`%APPDATA%` on Windows) rather than alongside the executable.

## Functional Behavior

**ASSUMP-005**: Demo database hierarchy uses generic automotive-related names (Powertrain, EngineControl, TransmissionControl, Templates) rather than copying any customer-specific or proprietary naming from reference software.

**ASSUMP-006**: Virtual/VirtualAdapter hardware simulation represents a fully offline mode. No real CAN hardware communication is attempted in v0.1.

**ASSUMP-007**: S-record parsing in v0.1 supports basic Motorola S19/S28/S37 format inspection (address range, data size, checksum validation) but does not implement full binary conversion or flashing capability.

**ASSUMP-008**: Layout persistence stores splitter positions, window dimensions, and last-selected object IDs. Complex docking layouts are deferred to future versions.

**ASSUMP-009**: All icons are original SVG assets created for this project or sourced from permissively licensed sets (Fluent System Icons). No ETAS/INCA branding, logos, or copyrighted artwork is used.

**ASSUMP-010**: Command registry pattern is used throughout. Buttons do not directly wire to handlers but instead invoke typed commands that can be reused across menus, toolbars, context menus, and keyboard shortcuts.

**ASSUMP-011**: Mock operations report realistic progress and completion states but never claim to have performed actual hardware operations. Messages like "Available in virtual mode only" are displayed where appropriate.

**ASSUMP-012**: Flash programming action in Memory Page Manager is explicitly disabled in v0.1 with an explanation that real ECU flashing requires production-grade XCP/CAN implementation.

## Data and Persistence

**ASSUMP-013**: Object IDs are stable UUIDs generated at creation time. Names are display-only and can be renamed without affecting internal references.

**ASSUMP-014**: Comments and metadata are persisted to SQLite. Binary file content (S-record files) is NOT stored in the database; only file paths and inspection metadata are persisted.

**ASSUMP-015**: Operation log entries persist across sessions but may be pruned after a configurable threshold (default: 10,000 entries) to prevent unbounded database growth.

## Testing

**ASSUMP-016**: Visual regression tests use static screenshots at fixed resolutions. Dynamic animations and transitions are excluded from visual comparison.

**ASSUMP-017**: Property-based testing for S-record parser uses randomly generated valid and invalid inputs within bounded sizes.

## Security

**ASSUMP-018**: File picker uses Tauri native dialogs with explicit extension filters. Arbitrary filesystem access is not granted to the frontend.

**ASSUMP-019**: No secrets, API keys, or licensing information is required for v0.1 offline operation.

---

*Last updated: Initial project setup*
