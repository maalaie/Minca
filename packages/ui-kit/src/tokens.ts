/**
 * Design tokens for the M&C Workbench classic theme
 * 
 * These tokens define a compact, desktop-native engineering tool aesthetic.
 * Avoid modern consumer web app patterns (large whitespace, rounded corners, gradients).
 */

export const designTokens = {
  // Typography
  font: {
    ui: '"Segoe UI", Arial, sans-serif',
    mono: '"Consolas", "Courier New", monospace',
  },

  fontSize: {
    ui: '12px',
    small: '11px',
    large: '13px',
    heading: '14px',
  },

  // Layout dimensions
  dimensions: {
    menuHeight: '27px',
    toolbarHeight: '38px',
    panelHeaderHeight: '22px',
    treeRowHeight: '20px',
    statusbarHeight: '23px',
    iconSmall: '16px',
    iconMedium: '20px',
    iconLarge: '24px',
  },

  // Spacing scale
  space: {
    1: '2px',
    2: '4px',
    3: '6px',
    4: '8px',
    5: '12px',
    6: '16px',
    8: '24px',
  },

  // Colors - Backgrounds
  bg: {
    window: '#f4f4f4',
    panel: '#ffffff',
    toolbar: '#f7f7f7',
    header: '#f1f1f1',
    selected: '#0a64c9',
    selectedInactive: '#e0e0e0',
    hover: '#e8f0fe',
    disabled: '#f5f5f5',
  },

  // Colors - Foregrounds
  fg: {
    primary: '#171717',
    secondary: '#555555',
    disabled: '#999999',
    selected: '#ffffff',
    link: '#1a73e8',
  },

  // Colors - Borders
  border: {
    subtle: '#d4d4d4',
    strong: '#a9a9a9',
    focus: '#0a64c9',
  },

  // Colors - Semantic status
  status: {
    success: '#188038',
    warning: '#b26a00',
    error: '#c5221f',
    info: '#1a73e8',
  },

  // Shadows (minimal for classic look)
  shadow: {
    none: 'none',
    subtle: '0 1px 2px rgba(0, 0, 0, 0.1)',
    overlay: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },

  // Border radius (keep minimal for classic desktop look)
  radius: {
    none: '0',
    small: '2px',
    medium: '4px',
  },

  // Transitions
  transition: {
    fast: '100ms ease',
    normal: '150ms ease',
    slow: '200ms ease',
  },

  // Z-index layers
  zIndex: {
    base: 0,
    panel: 100,
    menu: 200,
    dialog: 300,
    tooltip: 400,
  },
} as const;

/**
 * CSS custom properties string for injection into :root
 */
export function getCssCustomProperties(): string {
  return `
    :root {
      /* Typography */
      --font-ui: ${designTokens.font.ui};
      --font-mono: ${designTokens.font.mono};
      --font-size-ui: ${designTokens.fontSize.ui};
      --font-size-small: ${designTokens.fontSize.small};
      --font-size-large: ${designTokens.fontSize.large};
      --font-size-heading: ${designTokens.fontSize.heading};

      /* Dimensions */
      --menu-height: ${designTokens.dimensions.menuHeight};
      --toolbar-height: ${designTokens.dimensions.toolbarHeight};
      --panel-header-height: ${designTokens.dimensions.panelHeaderHeight};
      --tree-row-height: ${designTokens.dimensions.treeRowHeight};
      --statusbar-height: ${designTokens.dimensions.statusbarHeight};
      --icon-small: ${designTokens.dimensions.iconSmall};
      --icon-medium: ${designTokens.dimensions.iconMedium};
      --icon-large: ${designTokens.dimensions.iconLarge};

      /* Spacing */
      --space-1: ${designTokens.space[1]};
      --space-2: ${designTokens.space[2]};
      --space-3: ${designTokens.space[3]};
      --space-4: ${designTokens.space[4]};
      --space-5: ${designTokens.space[5]};
      --space-6: ${designTokens.space[6]};
      --space-8: ${designTokens.space[8]};

      /* Colors - Backgrounds */
      --bg-window: ${designTokens.bg.window};
      --bg-panel: ${designTokens.bg.panel};
      --bg-toolbar: ${designTokens.bg.toolbar};
      --bg-header: ${designTokens.bg.header};
      --bg-selected: ${designTokens.bg.selected};
      --bg-selected-inactive: ${designTokens.bg.selectedInactive};
      --bg-hover: ${designTokens.bg.hover};
      --bg-disabled: ${designTokens.bg.disabled};

      /* Colors - Foregrounds */
      --fg-primary: ${designTokens.fg.primary};
      --fg-secondary: ${designTokens.fg.secondary};
      --fg-disabled: ${designTokens.fg.disabled};
      --fg-selected: ${designTokens.fg.selected};
      --fg-link: ${designTokens.fg.link};

      /* Colors - Borders */
      --border-subtle: ${designTokens.border.subtle};
      --border-strong: ${designTokens.border.strong};
      --border-focus: ${designTokens.border.focus};

      /* Colors - Status */
      --status-success: ${designTokens.status.success};
      --status-warning: ${designTokens.status.warning};
      --status-error: ${designTokens.status.error};
      --status-info: ${designTokens.status.info};

      /* Shadows */
      --shadow-none: ${designTokens.shadow.none};
      --shadow-subtle: ${designTokens.shadow.subtle};
      --shadow-overlay: ${designTokens.shadow.overlay};

      /* Border Radius */
      --radius-none: ${designTokens.radius.none};
      --radius-small: ${designTokens.radius.small};
      --radius-medium: ${designTokens.radius.medium};

      /* Transitions */
      --transition-fast: ${designTokens.transition.fast};
      --transition-normal: ${designTokens.transition.normal};
      --transition-slow: ${designTokens.transition.slow};

      /* Z-index */
      --z-base: ${designTokens.zIndex.base};
      --z-panel: ${designTokens.zIndex.panel};
      --z-menu: ${designTokens.zIndex.menu};
      --z-dialog: ${designTokens.zIndex.dialog};
      --z-tooltip: ${designTokens.zIndex.tooltip};
    }
  `;
}

export type DesignTokens = typeof designTokens;
