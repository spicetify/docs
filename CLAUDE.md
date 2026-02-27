# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the documentation website for Spicetify, a CLI tool for customizing the Spotify client. The site is built using Docusaurus v3 and deployed at https://spicetify.app.

## Development Commands

**Package Manager**: Bun (switched from npm/yarn)

**Development server**:
```bash
bun dev
# or
bun start
```

**Build**:
```bash
bun run build
```

**Build with Rsdoctor (for bundle analysis)**:
```bash
bun run rsdoctor
```

**Serve production build locally**:
```bash
bun run serve
```

**Linting and Formatting**:
```bash
bun run lint          # Check with Biome
bun run format        # Format with Biome (auto-fix)
```

**Clear Docusaurus cache**:
```bash
bun run clear
```

## Architecture

### Documentation Structure

- **docs/**: Main documentation content (markdown files)
  - `getting-started.md`: Entry point for new users
  - `advanced-usage/`: CLI installation, themes, extensions, custom apps
  - `development/`: Developer guides, API wrapper docs, Spicetify Creator
  - `faq.md`: Frequently asked questions

- **blog/**: Blog posts about Spicetify features and updates

- **src/**: React components and custom styles
  - `pages/`: Custom pages (homepage)
  - `components/`: Reusable components (HomepageFeatures, SwiperCarousel)
  - `css/`: Custom CSS

- **static/**: Static assets (images, favicon)

### Sidebar Configuration

The sidebar is manually configured in `sidebars.js` (not auto-generated). It defines the documentation structure with categories for:
- Getting Started
- Advanced Usage (installation, CLI, themes, extensions, custom apps)
- Development (compiling, themes, custom apps, API wrapper, Spicetify Creator)
- FAQ

When adding new docs, you must update `sidebars.js` to include them in the navigation.

### API Wrapper Documentation

The `development/api-wrapper/` directory contains extensive documentation for Spicetify's JavaScript API, organized into:
- **Methods**: Platform, CosmosAsync, GraphQL, Player, Keyboard, etc.
- **Classes**: ContextMenu, Menu, Topbar, Playbar
- **Functions**: Queue operations, color extraction, notifications
- **Properties**: Config, SVGIcons, React components and hooks
- **Types**: TypeScript type definitions for all API methods

This hierarchical structure mirrors the actual Spicetify API structure.

### Configuration

**Docusaurus config** (`docusaurus.config.js`):
- Site metadata and SEO settings
- Navbar and footer configuration
- GitHub edit URLs point to spicetify/docs
- Uses `@docusaurus/faster` experimental plugin
- Prism themes for code syntax highlighting

**Biome config** (`biome.json`):
- Linter and formatter enabled
- 2-space indentation
- Single quotes for JS, double quotes for JSX
- Organized imports enabled
- Excludes: .astro, dist, node_modules, CSS files
- Special overrides for Svelte/Astro/Vue files

### Git Hooks

Husky is configured with lint-staged to run Biome formatting on all files before commit.

## Important Notes

- The site uses Pagefind for search (Cmd+K or search button in navbar)
- Edit links point to the main branch of spicetify/docs
- Uses React 19 and MDX for documentation
