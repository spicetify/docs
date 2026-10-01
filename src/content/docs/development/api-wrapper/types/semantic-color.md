---
title: SemanticColor
description: Spotify's semantic color names.
---

`SemanticColor` names a color in Spotify's Encore theme. Components such as `IconComponent` and `TextComponent` take one in their `semanticColor` prop.

```ts
type SemanticColor =
  | 'textBase'
  | 'textSubdued'
  | 'textBrightAccent'
  | 'textNegative'
  | 'textWarning'
  | 'textPositive'
  | 'textAnnouncement'
  | 'essentialBase'
  | 'essentialSubdued'
  | 'essentialBrightAccent'
  | 'essentialNegative'
  | 'essentialWarning'
  | 'essentialPositive'
  | 'essentialAnnouncement'
  | 'decorativeBase'
  | 'decorativeSubdued'
  | 'backgroundBase'
  | 'backgroundHighlight'
  | 'backgroundPress'
  | 'backgroundElevatedBase'
  | 'backgroundElevatedHighlight'
  | 'backgroundElevatedPress'
  | 'backgroundTintedBase'
  | 'backgroundTintedHighlight'
  | 'backgroundTintedPress'
  | 'backgroundUnsafeForSmallTextBase'
  | 'backgroundUnsafeForSmallTextHighlight'
  | 'backgroundUnsafeForSmallTextPress';
```
