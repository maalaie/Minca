# ADR-0001: React-TypeScript-Tauri-Rust Stack

## Status
Accepted

## Context
The M&C Workbench requires a desktop application that:
- Provides a dense, classic engineering UI similar to INCA
- Runs primarily on Windows
- Interfaces with SQLite for persistence
- May later integrate with real CAN/XCP hardware
- Must be maintainable by a small team

## Decision
Use the following technology stack:
- **React** for UI rendering
- **TypeScript** for type-safe frontend development
- **Vite** for fast builds and HMR
- **Tauri 2** for desktop shell and native integration
- **Rust stable** for backend logic, database access, and file parsing

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Electron + Node.js | Large ecosystem, mature | Larger bundle size, JavaScript runtime overhead, less type safety without strict discipline | Tauri provides smaller footprint and Rust's safety guarantees |
| Qt/QML | Native performance, mature | C++ complexity, licensing costs, steeper learning curve | Web stack more accessible, Tauri sufficient for our needs |
| .NET/WPF or Avalonia | Strong Windows integration | Platform lock-in, larger runtime, different skillset | Cross-platform potential, smaller team familiarity with web stack |
| JavaFX | Cross-platform, mature | JVM overhead, declining ecosystem | Modern tooling preference |
| Wails (Go) | Simpler than Tauri in some ways | Less mature, Go's GC not ideal for real-time | Rust's ownership model better for systems programming |

## Consequences
### Positive
- Type safety throughout the stack
- Small binary size (~10-20 MB vs 100+ MB for Electron)
- Rust's memory safety for critical operations (file parsing, hardware interface)
- Fast iteration with Vite HMR
- Access to npm ecosystem for UI components
- Single codebase for Windows/Linux/macOS (future)

### Negative
- Requires both TypeScript and Rust expertise
- Tauri 2 is relatively new (but stable)
- Some native features may require custom Rust implementation
- Build times longer than pure web app

### Mitigation
- Clear architecture boundaries between frontend/backend
- Comprehensive documentation
- Minimal dependencies to reduce maintenance burden
- Use of established patterns (Zustand, CSS Modules)

## References
- Tauri Documentation: https://tauri.app/
- React Documentation: https://react.dev/
- TypeScript Handbook: https://www.typescriptlang.org/docs/
