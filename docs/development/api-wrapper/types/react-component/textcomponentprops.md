---
title: TextComponentProps
description: Type definition for props of ReactComponent.TextComponent.
---

:::note

This type is deducted from Spotify's internal usage. It may not be accurate and may change in the future.

:::

The `TextComponentProps` object is used to create a text component.

```ts
type TextComponentProps = {
    color?: string;
    semanticColor?: 'textBase' | 'textSubdued' | 'textBrightAccent' | 'textNegative' | 'textWarning' | 'textPositive' | 'textAnnouncement' | 'essentialBase' | 'essentialSubdued' | 'essentialBrightAccent' | 'essentialNegative' | 'essentialWarning' | 'essentialPositive' | 'essentialAnnouncement' | 'decorativeBase' | 'decorativeSubdued' | 'backgroundBase' | 'backgroundHighlight' | 'backgroundPress' | 'backgroundElevatedBase' | 'backgroundElevatedHighlight' | 'backgroundElevatedPress' | 'backgroundTintedBase' | 'backgroundTintedHighlight' | 'backgroundTintedPress' | 'backgroundUnsafeForSmallTextBase' | 'backgroundUnsafeForSmallTextHighlight' | 'backgroundUnsafeForSmallTextPress';
    variant?: 'bass' | 'forte' | 'brio' | 'altoBrio' | 'alto' | 'canon' | 'celloCanon' | 'cello' | 'ballad' | 'balladBold' | 'viola' | 'violaBold' | 'mesto' | 'mestoBold' | 'metronome' | 'finale' | 'finaleBold' | 'minuet' | 'minuetBold';
    paddingBottom?: string;
    weight?: 'book' | 'bold' | 'black';
};
```

#### Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| color | `string` | Text color |
| semanticColor | `'textBase'` &#124; `'textSubdued'` &#124; `'textBrightAccent'` &#124; `'textNegative'` &#124; `'textWarning'` &#124; `'textPositive'` &#124; `'textAnnouncement'` &#124; `'essentialBase'` &#124; `'essentialSubdued'` &#124; `'essentialBrightAccent'` &#124; `'essentialNegative'` &#124; `'essentialWarning'` &#124; `'essentialPositive'` &#124; `'essentialAnnouncement'` &#124; `'decorativeBase'` &#124; `'decorativeSubdued'` &#124; `'backgroundBase'` &#124; `'backgroundHighlight'` &#124; `'backgroundPress'` &#124; `'backgroundElevatedBase'` &#124; `'backgroundElevatedHighlight'` &#124; `'backgroundElevatedPress'` &#124; `'backgroundTintedBase'` &#124; `'backgroundTintedHighlight'` &#124; `'backgroundTintedPress'` &#124; `'backgroundUnsafeForSmallTextBase'` &#124; `'backgroundUnsafeForSmallTextHighlight'` &#124; `'backgroundUnsafeForSmallTextPress'` | Semantic color name |
| variant | `'bass'` &#124; `'forte'` &#124; `'brio'` &#124; `'altoBrio'` &#124; `'alto'` &#124; `'canon'` &#124; `'celloCanon'` &#124; `'cello'` &#124; `'ballad'` &#124; `'balladBold'` &#124; `'viola'` &#124; `'violaBold'` &#124; `'mesto'` &#124; `'mestoBold'` &#124; `'metronome'` &#124; `'finale'` &#124; `'finaleBold'` &#124; `'minuet'` &#124; `'minuetBold'` | Text style variant |
| paddingBottom | `string` | Bottom padding size |
| weight | `'book'` &#124; `'bold'` &#124; `'black'` | Font weight |