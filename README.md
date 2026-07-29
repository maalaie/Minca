# M&C Workbench v0.1

An INCA-inspired automotive measurement and calibration workbench for offline database management, hardware configuration, and memory page operations.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

M&C Workbench is a desktop application that provides:

- **Database Manager**: Hierarchical organization of experiments, workspaces, projects, and datasets
- **Workspace Configuration**: Assign experiments, projects, hardware, and CDM configurations
- **Hardware Configuration Editor**: Configure virtual CAN/XCP adapters and devices
- **Memory Page Manager**: Inspect S-record files and simulate memory operations

This is an **offline functional vertical slice** - it demonstrates workflows and UI patterns without requiring real hardware.

## Screenshots

### Database Manager
*Screenshot placeholder - Main view with database tree and workspace detail*

### Hardware Configuration Editor
*Screenshot placeholder - Hardware tree and parameter grid*

### Memory Page Manager
*Screenshot placeholder - File inspection and mock operation*

## Architecture

```
┌─────────────────┐     ┌──────────────┐     ┌──────────────────┐
│   React 18      │────▶│   Tauri 2    │────▶│   Rust Backend   │
│   TypeScript    │◀────│   IPC Bridge │◀────│   SQLite         │
│   Vite          │     │              │     │   Mock Hardware  │
└─────────────────┘     └──────────────┘     └──────────────────┘
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for detailed architecture documentation.

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| State Management | Zustand |
| Styling | CSS Modules, Design Tokens |
| Validation | Zod, React Hook Form |
| Desktop Shell | Tauri 2 |
| Backend | Rust stable |
| Database | SQLite (sqlx) |
| Testing | Vitest, React Testing Library, Playwright |

## Prerequisites

### Windows Development

1. **Node.js** (v18 or later)
   ```bash
   # Download from https://nodejs.org/
   ```

2. **pnpm**
   ```bash
   npm install -g pnpm
   ```

3. **Rust** (stable)
   ```bash
   # Download from https://rustup.rs/
   ```

4. **Visual Studio Build Tools** (for native modules)
   - Install "Desktop development with C++" workload

5. **WebView2** (pre-installed on Windows 10/11)

### Verify Installation

```bash
node --version  # v18+
pnpm --version  # 8+
rustc --version  # 1.70+
cargo --version  # 1.70+
```

## Installation

```bash
# Clone repository
git clone <repository-url>
cd mnc-workbench

# Install dependencies
pnpm install
```

## Development

### Run in Development Mode

```bash
# Start both frontend and Tauri backend
pnpm tauri:dev
```

This will:
- Start Vite dev server with HMR
- Compile Rust backend
- Open the application window

### Separate Commands

```bash
# Frontend only (browser mode)
pnpm dev

# Type checking
pnpm typecheck

# Linting
pnpm lint

# Format code
pnpm format
```

## Testing

### Frontend Tests

```bash
pnpm test
```

### Rust Tests

```bash
cd apps/desktop/src-tauri
cargo test --all
```

### Visual Regression Tests

```bash
pnpm test:visual
```

### Full Test Suite

```bash
pnpm check
```

## Building

### Development Build

```bash
pnpm build
```

### Production Build

```bash
pnpm tauri:build
```

Output will be in `apps/desktop/src-tauri/target/release/bundle/`.

## Project Structure

```
mnc-workbench/
├── apps/
│   └── desktop/              # Main Tauri application
│       ├── src/              # Frontend source
│       │   ├── app/          # App shell, routes, providers
│       │   ├── workbench/    # Core workbench components
│       │   ├── features/     # Feature modules
│       │   ├── components/   # Shared UI components
│       │   ├── state/        # Zustand stores
│       │   ├── api/          # Tauri command wrappers
│       │   └── styles/       # Global styles, tokens
│       └── src-tauri/        # Rust backend
│           ├── src/
│           │   ├── commands/ # Tauri command handlers
│           │   ├── domain/   # Domain entities
│           │   ├── application/ # Application services
│           │   ├── infrastructure/ # Repositories, file ops
│           │   └── main.rs   # Entry point
│           └── Cargo.toml
├── docs/
│   ├── VIDEO_ANALYSIS.md     # Video reference analysis
│   ├── UI_INVENTORY.md       # UI component inventory
│   ├── REQUIREMENTS.md       # Functional requirements
│   ├── ARCHITECTURE.md       # System architecture
│   ├── ASSUMPTIONS.md        # Documented assumptions
│   ├── SECURITY.md           # Security controls
│   └── adr/                  # Architecture Decision Records
├── reference/                # Reference video and frames
└── tests/
    └── fixtures/             # Test fixtures (S-record files)
