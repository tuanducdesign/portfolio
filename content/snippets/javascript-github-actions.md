---
title: Github Actions
description: Setup Github Actions for JavaScript
icon: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg
tags:
  - javascript
  - testing
  - formatting
  - linter
  - continous integration
---

```yaml
name: Continous Integration

on:
  push:
    paths-ignore:
      - 'README.md'

jobs:
  build:
    name: Static code analyzer, testing and build
    # Replace the action runner with any os that github support
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v2
        with:
          node-version: 16.13
          cache: 'yarn'
        # Make sure to install dependencies, and their respective version
        # according to what is specified in lockfile
        # (yarn.lock, package-lock.json)
      - run: yarn install --frozen-lockfile

      - name: Static code analyze ⌚️
        run: |
          yarn ts:check
          yarn fmt:check
          yarn lint

        # This is optional
        # Can be omitted if there's no test for the project
      - name: Test 🧪
        run: yarn test --ci

      - name: Build 👷‍♀️
        run: yarn build
```

## References

- Runner Option https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job#choosing-github-hosted-runners
