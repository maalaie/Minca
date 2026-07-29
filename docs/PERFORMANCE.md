# Performance Notes

## Target Performance Metrics

### Startup Time
| Metric | Target | Measurement |
|--------|--------|-------------|
| Cold start to interactive UI | < 3 seconds | User-perceived ready state |
| Database tree loaded | < 1 second after window opens | First paint + data load |
| Layout restored | < 500ms | Splitter positions, last selection |

### Rendering Performance
| Metric | Target | Measurement |
|--------|--------|-------------|
| Tree expand/collapse | < 16ms (1 frame) | Interaction to render |
| Selection change | < 32ms (2 frames) | Click to detail visible |
| Splitter drag | < 16ms per update | No visible lag |
| Dialog open | < 100ms | Click to fully rendered |

### Data Handling
| Metric | Target | Measurement |
|--------|--------|-------------|
| Load 1,000 node tree | < 200ms | Query + render |
| Load 5,000 node tree | < 800ms | Query + render |
| Save object | < 50ms | Click to confirmation |
| SQLite query (single object) | < 10ms | Query execution |

### File Operations
| Metric | Target | Measurement |
|--------|--------|-------------|
| S-record inspection (1 MB) | < 1 second | Select to results displayed |
| S-record inspection (10 MB) | < 5 seconds | Select to results displayed |
| S-record inspection (25 MB) | < 10 seconds | Select to results displayed |
| Mock operation progress updates | 10-20 per second | Smooth animation |

## Optimization Strategies

### Frontend Optimizations

#### Virtual Scrolling for Large Trees
```typescript
// Use TanStack Virtual for trees > 500 nodes
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: nodes.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 20, // Row height
  overscan: 5,
});
```

**When to Apply**: Tree has more than 500 visible nodes.

#### Memoization
```typescript
// Expensive computations memoized
const filteredNodes = useMemo(() => 
  nodes.filter(n => matchesFilter(n, filter)), 
  [nodes, filter]
);

// Callbacks stable across renders
const handleSelect = useCallback((nodeId: string) => {
  dispatch({ type: 'SELECT', payload: nodeId });
}, [dispatch]);
```

**Rules**:
- Memoize derived data (filtered lists, computed values)
- Stabilize callbacks passed to child components
- Don't over-memoize primitive values

#### Component Structure
```typescript
// Good: Separate expensive children
const TreeNode = React.memo(({ node }: { node: TreeNode }) => {
  // Only re-renders when this node changes
});

// Bad: All inline
const Tree = () => (
  <div>
    {nodes.map(node => (
      <div key={node.id}>{/* Full render every time */}</div>
    ))}
  </div>
);
```

#### State Colocation
```typescript
// Keep local state local
const CommentPanel = () => {
  const [comment, setComment] = useState(''); // Local, not in global store
  // ...
};

// Only lift state when truly shared
```

### Backend Optimizations

#### Database Indexing
```sql
-- Schema includes strategic indexes
CREATE INDEX idx_objects_parent_id ON objects(parent_id);
CREATE INDEX idx_objects_type ON objects(object_type);
CREATE INDEX idx_settings_key ON settings(key);
```

#### Batched Writes
```rust
// Transaction batches multiple inserts
pub async fn create_hierarchy(
    &self,
    objects: Vec<DatabaseObject>,
) -> Result<(), CoreError> {
    let mut tx = self.db.begin().await?;
    
    for obj in objects {
        self.repo.insert(&mut tx, &obj).await?;
    }
    
    tx.commit().await?;
    Ok(())
}
```

#### Lazy Loading
```rust
// Load tree structure first, details on demand
pub async fn get_tree_structure(&self) -> Result<Vec<TreeNodeSummary>, CoreError> {
    // Only id, parent_id, name, type - no comments or metadata
    sqlx::query_as!(
        TreeNodeSummary,
        r#"SELECT id, parent_id, name, object_type FROM objects ORDER BY created_at"#
    )
    .fetch_all(&self.pool)
    .await
}

pub async fn get_object_detail(&self, id: &str) -> Result<ObjectDetail, CoreError> {
    // Full detail including comment, metadata, assignments
    // ...
}
```

#### Async I/O
```rust
// File operations don't block
pub async fn inspect_file(&self, path: &Path) -> Result<MemoryFileInfo, CoreError> {
    tokio::task::spawn_blocking(move || {
        // CPU-bound parsing in blocking task
        parse_srecord_file(path)
    })
    .await
    .unwrap()?
}
```

### Memory Management

#### Frontend Memory Limits
```typescript
// Limit cached data
const MAX_COMMENT_HISTORY = 100;
const MAX_OPERATION_LOG_ENTRIES = 1000;

// Clean up on unmount
useEffect(() => () => {
  cleanupLargeObjects();
}, []);
```

#### Backend Memory Caps
```rust
// Cap allocation during parsing
const MAX_SRECORD_SIZE: usize = 25 * 1024 * 1024; // 25 MB
const MAX_ADDRESS_SPACE: u32 = 0xFFFF_FFFF;

// Use streaming for large files
pub fn parse_streaming<R: Read>(reader: R) -> Result<SRecordStream, ParseError> {
    // Process line by line, don't load entire file
    // ...
}
```

## Profiling Tools

### Frontend
- **React DevTools Profiler**: Identify slow renders
- **Chrome DevTools Performance**: Frame analysis, layout shifts
- **Lighthouse**: Overall performance score

### Backend
- **cargo flamegraph**: CPU profiling
- **tokio-console**: Async runtime monitoring
- **sqlite-analyzer**: Query plan analysis

### End-to-End
- **Playwright Trace Viewer**: Full interaction recording
- **Custom timing middleware**: Log command durations

## Known Performance Trade-offs

| Decision | Benefit | Cost | Mitigation |
|----------|---------|------|------------|
| CSS Grid for layout | Precise control, declarative | Slightly slower than absolute positioning | Not noticeable for static layouts |
| Zustand for state | Simple, minimal boilerplate | No built-in memoization | Use selectors carefully |
| SQLite over embedded KV | Transactions, queries | More overhead than sled/rocksdb | Acceptable for v0.1 scale |
| Full tree load upfront | Fast navigation after load | Slower initial load | Lazy load for >5000 nodes |
| Rust parsing | Safe, fast | Compilation time | One-time cost, worth it |

## Performance Testing

### Automated Benchmarks
```bash
# Run benchmarks
pnpm perf:tree
pnpm perf:srecord

# CI performance regression check
pnpm perf:check --threshold 10%
```

### Manual Testing Scenarios
1. **Large database test**: Import 5,000 node hierarchy, measure all interactions
2. **Large file test**: Inspect 25 MB S-record, verify responsiveness
3. **Long session test**: Run for 1 hour, monitor memory growth
4. **Rapid interaction test**: Click through tree rapidly, check for dropped frames

## Performance Budget

| Resource | Budget | Alert Threshold |
|----------|--------|-----------------|
| Initial bundle size | < 2 MB | > 1.5 MB |
| Tauri binary size | < 20 MB | > 18 MB |
| Memory usage (idle) | < 150 MB | > 120 MB |
| Memory usage (active) | < 300 MB | > 250 MB |
| Largest contentful paint | < 1 second | > 800ms |
| Time to interactive | < 2 seconds | > 1.5 seconds |

---

*Update this document when performance optimizations are implemented or targets change.*
