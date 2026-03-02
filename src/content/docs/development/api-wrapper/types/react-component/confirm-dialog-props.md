---
title: ConfirmDialogProps
description: Type definition for props of ReactComponent.ConfirmDialog
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `ConfirmDialogProps` object is used to create a confirm dialog.

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

#### Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `isOpen` | `boolean` &#124; `undefined` | Boolean to determine if the dialog should be opened. Defaults to `true` |
| `allowHTML` | `boolean` &#124; `undefined` | Whether to allow inline HTML in component text. Defaults to `false` |
| `titleText` | `string` | Dialog title. Can be inline HTML if `allowHTML` is true |
| `descriptionText` | `string` &#124; `undefined` | Dialog description. Can be inline HTML if `allowHTML` is true |
| `confirmText` | `string` &#124; `undefined` | Confirm button text |
| `cancelText` | `string` &#124; `undefined` | Cancel button text |
| `confirmLabel` | `string` &#124; `undefined` | Confirm button `aria-label` |
| `onConfirm` | `(event: React.MouseEvent<HTMLButtonElement>) => void` &#124; `undefined` | Function to run when confirm button is clicked.<br />The dialog does not close automatically, a handler must be included. |
| `onClose` | `(event: React.MouseEvent<HTMLButtonElement>) => void` &#124; `undefined` | Function to run when cancel button is clicked.<br />The dialog does not close automatically, a handler must be included. |
| `onOutside` | `(event: React.MouseEvent<HTMLButtonElement>) => void` &#124; `undefined` | Function to run when dialog is clicked outside of.<br />By default, this will run `onClose`.<br />A handler must be included to close the dialog. |
