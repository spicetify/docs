---
title: Compiling
description: Build the Spicetify CLI and daemon from source.
---

v3 is written in Rust. Build from source to work on Spicetify itself, and otherwise install a [prebuilt release](/docs/getting-started).

## Requirements

You need these tools:

- [Rust](https://rustup.rs) 1.95 or newer. `rust/rust-toolchain.toml` selects the stable channel.
- [Node](https://nodejs.org) 18 or newer and pnpm, for the payload that runs inside Spotify. The repository pins pnpm 11.9.0, and its `mise.toml` pins Node 24, so `mise install` sets up both.
- A Spotify install that meets the [requirements](/docs/getting-started#requirements).

## Build

Clone the repository and build the payload, then the binaries:

```bash
git clone https://github.com/spicetify/cli
cd cli
pnpm install --frozen-lockfile
pnpm build:payload
cd rust
cargo build --release -p cli -p daemon
```

The binaries are `rust/target/release/spicetify` and `spicetify-daemon`. Keep them in the same folder, because the CLI starts the daemon from its own directory. `cargo build` doesn't replace the `spicetify` on your `PATH`, so run `./target/release/spicetify` to test your build.

:::warning
Run `pnpm build:payload` before `cargo build`. The Rust build embeds the payload, and a binary built without it refuses to apply. After you change the payload sources, run both commands again.
:::

:::caution
v2 and v3 keep backups in different layouts. Restore Spotify with the CLI that applied it before you switch to the other one, or Spotify can lose its `xpui.spa` or `index.html`.
:::

## Restart the daemon after changes

`apply` leaves a running daemon in place when its version number matches, which a local rebuild doesn't change. After you change the daemon or the shared core crate, rebuild and restart it:

```bash
cargo build --release -p cli -p daemon
./target/release/spicetify daemon stop
./target/release/spicetify daemon start
```

## Build v2

v2 is written in Go and lives on the repository's `main` branch:

```bash
git clone https://github.com/spicetify/cli
cd cli
go build -o spicetify
```
