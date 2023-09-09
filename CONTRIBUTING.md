# Hacker News Pro Contribution Guide

Thank you for considering contributing to Hacker News Pro, an open-source
project aimed at enhancing the Hacker News browsing experience. Your
contributions are invaluable to the community. Here's a guide to help you get
started:

## Table of Contents

1. [How Can You Contribute?](#how-can-you-contribute)
1. [Getting Started](#getting-started)
   - [Set Up Your Development Environment](#set-up-your-development-environment)
1. [Making Changes](#making-changes)
   - [Branching Strategy](#branching-strategy)
   - [Commit Guidelines](#commit-guidelines)
1. [Testing](#testing)
1. [Submit a Pull Request](#submit-a-pull-request)
1. [Review and Feedback](#review-and-feedback)
1. [Acknowledgments](#acknowledgments)

## How Can You Contribute?

Hacker News Pro welcomes contributions in various forms, including bug reports,
feature requests, documentation improvements, and code contributions. Your
involvement can make a substantial difference.

If you'd like to make a monetary contribution, you may do so using Buy Me a
Coffee:

<a href="https://www.buymeacoffee.com/danlovelace" target="_blank">
    <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        style="aspect-ratio: 1 / .276; height: 32px"
    />
</a>

## Getting Started

### Set Up Your Development Environment

Follow the [Local Development](./README.md#local-development) steps in the
README.

## Making Changes

### Branching Strategy

Create a new branch for your feature or bug fix:

```bash
git checkout -b feature/my-new-feature
```

### Commit Guidelines

Hacker News Pro follows the
[Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)
and uses [commitlint](https://commitlint.js.org) to help.

## Testing

Ensure your changes do not break existing functionality and consider adding
tests if applicable. Always test the upgrade path to make sure your changes are
backwards-compatible with the previous version(s).

## Submit a Pull Request

When your changes are ready, submit a pull request (PR) from your forked
repository to the main repository's `main` branch. Provide a clear and concise
description of your changes in the PR.

## Review and Feedback

Your PR will be reviewed by maintainers and contributors. Be prepared for
feedback and be responsive to any requested changes. The goal is to collaborate
effectively to improve the project.

## Acknowledgments

Thank you for being a part of the Hacker News Pro community and for your
contributions to making this project a success. Your dedication helps improve
the Hacker News browsing experience for everyone.

Let's build something great together!
