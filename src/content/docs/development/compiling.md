---
title: Compiling
description: Build the Spicetify CLI from source.
---

v3 is written in Rust. Most people are better off with a [prebuilt release](/docs/getting-started); build from source to work on Spicetify itself, or to run it on a platform with no published build.

## Requirements

- [Rust](https://rustup.rs) (stable)
- [Node](https://nodejs.org) 24 and pnpm, for the browser-side payload

## Build

```bash
git clone https://github.com/spicetify/cli
cd cli
pnpm install
pnpm build:payload
cargo build --release -p cli -p daemon
```

The binaries land in `rust/target/release/` as `spicetify` and `spicetify-daemon`. Put that directory on your `PATH`.

:::warning
`pnpm build:payload` is not optional, and it has to run before `cargo build`. The payload that runs inside Spotify is compiled into the binary, so a binary built without it refuses to apply rather than patching the client with nothing in it. After changing anything under `src/jsHelper/`, run both again.
:::

## Working on the daemon

The daemon is its own crate, so `cargo build -p cli` does not rebuild it, and `apply` leaves an already-running daemon alone when the version has not changed, which it will not have during local work. After touching the daemon, restart it explicitly:

```bash
cargo build --release -p cli -p daemon
spicetify daemon stop && spicetify daemon start
```

Skipping the restart means testing the previous build.

## Building v2

v2 is written in Go and lives on the same repository's `main` branch:

```bash
git clone https://github.com/spicetify/cli
cd cli
go build -o spicetify
```
