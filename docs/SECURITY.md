# Security Document

## Threat Model

The M&C Workbench is a desktop application that:
- Runs locally on user's machine
- Accesses the filesystem for S-record file inspection
- Stores configuration in SQLite database
- Does not communicate with remote services (v0.1 offline mode)
- May later interface with hardware adapters

### Assets to Protect
| Asset | Sensitivity | Threat |
|-------|-------------|--------|
| User's S-record files | Medium | Unauthorized modification, exfiltration |
| SQLite database | Low-Medium | Corruption, unauthorized access |
| Filesystem paths | Low | Information disclosure |
| Application integrity | High | Tampering, injection |

## Security Controls

### T1: Least Privilege (Tauri Permissions)

The application follows least privilege principle:

```json
// tauri.conf.json capabilities
{
  "identifier": "default",
  "permissions": [
    "core:default",
    "dialog:allow-open",
    "fs:allow-read-text-file",
    "shell:allow-execute" // NOT granted in v0.1
  ]
}
```

**Implementation**:
- No arbitrary filesystem access granted to frontend
- Native dialogs used for file selection only
- Read-only access to selected files
- No write access outside application data directory

### T2: Input Validation

All inputs are validated at multiple layers:

#### Frontend Validation (Zod)
```typescript
const CreateObjectSchema = z.object({
  parentId: z.string().uuid(),
  type: z.enum(['database', 'folder', 'experiment', 'workspace', 'ecuProject', 'dataset']),
  name: z.string().min(1).max(255).regex(/^[\w\s\-]+$/),
});
```

#### Backend Validation (Rust)
```rust
pub fn validate_object_name(name: &str) -> Result<(), CoreError> {
    if name.is_empty() || name.len() > 255 {
        return Err(CoreError::Validation("Invalid name length".into()));
    }
    if !name.chars().all(|c| c.is_alphanumeric() || c == '_' || c == '-' || c == ' ') {
        return Err(CoreError::Validation("Invalid characters in name".into()));
    }
    Ok(())
}
```

### T3: Path Validation

All file paths are validated before use:

```rust
pub fn validate_file_path(path: &Path, allowed_extensions: &[&str]) -> Result<(), CoreError> {
    // Reject directories
    if path.is_dir() {
        return Err(CoreError::Validation("Expected file, got directory".into()));
    }
    
    // Validate extension
    match path.extension().and_then(|e| e.to_str()) {
        Some(ext) if allowed_extensions.contains(&ext.to_lowercase().as_str()) => Ok(()),
        _ => Err(CoreError::Validation("Unsupported file extension".into())),
    }
    
    // Cap file size
    let metadata = std::fs::metadata(path)?;
    if metadata.len() > MAX_FILE_SIZE_BYTES {
        return Err(CoreError::Validation("File too large".into()));
    }
}
```

### T4: S-record Parser Safety

The S-record parser follows defensive programming:

```rust
pub fn parse_srecord(content: &str) -> Result<SRecordFile, ParseError> {
    const MAX_ADDRESS: u32 = 0xFFFF_FFFF;
    const MAX_DATA_BYTES: usize = 256 * 1024 * 1024; // 256 MB cap
    
    let mut total_bytes = 0;
    let mut min_addr = u32::MAX;
    let mut max_addr = 0u32;
    
    for (line_num, line) in content.lines().enumerate() {
        // Validate line structure BEFORE parsing
        if !line.starts_with('S') {
            return Err(ParseError::InvalidLineFormat(line_num));
        }
        
        let record = parse_record(line)?;
        
        // Validate address range does not overflow
        if let Some(addr) = record.address {
            let end_addr = addr.saturating_add(record.data.len() as u32);
            if end_addr > MAX_ADDRESS {
                return Err(ParseError::AddressOverflow(line_num));
            }
            min_addr = min_addr.min(addr);
            max_addr = max_addr.max(end_addr);
        }
        
        // Check cumulative data size
        total_bytes = total_bytes.saturating_add(record.data.len());
        if total_bytes > MAX_DATA_BYTES {
            return Err(ParseError::TooMuchData);
        }
        
        // Validate checksum
        if !verify_checksum(line) {
            return Err(ParseError::ChecksumMismatch(line_num));
        }
    }
    
    Ok(SRecordFile { ... })
}
```

**Safety Guarantees**:
- Never allocates based on untrusted address values
- Uses saturating arithmetic to prevent overflow
- Caps maximum accepted file size (25 MB for inspection)
- Validates checksums before processing data
- Never executes or modifies input file content

### T5: Content Security Policy

The application uses a restrictive CSP:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               connect-src 'self'">
```

**Restrictions**:
- No remote content loading
- No eval() or dynamic code execution
- No inline scripts (only inline styles for CSS-in-JS compatibility)
- Images only from self or data URIs (for embedded icons)

### T6: Error Handling

Errors are sanitized before display:

```rust
// Internal error (may contain debug info)
let internal_err = CoreError::Database(SqliteError::ConnectionFailed(...));

// Mapped to safe app error
let app_err = AppError {
    code: "APP_DATABASE".into(),
    message: "Database operation failed".into(),
    userMessage: "Unable to save changes. Please try again.".into(),
    details: None, // No internal details exposed
    recoverable: true,
};
```

**Principles**:
- No stack traces in user-facing errors
- No file paths exposed unless necessary
- No SQL query text in error messages
- Structured logging captures full details internally

### T7: Secure Defaults

| Setting | Default | Rationale |
|---------|---------|-----------|
| Hardware mode | Offline/Virtual | Prevents accidental hardware access |
| Flash programming | Disabled | Requires explicit enable + real hardware |
| File dialog filters | Restrictive (.s19, .srec, .mot) | Prevents opening unexpected file types |
| Database location | App data directory | User-writable, not system-protected |
| Logging level | Info (not Debug) | Avoids leaking sensitive data in logs |

## Known Limitations (v0.1)

| Limitation | Risk Level | Mitigation | Planned Fix |
|------------|------------|------------|-------------|
| No encryption of SQLite database | Low | Local-only access, no sensitive data stored | Consider SQLCipher for v0.2 if needed |
| No code signing | Medium | Users must trust source | Sign binaries for release |
| No automatic updates | Low | Manual update process | Implement secure update mechanism |
| Mock operations don't validate real constraints | Low | Clearly marked as virtual mode | Add validation even in mock |

## Security Checklist for Development

- [ ] No `unwrap()` or `expect()` in production code paths
- [ ] All user inputs validated (frontend + backend)
- [ ] File paths validated before use
- [ ] No shell execution from user input
- [ ] No secrets in frontend bundle
- [ ] No hardcoded credentials or API keys
- [ ] Dependencies reviewed for licenses and vulnerabilities
- [ ] CSP configured restrictively
- [ ] Error messages sanitized
- [ ] Unsafe Rust documented and minimized

## Incident Response

If a security vulnerability is discovered:

1. **Do not disclose publicly** until fixed
2. **Document** the vulnerability and reproduction steps
3. **Assess** impact using CVSS scoring
4. **Fix** in a private branch
5. **Test** the fix thoroughly
6. **Release** patched version
7. **Disclose** responsibly after users have time to update

Contact: [Security contact information to be added]

---

*This document should be reviewed and updated with each major release.*
