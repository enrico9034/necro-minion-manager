# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Necro Minion Manager, please report it by emailing the maintainers or opening a private security advisory on GitHub.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if you have one)

### Response Time

- We will acknowledge your report within 48 hours
- We will provide a detailed response within 7 days
- We will work on a fix and release a patch as soon as possible

## Security Best Practices

This application:
- Stores all data locally in the browser (localStorage)
- Does not send data to external servers
- Can run completely offline after initial load
- Does not require authentication or personal information

Users should be aware that:
- Data is stored unencrypted in browser localStorage
- Anyone with access to your device can view the stored data
- Clearing browser data will delete all stored creatures
