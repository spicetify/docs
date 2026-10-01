---
title: Panel
description: The v2 right sidebar panel API, which Spicetify v3 does not provide.
---

:::warning
`Spicetify.Panel` is not available in Spicetify v3. The v3 wrapper defines no `Panel` namespace, and Spotify's `Platform` has no `PanelAPI`. This page keeps the v2 signatures for existing extensions.
:::

In a v3 module, register a panel with stdlib's registrar. stdlib mounts the panel in the right sidebar and removes it when your module unloads.

```tsx
import { createRegistrar } from '/modules/stdlib/mod.ts';

export default function load(ctx) {
  const registrar = createRegistrar(ctx);
  const panel = registrar.registerPanel({
    label: 'Lyrics',
    render: () => <LyricsView />,
  });
  panel.toggle();
}
```

`registerPanel` also accepts an `id`, a `width` with `default`, `min` and `max`, and `onOpen` and `onClose` callbacks. The controller it returns has `open`, `close`, `toggle`, `isOpen`, `subscribe` and `dispose`.

## v2 signatures

The v2 wrapper defined this namespace.

```ts
namespace Panel {
  const reservedPanelIds: Record<string | number, string | number>;
  const Components: {
    PanelSkeleton: any;
    PanelContent: any;
    PanelHeader: any;
  };
  const currentPanel: number;
  function hasPanel(id: number): boolean;
  function getPanel(id: number): React.ReactNode | string | undefined;
  function setPanel(id: number): Promise<void>;
  function subPanelState(callback: (id: number) => void): void;
  function registerPanel(props: PanelProps): {
    id: number;
    toggle: () => Promise<void>;
    onStateChange: (callback: (isActive: boolean) => void) => void;
    isActive: boolean;
  };
}
```

`registerPanel` took [`PanelProps`](/docs/legacy/development/api-wrapper/types/panel/panel-props) and assigned the panel ID. `setPanel(0)` closed the panel. With `isCustom: true`, the children rendered as they were, built from the components with [`PanelSkeletonProps`](/docs/legacy/development/api-wrapper/types/react-component/panel-skeleton-props), [`PanelContentProps`](/docs/legacy/development/api-wrapper/types/react-component/panel-content-props) and [`PanelHeaderProps`](/docs/legacy/development/api-wrapper/types/react-component/panel-header-props).
