---
title: ValidKey
description: The key names that Spicetify.Keyboard accepts.
---

`ValidKey` is a key of `Spicetify.Keyboard.KEYS`. Each maps to the Mousetrap key name that [`KeysDefine`](/docs/development/api-wrapper/types/keyboard/keysdefine) accepts. Several symbol entries map to the unshifted key on a US layout, so `"!"` maps to `"1"`.

```ts
type ValidKey = keyof typeof Spicetify.Keyboard.KEYS;
```

| `ValidKey` | Key name |
| --- | --- |
| `BACKSPACE` | `backspace` |
| `TAB` | `tab` |
| `ENTER` | `enter` |
| `SHIFT` | `shift` |
| `CTRL` | `ctrl` |
| `ALT` | `alt` |
| `CAPS` | `capslock` |
| `ESCAPE` | `esc` |
| `SPACE` | `space` |
| `PAGE_UP` | `pageup` |
| `PAGE_DOWN` | `pagedown` |
| `END` | `end` |
| `HOME` | `home` |
| `ARROW_LEFT` | `left` |
| `ARROW_UP` | `up` |
| `ARROW_RIGHT` | `right` |
| `ARROW_DOWN` | `down` |
| `INSERT` | `ins` |
| `DELETE` | `del` |
| `A` | `a` |
| `B` | `b` |
| `C` | `c` |
| `D` | `d` |
| `E` | `e` |
| `F` | `f` |
| `G` | `g` |
| `H` | `h` |
| `I` | `i` |
| `J` | `j` |
| `K` | `k` |
| `L` | `l` |
| `M` | `m` |
| `N` | `n` |
| `O` | `o` |
| `P` | `p` |
| `Q` | `q` |
| `R` | `r` |
| `S` | `s` |
| `T` | `t` |
| `U` | `u` |
| `V` | `v` |
| `W` | `w` |
| `X` | `x` |
| `Y` | `y` |
| `Z` | `z` |
| `WINDOW_LEFT` | `meta` |
| `WINDOW_RIGHT` | `meta` |
| `SELECT` | `meta` |
| `NUMPAD_0` | `0` |
| `NUMPAD_1` | `1` |
| `NUMPAD_2` | `2` |
| `NUMPAD_3` | `3` |
| `NUMPAD_4` | `4` |
| `NUMPAD_5` | `5` |
| `NUMPAD_6` | `6` |
| `NUMPAD_7` | `7` |
| `NUMPAD_8` | `8` |
| `NUMPAD_9` | `9` |
| `MULTIPLY` | `*` |
| `ADD` | `+` |
| `SUBTRACT` | `-` |
| `DECIMAL_POINT` | `.` |
| `DIVIDE` | `/` |
| `F1` | `f1` |
| `F2` | `f2` |
| `F3` | `f3` |
| `F4` | `f4` |
| `F5` | `f5` |
| `F6` | `f6` |
| `F7` | `f7` |
| `F8` | `f8` |
| `F9` | `f9` |
| `F10` | `f10` |
| `F11` | `f11` |
| `F12` | `f12` |
| `;` | `;` |
| `=` | `=` |
| `,` | `,` |
| `-` | `-` |
| `.` | `.` |
| `/` | `/` |
| `` ` `` | `` ` `` |
| `[` | `[` |
| `\` | `\` |
| `]` | `]` |
| `"` | `"` |
| `~` | `` ` `` |
| `!` | `1` |
| `@` | `2` |
| `#` | `3` |
| `$` | `4` |
| `%` | `5` |
| `^` | `6` |
| `&` | `7` |
| `*` | `8` |
| `(` | `9` |
| `)` | `0` |
| `_` | `-` |
| `+` | `=` |
| `:` | `;` |
| `'` | `'` |
| `<` | `,` |
| `>` | `.` |
| `?` | `/` |
| `\|` | `\` |
