/**
 * M&C Workbench UI Kit
 * 
 * A compact, classic-themed component library for engineering desktop applications.
 */

// Design tokens
export { designTokens, getCssCustomProperties } from './tokens';
export type { DesignTokens } from './tokens';

// Re-export contracts and command system types
export type {
  DatabaseObjectType,
  ObjectStatus,
  DatabaseTreeNode,
  WorkspaceDetail,
  HardwareNode,
  HardwareStatus,
  HardwareProperty,
  HardwareConfiguration,
  MemoryOperationRequest,
  MemoryFileInfo,
  OperationLogEntry,
  AppError,
  LayoutState,
} from '@mnc/contracts';

export type {
  IconName,
  CommandContext,
  WorkbenchCommand,
} from '@mnc/command-system';
