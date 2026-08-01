# Admin Dashboard

A modern, open-source admin dashboard starter built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Its information architecture and visual rhythm are inspired by Vben Admin, while the implementation is native React.

## Highlights

- Responsive admin shell with a collapsible sidebar, compact header, breadcrumbs, and route tabs.
- Light and dark themes built from semantic CSS tokens.
- Blue, violet, teal, and orange accent themes with persistent user preferences.
- Configurable login form position and interface language.
- Mock authentication with Casbin-based role and permission checks.
- Analytics dashboard with accessible Recharts visualizations.
- Lazy-loaded routes and reusable shadcn/ui primitives.
- TypeScript, ESLint, production build, Dependabot, and GitHub Actions checks.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI framework | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| Component system | shadcn/ui and Radix UI |
| Styling | Tailwind CSS |
| Routing | React Router |
| Forms | React Hook Form and Zod |
| State | Zustand |
| Authorization | Casbin |
| Charts | Recharts |
| Package manager | pnpm |

## Requirements

- Node.js 20 or later
- pnpm 9 or later

Corepack can prepare the package manager version declared by the project:

```bash
corepack enable
corepack prepare pnpm@9.0.0 --activate
```

## Getting Started

```bash
git clone <your-repository-url>
cd admin-dashboard
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser.

### Development Accounts

The repository currently uses local mock authentication.

| Role | Username | Password |
| --- | --- | --- |
| Administrator | `alice` | `alice123` |
| Standard user | `bob` | `bob123` |

These credentials are for local development only. Remove all mock users before connecting the application to a production authentication service.

## Available Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server |
| `pnpm type-check` | Run TypeScript without emitting files |
| `pnpm lint` | Run ESLint with zero warnings allowed |
| `pnpm build` | Type-check and create a production build |
| `pnpm preview` | Preview the production build locally |

Run the same quality checks used in CI before opening a pull request:

```bash
pnpm type-check
pnpm lint
pnpm build
```

## Project Structure

```text
src/
├── components/          Reusable application and shadcn/ui components
├── config/              Navigation and route metadata
├── hooks/               Shared React hooks and UI preferences
├── layouts/             Admin application shell
├── pages/               Route-level pages
├── router/              React Router configuration and guards
├── services/            Authorization and service integrations
├── store/               Zustand stores
├── styles/              Global theme tokens and Tailwind layers
└── types/               Shared TypeScript types
```

## Theme System

The theme is implemented with semantic CSS variables in `src/styles/globals.css`. Components should use tokens such as `background`, `page`, `card`, `foreground`, `muted`, `primary`, `accent`, and `border` instead of hard-coded colors.

See [VBEN_THEME_REFERENCE.md](./VBEN_THEME_REFERENCE.md) for the visual reference, light and dark palettes, typography, breadcrumbs, layout dimensions, and chart colors. AI-assisted contributions should also follow [AGENTS.md](./AGENTS.md).

## Authorization

The demo includes a small Casbin permission layer. Navigation items are filtered before rendering, protected routes verify authentication, and pages can perform their own permission checks. The current policy and users are mock data and must be replaced or loaded from a trusted backend in production.

## Continuous Integration

GitHub Actions runs the following checks on pushes and pull requests:

- Dependency installation from the lockfile
- TypeScript type checking
- ESLint
- Production build
- CodeQL security analysis

Dependabot checks both npm-compatible dependencies and GitHub Actions for updates.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening an issue or pull request. By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

For vulnerability reports, follow [SECURITY.md](./SECURITY.md) and do not open a public issue containing sensitive details.

## License

This project is licensed under the [MIT License](./LICENSE).
