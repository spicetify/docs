---
title: Locale
description: Spotify's localization library, for formatting and translated strings.
---

`Spicetify.Locale` wraps Spotify's localization library. It formats dates and numbers in the client's language and reads Spotify's translated strings.

```ts
namespace Locale {
  function formatDate(date: number | Date | undefined, options?: Intl.DateTimeFormatOptions): string;
  function formatRelativeTime(date: number | Date | undefined, options?: Intl.DateTimeFormatOptions): string;
  function formatNumber(number: number, options?: Intl.NumberFormatOptions): string;
  function formatNumberCompact(number: number): string;
  function get(key: string, ...children: React.ReactNode[]): string | React.ReactNode;
  function getDictionary(): Record<string, string | { one: string; other: string }>;
  function getLocale(): string;
  function getUrlLocale(): string;
  function getSmartlingLocale(): string;
  function getDateTimeFormat(options?: Intl.DateTimeFormatOptions): Intl.DateTimeFormat;
  function getRelativeTimeFormat(): Intl.RelativeTimeFormat;
  function getSeparator(): string;
  function setLocale(locale: string): void;
}
```

`formatDate` and `formatRelativeTime` throw a `RangeError` for an invalid date. `get` looks up a key in Spotify's dictionary and fills its placeholders with `children`. `getDictionary` returns every translated string, which is how you find a key.

```ts
const added = Spicetify.Locale.formatRelativeTime(track.addedAt);
const plays = Spicetify.Locale.formatNumberCompact(1234567); // "1.2M" in English
```

`Spicetify.Locale` exists once Spicetify has exposed Spotify's webpack modules. See [`Events.webpackLoaded`](/docs/development/api-wrapper/properties/events).
