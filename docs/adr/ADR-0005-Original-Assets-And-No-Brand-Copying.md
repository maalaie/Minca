# ADR-0005: Original Assets and No Brand Copying

## Status
Accepted

## Context
The application is inspired by INCA's workflow and layout but must:
- Avoid copyright infringement
- Not use ETAS or INCA trademarks, logos, or proprietary artwork
- Create original visual identity
- Respect intellectual property while achieving similar UX density

## Decision
Create **original assets** throughout the application with these guidelines:

### Naming
| Use | Do Not Use |
|-----|------------|
| M&C Workbench | INCA Workbench |
| Database Manager | INCA Database Manager |
| Hardware Configuration Editor | ETAS Hardware Editor |
| VirtualAdapter | ES581 (ETAS product name) |
| DemoDatabase | Any customer-specific database name from reference |

### Icons
- Create original SVG icons for all object types
- Use Fluent System Icons (MIT license) as base where appropriate
- Modify colors and proportions to create distinct visual identity
- Do not trace or copy INCA icon designs pixel-for-pixel

### Color Palette
- Derive colors from general engineering software conventions
- Do not match INCA color scheme exactly
- Use semantic color names (success, warning, error) rather than brand colors

### Tooltips and Help Text
- Write original descriptions
- Do not copy tooltip wording from reference software
- Use generic technical language rather than product-specific terminology

### Layout and UX Patterns
- Matching panel arrangements and workflows is acceptable (functional elements)
- Do not copy unique decorative elements or branded visual treatments
- Focus on information architecture similarity, not visual duplication

## Implementation Guidelines

### Icon Creation Process
1. Identify required icons from `docs/UI_INVENTORY.md`
2. Check Fluent System Icons for suitable base icons
3. Customize stroke width, corner radius, and proportions
4. Export as 16×16, 18×18, 20×20, 22×22, 24×24 as needed
5. Store in `apps/desktop/src/assets/icons/`

### Example Icon Usage
```tsx
// Correct: Original icon component
import { DatabaseIcon } from '@/components/Icon';
<DatabaseIcon size={16} />

// Incorrect: Referencing proprietary assets
import incaLogo from '@/assets/inca-logo.png'; // DO NOT DO THIS
```

### Documentation Language
```markdown
// Correct
"The Database Manager displays a hierarchical tree of objects."

// Incorrect (copies INCA terminology too closely)
"The Experiment Environment manages ECU-specific variables like INCA's workspace."
```

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| License ETAS assets | Authentic look | Likely unavailable, expensive, legal complexity | Not feasible for open project |
| Use similar naming with disclaimer | Clear inspiration | Still trademark risk | Legal exposure |
| Generic industrial aesthetic | Safe | Loses target UX familiarity | Must balance inspiration with originality |
| Full redesign | Completely original | Misses goal of matching user mental model | Reference UX is valuable |

## Consequences
### Positive
- No legal risk from trademark/copyright infringement
- Establishes independent product identity
- Encourages thoughtful design decisions
- Sets precedent for respecting IP in future features

### Negative
- Requires more design effort upfront
- May feel less "authentic" to INCA users initially
- Cannot rely on familiar branded patterns

### Mitigation
- Document design rationale clearly
- Test with users to ensure usability despite different branding
- Focus on functional similarity over visual mimicry

## References
- ETAS GmbH trademark guidelines (general principle: do not use without permission)
- Fluent System Icons: https://github.com/microsoft/fluentui-system-icons
- Copyright basics for software UI (functional elements vs. creative expression)
