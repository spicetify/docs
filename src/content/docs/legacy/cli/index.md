---
title: CLI Reference
description: Command-line interface reference for Spicetify.
---

:::note
This is the **v2** CLI. For v3, see [the CLI reference](/docs/cli).
:::

Spicetify is primarily a command-line tool. This section covers the command reference.

## Quick Start

After [installing Spicetify](/docs/getting-started), the basic workflow is:

```bash
# Generate config (first run only)
spicetify

# Backup Spotify and apply Spicetify
spicetify backup apply

# After making changes, apply them
spicetify apply
```

## Getting Help

For help on any command:

```bash
spicetify --help
spicetify --help <command>
```

Example:

```bash
spicetify --help config
```
