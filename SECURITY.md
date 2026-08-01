# Security Policy

## Supported Versions

Security fixes are applied to the latest development branch and the most recent released version.

| Version | Supported |
| --- | --- |
| Latest release | Yes |
| Older releases | No |

## Reporting a Vulnerability

Do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.

Use the repository's private vulnerability reporting feature under the GitHub **Security** tab when it is available. Otherwise, contact a maintainer privately and include:

- A clear description of the vulnerability.
- The affected files, versions, or routes.
- Reproduction steps or a minimal proof of concept.
- The potential impact.
- Any suggested mitigation.

Do not include real credentials, private user data, or destructive payloads. Maintainers will acknowledge a complete report as soon as practical, investigate it, and coordinate disclosure after a fix is available.

## Scope

The credentials and users included in this repository are development-only mock data. They must never be reused in production. Production deployments are responsible for secure authentication, server-side authorization, secret management, HTTPS, dependency updates, and appropriate security headers.
