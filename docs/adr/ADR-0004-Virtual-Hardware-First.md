# ADR-0004: Virtual Hardware First

## Status
Accepted

## Context
The application must:
- Demonstrate realistic hardware configuration workflows
- Not require actual CAN/XCP hardware for v0.1 development and testing
- Maintain a clear path for future real hardware integration
- Avoid false claims of hardware operations

## Decision
Implement **virtual/mock hardware adapters** as the default in v0.1 with explicit "OFFLINE MODE" or "VIRTUAL MODE" indicators.

### Implementation Strategy

#### Trait-Based Abstraction
Define Rust traits for hardware interfaces:
```rust
pub trait CanAdapter: Send + Sync {
    fn id(&self) -> &str;
    fn display_name(&self) -> &str;
    fn enumerate_channels(&self) -> Result<Vec<CanChannelInfo>, CoreError>;
    fn open_channel(&self, config: CanChannelConfig) -> Result<Box<dyn CanChannel>, CoreError>;
}
```

#### Virtual Adapter Implementation
```rust
pub struct VirtualCanAdapter {
    id: String,
    serial: String,
}

impl CanAdapter for VirtualCanAdapter {
    fn enumerate_channels(&self) -> Result<Vec<CanChannelInfo>, CoreError> {
        Ok(vec![
            CanChannelInfo {
                id: "CAN:1".into(),
                name: "Virtual CAN Channel 1".into(),
                status: ChannelStatus::NotConnected,
            }
        ])
    }
    // ... other methods return mock data
}
```

#### Explicit Mode Indicators
- Title bar shows "M&C Workbench - OFFLINE MODE"
- Hardware tree nodes show "ECU OFF / No init. / no ECU access"
- Disabled actions explain: "Available in virtual mode only"
- Mock operations report progress but never claim real hardware modification

### User Messaging
| Scenario | Message |
|----------|---------|
| Flash programming attempted | "Flash programming requires real XCP/CAN implementation. Currently in virtual mode." |
| Connect action in virtual mode | "Connected to virtual adapter. No real ECU communication." |
| Memory download from file | "Simulated download completed. No data written to hardware." |

## Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Require real hardware from start | Realistic testing | Blocks development, high barrier to entry | Impractical for v0.1 |
| No hardware abstraction, hardcode mock | Simpler initial impl | Major rework needed for real hardware | Trait approach enables clean swap |
| Simulation with fake success messages | Feels more realistic | Misleading, users may think it's real | Explicit virtual mode is honest |
| Skip hardware features entirely | Simplest | Loses key workflow demonstration | Hardware config is core to reference UX |

## Consequences
### Positive
- Development can proceed without hardware procurement
- Tests are deterministic and reproducible
- Clear boundary for future real implementation
- Users understand limitations explicitly
- No accidental hardware damage during development

### Negative
- Cannot validate real-world timing or error conditions
- May create false confidence in untested code paths
- Additional abstraction layer adds complexity

### Mitigation
- Document all mocked behaviors clearly
- Design traits based on real hardware documentation (PEAK, Kvaser, Vector APIs)
- Plan integration tests with real hardware for v0.2
- Use property-based testing for protocol edge cases

## References
- PEAK-System PCAN-Basic API documentation
- Kvaser CANLIB documentation
- Vector XL Driver documentation
- XCP Protocol Specification v1.0
