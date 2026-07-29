# ADR-0003: Fixed Classic Layout for v0.1

## Status
Accepted

## Context
The reference INCA interface uses a specific layout pattern:
- Left panel with hierarchical tree (~22-24% width)
- Right panel with dynamic content based on selection
- Comment panel below tree (resizable vertical split)
- Menu bar, toolbar, status bar framing the content
- Compact, dense information presentation

## Decision
Implement a **fixed layout** using CSS Grid and explicit splitters for v0.1 rather than a docking framework.

### Layout Structure
```css
.workbench {
  display: grid;
  grid-template-rows: var(--menu-height) var(--toolbar-height) 1fr var(--statusbar-height);
}

.main-content {
  display: grid;
  grid-template-columns: 22% 1fr; /* Resizable via splitter */
}

.left-panel {
  display: grid;
  grid-template-rows: 1fr auto; /* Tree takes available space, comment at bottom */
}
```

### Splitters
- Custom splitter components with drag handlers
- Double-click to reset to default position
- Persist positions to SQLite via `save_layout` command
- Minimum widths enforced

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| React Golden Layout | Full docking, flexible | Heavy dependency, modern look by default | Overkill for v0.1 fixed layout |
| Mosaic (Tauri-specific) | Native feel | Less mature, may not support all features | Can add later if needed |
| Flexbox-only | Simple | Harder to enforce exact proportions | Grid gives precise control |
| Absolute positioning | Maximum control | Not responsive, hard to maintain | Grid is more declarative |

## Consequences
### Positive
- Exact control over proportions matching reference
- No external docking library dependencies
- Simpler implementation for v0.1 scope
- Easy to test layout behavior
- Clear migration path to docking framework later if needed

### Negative
- Less flexible for future window arrangements
- Manual splitter implementation required
- May need rework if docking requirements emerge

### Mitigation
- Design component interfaces to be layout-agnostic
- Keep detail view components independent of container
- Document layout assumptions clearly

## References
- CSS Grid specification
- Implementation prompt Section 5 (Required user-visible screens)
- Implementation prompt Section 6.1 (General direction - compact classic theme)
