/**
 * Database object types for the M&C Workbench
 */
export type DatabaseObjectType =
  | 'database'
  | 'folder'
  | 'experiment'
  | 'workspace'
  | 'ecuProject'
  | 'dataset'
  | 'cdmConfiguration';

/**
 * Status indicators for UI elements
 */
export type ObjectStatus = 'ok' | 'warning' | 'error' | 'offline';

/**
 * Tree node in the database hierarchy
 */
export interface DatabaseTreeNode {
  id: string;
  parentId: string | null;
  type: DatabaseObjectType;
  name: string;
  icon: string;
  children?: DatabaseTreeNode[];
  readOnly: boolean;
  status?: ObjectStatus;
}

/**
 * Assigned experiment in a workspace
 */
export interface AssignedExperiment {
  experimentId: string;
  experimentName: string;
  assignedAt: string;
}

/**
 * Project/device assignment in a workspace
 */
export interface ProjectDeviceAssignment {
  projectId: string;
  projectName: string;
  workingDatasetId?: string;
  workingDatasetName?: string;
  referenceDatasetId?: string;
  referenceDatasetName?: string;
  xcpDeviceId?: string;
  xcpDeviceName?: string;
}

/**
 * Hardware node in the configuration tree
 */
export interface HardwareNode {
  id: string;
  parentId: string | null;
  type: 'adapter' | 'canChannel' | 'xcpDevice';
  name: string;
  displayName: string;
  serialNumber?: string;
  status: HardwareStatus;
  children?: HardwareNode[];
}

/**
 * Hardware device status
 */
export type HardwareStatus =
  | 'inactive'
  | 'notConnected'
  | 'connected'
  | 'noInitialization'
  | 'cannotDetect';

/**
 * Hardware property definition
 */
export interface HardwareProperty {
  id: string;
  name: string;
  value: string | number | boolean;
  defaultValue: string | number | boolean;
  dirty: boolean;
  description: string;
  editable: boolean;
}

/**
 * Workspace detail view data
 */
export interface WorkspaceDetail {
  workspaceId: string;
  workspaceName: string;
  experiment?: AssignedExperiment;
  projectDevice?: ProjectDeviceAssignment;
  hardware: HardwareNode[];
  cdmConfiguration?: AssignedCdmConfiguration;
  comment: string;
}

/**
 * CDM configuration assignment
 */
export interface AssignedCdmConfiguration {
  configurationId: string;
  configurationName: string;
}

/**
 * Hardware configuration state
 */
export interface HardwareConfiguration {
  id: string;
  mode: 'offline' | 'virtual' | 'online';
  devices: HardwareNode[];
  selectedNodeId: string | null;
  properties: HardwareProperty[];
  dirty: boolean;
}

/**
 * Memory operation request
 */
export interface MemoryOperationRequest {
  deviceId: string;
  action: 'download' | 'copy' | 'flash';
  scope: 'data' | 'codeAndData';
  source: MemoryEndpoint;
  destination: MemoryEndpoint;
  autoClose: boolean;
}

/**
 * Memory endpoint (source or destination)
 */
export interface MemoryEndpoint {
  type: 'file' | 'dataset' | 'device';
  path?: string;
  datasetId?: string;
  deviceId?: string;
}

/**
 * S-record file inspection result
 */
export interface MemoryFileInfo {
  fileName: string;
  filePath: string;
  fileSize: number;
  format: 'S19' | 'S28' | 'S37' | 'unknown';
  addressRange: {
    start: number;
    end: number;
  } | null;
  dataBytes: number;
  checksumValid: boolean;
  epkId?: string;
  errorMessage?: string;
}

/**
 * Operation log entry
 */
export interface OperationLogEntry {
  id: string;
  timestamp: string;
  operationType: string;
  description: string;
  status: 'success' | 'warning' | 'error' | 'cancelled';
  details?: Record<string, unknown>;
}

/**
 * Application error contract
 */
export interface AppError {
  code: string;
  message: string;
  userMessage: string;
  details?: Record<string, unknown>;
  recoverable: boolean;
}

/**
 * Layout state for persistence
 */
export interface LayoutState {
  windowWidth?: number;
  windowHeight?: number;
  leftPanelWidth?: number;
  treePanelHeight?: number;
  lastSelectedObjectId?: string;
  expandedTreeNodes: string[];
}
