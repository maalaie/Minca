import type { DatabaseObjectType, ObjectStatus } from '@mnc/contracts';

/**
 * Icon names for the UI kit
 */
export type IconName =
  // Database objects
  | 'database'
  | 'folder'
  | 'experiment'
  | 'workspace'
  | 'ecu-project'
  | 'dataset'
  | 'cdm-configuration'
  // Hardware
  | 'adapter'
  | 'can-channel'
  | 'xcp-device'
  | 'memory-page'
  // Actions
  | 'add'
  | 'remove'
  | 'edit'
  | 'copy'
  | 'paste'
  | 'duplicate'
  | 'delete'
  | 'rename'
  | 'refresh'
  | 'upload'
  | 'download'
  | 'checksum'
  | 'connect'
  | 'disconnect'
  | 'configure'
  // Status
  | 'status-ok'
  | 'status-warning'
  | 'status-error'
  | 'status-offline'
  // Navigation
  | 'chevron-right'
  | 'chevron-down'
  | 'close'
  | 'more-vertical';

/**
 * Command context for visibility and enablement checks
 */
export interface CommandContext {
  selectedObjectType?: DatabaseObjectType;
  selectedObjectId?: string;
  isTreeSelected: boolean;
  isWorkspaceSelected: boolean;
  isHardwareConfigOpen: boolean;
  isMemoryPageManagerOpen: boolean;
  hardwareMode: 'offline' | 'virtual' | 'online';
  hasUnsavedChanges: boolean;
}

/**
 * Workbench command definition
 */
export interface WorkbenchCommand {
  id: string;
  label: string;
  tooltip: string;
  icon: IconName;
  shortcut?: string;
  isVisible(context: CommandContext): boolean;
  isEnabled(context: CommandContext): boolean;
  disabledReason?(context: CommandContext): string | undefined;
  execute(context: CommandContext): Promise<void>;
}

/**
 * Command registry for managing available commands
 */
export class CommandRegistry {
  private commands: Map<string, WorkbenchCommand> = new Map();

  register(command: WorkbenchCommand): void {
    this.commands.set(command.id, command);
  }

  get(id: string): WorkbenchCommand | undefined {
    return this.commands.get(id);
  }

  getAll(): WorkbenchCommand[] {
    return Array.from(this.commands.values());
  }

  getByContext(context: CommandContext): WorkbenchCommand[] {
    return this.getAll().filter(cmd => cmd.isVisible(context));
  }

  async execute(id: string, context: CommandContext): Promise<void> {
    const command = this.get(id);
    if (!command) {
      throw new Error(`Command not found: ${id}`);
    }
    if (!command.isEnabled(context)) {
      const reason = command.disabledReason?.(context);
      throw new Error(`Command disabled: ${reason || command.label}`);
    }
    await command.execute(context);
  }
}

/**
 * Global command registry instance
 */
export const globalCommandRegistry = new CommandRegistry();
