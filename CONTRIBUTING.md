# Contributing

Thank you for contributing to Admin Dashboard. Small, focused pull requests are easier to review and maintain.

## Before You Start

1. Search existing issues and pull requests for related work.
2. Open an issue before starting a large feature or architectural change.
3. Do not include credentials, production data, private screenshots, or generated build output.
4. Read `AGENTS.md` and `VBEN_THEME_REFERENCE.md` before changing application structure or visual styles.

## Local Development

```bash
pnpm install
pnpm dev
```

The project requires Node.js 20 or later and pnpm 9 or later.

## Development Guidelines

- Use TypeScript and function components.
- Keep component props and service responses explicitly typed.
- Prefer existing shadcn/ui components and semantic theme tokens.
- Keep navigation labels, route paths, and form field names stable unless the change is explicitly approved.
- Add accessible names to icon-only controls and preserve keyboard navigation.
- Do not commit mock data that could be mistaken for production data.
- Do not edit generated output under `dist/`.

## Quality Checks

Run all checks before submitting a pull request:

```bash
pnpm type-check
pnpm lint
pnpm build
```

## Commit Messages

Use the Angular-style commit format:

```text
<type>(<scope>): <subject>
```

Examples:

```text
feat(auth): add session expiration handling
fix(theme): preserve dark mode after sign in
docs(readme): clarify local setup
```

Common types are `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, and `revert`.

## Pull Requests

- Keep each pull request focused on one concern.
- Explain the motivation and user-visible impact.
- Link related issues with `Closes #123` when appropriate.
- Include screenshots for visual changes in both light and dark modes.
- Add or update tests when the project has coverage for the changed behavior.
- Confirm that no unrelated files or generated artifacts are included.

Maintainers may request changes to keep the project consistent, accessible, and secure.
