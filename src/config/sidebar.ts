export interface SidebarItem {
  label: string;
  href?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}

export const sidebar: SidebarItem[] = [
  { label: 'Getting Started', href: '/docs/getting-started' },
  { label: 'What Changes in v3', href: '/docs/whats-new' },
  {
    label: 'Modules & the Store',
    href: '/docs/modules',
    collapsed: false,
    items: [
      {
        label: 'Configuration Reference',
        href: '/docs/modules/config-file',
      },
    ],
  },
  {
    label: 'CLI Reference',
    href: '/docs/cli',
    items: [{ label: 'Commands', href: '/docs/cli/commands' }],
  },
  {
    label: 'Development',
    href: '/docs/development',
    items: [
      {
        label: 'Building a Module',
        href: '/docs/development/building-a-module',
      },
      {
        label: 'Porting a v2 Extension',
        href: '/docs/development/migrating-v2-extensions',
      },
      { label: 'Publishing a Module', href: '/docs/development/publishing' },
      { label: 'Compiling', href: '/docs/development/compiling' },
      { label: 'React DevTools', href: '/docs/development/react-devtools' },
      {
        label: 'Spotify CLI Flags',
        href: '/docs/development/spotify-cli-flags',
      },
      {
        label: 'API Wrapper',
        href: '/docs/development/api-wrapper',
        items: [
          { label: 'Modules', href: '/docs/development/api-wrapper/modules' },
          {
            label: 'Methods',
            items: [
              {
                label: 'Platform',
                href: '/docs/development/api-wrapper/methods/platform',
              },
              {
                label: 'CosmosAsync',
                href: '/docs/development/api-wrapper/methods/cosmos-async',
              },
              {
                label: 'GraphQL',
                href: '/docs/development/api-wrapper/methods/graphql',
              },
              {
                label: 'Player',
                href: '/docs/development/api-wrapper/methods/player',
              },
              {
                label: 'Keyboard',
                href: '/docs/development/api-wrapper/methods/keyboard',
              },
              {
                label: 'LocalStorage',
                href: '/docs/development/api-wrapper/methods/local-storage',
              },
              {
                label: 'URI',
                href: '/docs/development/api-wrapper/methods/uri',
              },
              {
                label: 'PopupModal',
                href: '/docs/development/api-wrapper/methods/popup-modal',
              },
              {
                label: 'Panel',
                href: '/docs/development/api-wrapper/methods/panel',
              },
              {
                label: 'AppTitle',
                href: '/docs/development/api-wrapper/methods/app-title',
              },
            ],
          },
          {
            label: 'Classes',
            items: [
              {
                label: 'ContextMenu',
                href: '/docs/development/api-wrapper/classes/context-menu',
              },
              {
                label: 'Menu',
                href: '/docs/development/api-wrapper/classes/menu',
              },
              {
                label: 'Topbar',
                href: '/docs/development/api-wrapper/classes/topbar',
              },
              {
                label: 'Playbar',
                href: '/docs/development/api-wrapper/classes/playbar',
              },
            ],
          },
          {
            label: 'Functions',
            items: [
              {
                label: 'addToQueue',
                href: '/docs/development/api-wrapper/functions/add-to-queue',
              },
              {
                label: 'removeFromQueue',
                href: '/docs/development/api-wrapper/functions/remove-from-queue',
              },
              {
                label: 'colorExtractor',
                href: '/docs/development/api-wrapper/functions/color-extractor',
              },
              {
                label: 'getAudioData',
                href: '/docs/development/api-wrapper/functions/get-audio-data',
              },
              {
                label: 'showNotification',
                href: '/docs/development/api-wrapper/functions/show-notification',
              },
              {
                label: 'getFontStyle',
                href: '/docs/development/api-wrapper/functions/get-font-style',
              },
            ],
          },
          {
            label: 'Properties',
            items: [
              {
                label: 'Config',
                href: '/docs/development/api-wrapper/properties/config',
              },
              {
                label: 'SVGIcons',
                href: '/docs/development/api-wrapper/properties/svgicons',
              },
              {
                label: 'Queue',
                href: '/docs/development/api-wrapper/properties/queue',
              },
              {
                label: 'ReactComponent',
                href: '/docs/development/api-wrapper/properties/react-components',
              },
              {
                label: 'ReactHook',
                href: '/docs/development/api-wrapper/properties/react-hook',
              },
              {
                label: 'TippyProps',
                href: '/docs/development/api-wrapper/properties/tippy-props',
              },
            ],
          },
          {
            label: 'Types',
            items: [
              {
                label: 'CosmosAsync',
                items: [
                  {
                    label: 'Body',
                    href: '/docs/development/api-wrapper/types/cosmos-async/body',
                  },
                  {
                    label: 'Headers',
                    href: '/docs/development/api-wrapper/types/cosmos-async/headers',
                  },
                  {
                    label: 'Method',
                    href: '/docs/development/api-wrapper/types/cosmos-async/method',
                  },
                  {
                    label: 'Error',
                    href: '/docs/development/api-wrapper/types/cosmos-async/error',
                  },
                  {
                    label: 'Response',
                    href: '/docs/development/api-wrapper/types/cosmos-async/response',
                  },
                ],
              },
              {
                label: 'ContextMenu',
                items: [
                  {
                    label: 'OnClickCallback',
                    href: '/docs/development/api-wrapper/types/context-menu/onclick-callback',
                  },
                  {
                    label: 'ShouldAddCallback',
                    href: '/docs/development/api-wrapper/types/context-menu/should-add-callback',
                  },
                ],
              },
              {
                label: 'Keyboard',
                items: [
                  {
                    label: 'ValidKey',
                    href: '/docs/development/api-wrapper/types/keyboard/validkey',
                  },
                  {
                    label: 'KeysDefine',
                    href: '/docs/development/api-wrapper/types/keyboard/keysdefine',
                  },
                ],
              },
              {
                label: 'URI',
                items: [
                  {
                    label: 'Type',
                    href: '/docs/development/api-wrapper/types/uri/type',
                  },
                  {
                    label: 'Validation Functions',
                    href: '/docs/development/api-wrapper/types/uri/validation-functions',
                  },
                ],
              },
              {
                label: 'ReactComponent',
                items: [
                  {
                    label: 'ContextMenuProps',
                    href: '/docs/development/api-wrapper/types/react-component/context-menu-props',
                  },
                  {
                    label: 'MenuProps',
                    href: '/docs/development/api-wrapper/types/react-component/menu-props',
                  },
                  {
                    label: 'MenuItemProps',
                    href: '/docs/development/api-wrapper/types/react-component/menu-item-props',
                  },
                  {
                    label: 'TooltipProps',
                    href: '/docs/development/api-wrapper/types/react-component/tooltip-props',
                  },
                  {
                    label: 'IconComponentProps',
                    href: '/docs/development/api-wrapper/types/react-component/icon-component-props',
                  },
                  {
                    label: 'TextComponentProps',
                    href: '/docs/development/api-wrapper/types/react-component/text-component-props',
                  },
                  {
                    label: 'ConfirmDialogProps',
                    href: '/docs/development/api-wrapper/types/react-component/confirm-dialog-props',
                  },
                  {
                    label: 'PanelSkeletonProps',
                    href: '/docs/development/api-wrapper/types/react-component/panel-skeleton-props',
                  },
                  {
                    label: 'PanelContentProps',
                    href: '/docs/development/api-wrapper/types/react-component/panel-content-props',
                  },
                  {
                    label: 'PanelHeaderProps',
                    href: '/docs/development/api-wrapper/types/react-component/panel-header-props',
                  },
                  {
                    label: 'ToggleProps',
                    href: '/docs/development/api-wrapper/types/react-component/toggle-props',
                  },
                  {
                    label: 'SliderProps',
                    href: '/docs/development/api-wrapper/types/react-component/slider-props',
                  },
                ],
              },
              {
                label: 'Panel',
                items: [
                  {
                    label: 'PanelProps',
                    href: '/docs/development/api-wrapper/types/panel/panel-props',
                  },
                ],
              },
              {
                label: 'GraphQL',
                items: [
                  {
                    label: 'Query',
                    href: '/docs/development/api-wrapper/types/graphql/query',
                  },
                ],
              },
              {
                label: 'Metadata',
                href: '/docs/development/api-wrapper/types/metadata',
              },
              {
                label: 'ContextTrack',
                href: '/docs/development/api-wrapper/types/context-track',
              },
              {
                label: 'ContextOption',
                href: '/docs/development/api-wrapper/types/context-option',
              },
              {
                label: 'PlayerState',
                href: '/docs/development/api-wrapper/types/player-state',
              },
              {
                label: 'ProvidedTrack',
                href: '/docs/development/api-wrapper/types/provided-track',
              },
              {
                label: 'SVGIcon',
                href: '/docs/development/api-wrapper/types/svgicon',
              },
              {
                label: 'SemanticColor',
                href: '/docs/development/api-wrapper/types/semantic-color',
              },
              {
                label: 'Variant',
                href: '/docs/development/api-wrapper/types/variant',
              },
            ],
          },
        ],
      },
    ],
  },
  { label: 'Uninstallation', href: '/docs/uninstallation' },
  { label: 'FAQ', href: '/docs/faq' },
  {
    label: 'Spicetify v2 (legacy)',
    href: '/docs/legacy',
    collapsed: true,
    items: [
      { label: 'Getting Started', href: '/docs/legacy/getting-started' },
      {
        label: 'Customization',
        href: '/docs/legacy/customization',
        items: [
          {
            label: 'Marketplace',
            href: '/docs/legacy/customization/marketplace',
          },
          { label: 'Themes', href: '/docs/legacy/customization/themes' },
          {
            label: 'Extensions',
            href: '/docs/legacy/customization/extensions',
          },
          {
            label: 'Custom Apps',
            href: '/docs/legacy/customization/custom-apps',
          },
          {
            label: 'Configuration Reference',
            href: '/docs/legacy/customization/config-file',
          },
        ],
      },
      {
        label: 'CLI Reference',
        href: '/docs/legacy/cli',
        items: [{ label: 'Commands', href: '/docs/legacy/cli/commands' }],
      },
      {
        label: 'Development',
        items: [
          { label: 'Themes', href: '/docs/legacy/development/themes' },
          { label: 'Extensions', href: '/docs/legacy/development/extensions' },
          {
            label: 'Custom Apps',
            href: '/docs/legacy/development/custom-apps',
          },
          { label: 'JS Modules', href: '/docs/legacy/development/js-modules' },
          {
            label: 'Spicetify Creator',
            items: [
              {
                label: 'The Basics',
                href: '/docs/legacy/spicetify-creator/the-basics',
              },
              {
                label: 'Create Extensions',
                href: '/docs/legacy/spicetify-creator/create-extensions',
              },
              {
                label: 'Create Custom Apps',
                href: '/docs/legacy/spicetify-creator/create-custom-apps',
              },
              {
                label: 'Building & Testing',
                href: '/docs/legacy/spicetify-creator/building-and-testing',
              },
            ],
          },
        ],
      },
      { label: 'Uninstallation', href: '/docs/legacy/uninstallation' },
      { label: 'FAQ', href: '/docs/legacy/faq' },
    ],
  },
];

/** Flatten sidebar into ordered list of hrefs for prev/next navigation */
export function flattenSidebar(
  items: SidebarItem[],
): { label: string; href: string }[] {
  const result: { label: string; href: string }[] = [];
  for (const item of items) {
    if (item.href) {
      result.push({ label: item.label, href: item.href });
    }
    if (item.items) {
      result.push(...flattenSidebar(item.items));
    }
  }
  return result;
}

/** Find breadcrumb trail for a given path */
export function findBreadcrumbs(
  items: SidebarItem[],
  targetHref: string,
  trail: { label: string; href?: string }[] = [],
): { label: string; href?: string }[] | null {
  for (const item of items) {
    const currentTrail = [...trail, { label: item.label, href: item.href }];
    if (item.href === targetHref) {
      return currentTrail;
    }
    if (item.items) {
      const found = findBreadcrumbs(item.items, targetHref, currentTrail);
      if (found) return found;
    }
  }
  return null;
}

/** Check if a path is within a sidebar item's tree */
export function isInSubtree(item: SidebarItem, currentPath: string): boolean {
  if (item.href === currentPath) return true;
  if (item.items) {
    return item.items.some((child) => isInSubtree(child, currentPath));
  }
  return false;
}