```

## Key Features (v0.1)

### Implemented
- ✅ Database object hierarchy with CRUD operations
- ✅ Tree navigation with keyboard support
- ✅ Context menus and command system
- ✅ Workspace detail view with 4 sections
- ✅ Project/Dataset detail view
- ✅ Hardware Configuration Editor
- ✅ Memory Page Manager with file picker
- ✅ S-record inspection (Motorola S19/S28/S37)
- ✅ SQLite persistence
- ✅ Layout state persistence
- ✅ Confirmation dialogs
- ✅ Operation logging
- ✅ Virtual/offline mode indicators

### Explicitly Not Implemented (Out of Scope)
- ❌ Real XCP over CAN communication
- ❌ DAQ/STIM functionality
- ❌ Real-time measurement
- ❌ ECU flashing
- ❌ Real hardware drivers
- ❌ Seed & Key DLL execution
- ❌ Measurement instruments
- ❌ Calibration map editing
- ❌ MDF recording

These may be added in future versions with proper hardware abstraction.

## Known Limitations

| Limitation | Impact | Workaround |
|------------|--------|------------|
| No real hardware support | Cannot test with actual ECUs | Use virtual mode for workflow demonstration |
| Flash programming disabled | Cannot write to real hardware | N/A for v0.1 |
| Limited S-record formats | Only Motorola S19/S28/S37 | Convert other formats externally |
| No docking framework | Fixed layout only | N/A for v0.1 scope |
| No encryption | SQLite database is plaintext | Avoid storing sensitive data |

## Documentation

| Document | Description |
|----------|-------------|
| [`docs/VIDEO_ANALYSIS.md`](docs/VIDEO_ANALYSIS.md) | Analysis of reference workflow video |
| [`docs/UI_INVENTORY.md`](docs/UI_INVENTORY.md) | Complete UI component inventory with IDs |
| [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md) | Functional and non-functional requirements |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System architecture and flows |
| [`docs/ASSUMPTIONS.md`](docs/ASSUMPTIONS.md) | Documented assumptions and decisions |
| [`docs/SECURITY.md`](docs/SECURITY.md) | Security controls and threat model |
| [`docs/adr/`](docs/adr/) | Architecture Decision Records |

## Roadmap

### v0.1 (Current)
- Offline functional vertical slice
- Database management
- Hardware configuration (virtual)
- Memory page operations (mock)

### v0.2 (Planned)
- Virtual XCP protocol simulator
- Protocol state machine
- Enhanced S-record parsing
- Pluggable CAN adapter interface

### v0.3 (Future)
- Real CAN adapter support (PEAK, Kvaser, Vector)
- XCP over CAN implementation
- Basic measurement functionality

## Contributing

1. Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
2. Review open issues and milestones
3. Create feature branch from `main`
4. Follow coding standards (see below)
5. Add tests for new functionality
6. Submit pull request

### Coding Standards

**TypeScript**:
- `strict: true` enabled
- No `any` without documentation
- Exhaustive switches for unions
- Functional components with hooks

**Rust**:
- `cargo fmt` required
- `cargo clippy -- -D warnings` must pass
- No `unwrap()` in production code
- Use `tracing` for logging

**General**:
- Minimal dependencies
- Pin all versions
- Write tests
- Document public APIs

## License

MIT License - see LICENSE file for details.

## Disclaimer

This software is for educational and development purposes. It is not affiliated with or endorsed by ETAS GmbH. INCA is a trademark of ETAS GmbH. All other trademarks are property of their respective owners.

The software is provided "as is" without warranty of any kind. Use at your own risk.

---

**Getting Started Quick Start**:

```bash
git clone <repository-url>
cd mnc-workbench
pnpm install
pnpm tauri:dev
```

For more information, see the documentation in the `docs/` directory.
