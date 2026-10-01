---
title: ReactHook
description: React hooks from the Spotify client.
---

`Spicetify.ReactHook` holds React hooks that the wrapper finds in Spotify's bundle. Call them only inside React components rendered by the client's React.

```ts
namespace ReactHook {
  function DragHandler(
    uris?: string[],
    label?: string,
    contextUri?: string,
    sectionIndex?: number,
    dropOriginUri?: string,
  ): (event: React.DragEvent, uris?: string[], label?: string, contextUri?: string, sectionIndex?: number) => void;
  function useExtractedColor(uri: string, fallbackColor?: string, variant?: 'colorRaw' | 'colorLight' | 'colorDark'): string;
}
```

v3 has no `usePanelState`. See [Panel](/docs/development/api-wrapper/methods/panel) for the v3 panel controller.

## `DragHandler`

`DragHandler` returns an `onDragStart` handler that lets the user drag items onto Spotify's playlists, folders, sidebar and queue.

| Parameter | Type | Description |
| --- | --- | --- |
| `uris` | `string[]` &#124; `undefined` | The URIs to drag. |
| `label` | `string` &#124; `undefined` | The text shown while dragging. |
| `contextUri` | `string` &#124; `undefined` | The URI of the context the drag starts from, such as a playlist. |
| `sectionIndex` | `number` &#124; `undefined` | The index of the section the drag starts from. |
| `dropOriginUri` | `string` &#124; `undefined` | The only target that accepts the drop. Leave it empty to allow any target. |

```tsx
function DraggableTrack() {
  const onDragStart = Spicetify.ReactHook.DragHandler(['spotify:track:5FVd6KXrgO9B3JPmC8OPst'], 'Do I Wanna Know?');

  return (
    <div draggable onDragStart={onDragStart}>
      Do I Wanna Know?
    </div>
  );
}
```

## `useExtractedColor`

`useExtractedColor` returns a hex color extracted from an image, through Spotify's GraphQL API. It uses React Query, so the component must render inside a `QueryClientProvider`.

| Parameter | Type | Description |
| --- | --- | --- |
| `uri` | `string` | The URI or URL of a Spotify image. |
| `fallbackColor` | `string` &#124; `undefined` | The color to return when the image has none. Defaults to `#535353`. |
| `variant` | `'colorRaw'` &#124; `'colorLight'` &#124; `'colorDark'` &#124; `undefined` | The variant to return. Defaults to `colorRaw`. |

```tsx
const { QueryClient, QueryClientProvider } = Spicetify.ReactQuery;
const queryClient = new QueryClient();

function ArtworkBackground({ imageUri }: { imageUri: string }) {
  const color = Spicetify.ReactHook.useExtractedColor(imageUri);
  return <div style={{ backgroundColor: color }} />;
}

function App() {
  const imageUri = Spicetify.Player.data?.item.metadata.image_xlarge_url ?? '';
  return (
    <QueryClientProvider client={queryClient}>
      <ArtworkBackground imageUri={imageUri} />
    </QueryClientProvider>
  );
}
```
