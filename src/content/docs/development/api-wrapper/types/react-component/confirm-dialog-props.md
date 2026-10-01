---
title: ConfirmDialogProps
description: The props of ReactComponent.ConfirmDialog.
---

`ConfirmDialogProps` are the props of [`ReactComponent.ConfirmDialog`](/docs/development/api-wrapper/properties/react-components#confirmdialog).

```ts
type ConfirmDialogProps = {
  isOpen?: boolean;
  allowHTML?: boolean;
  titleText: string;
  descriptionText?: string;
  confirmText?: string;
  cancelText?: string;
  confirmLabel?: string;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onOutside?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
```

| Prop | Description |
| --- | --- |
| `isOpen` | Shows the dialog. Defaults to `true`. |
| `allowHTML` | Renders `titleText` and `descriptionText` as HTML. Defaults to `false`. |
| `titleText`, `descriptionText` | The title and the body text. |
| `confirmText`, `cancelText` | The button labels. |
| `confirmLabel` | The `aria-label` of the confirm button. |
| `onConfirm` | Runs when the user clicks the confirm button. |
| `onClose` | Runs when the user clicks the cancel button. |
| `onOutside` | Runs when the user clicks outside the dialog. Defaults to `onClose`. |

The dialog never closes by itself, so set `isOpen` to `false` in each handler.
