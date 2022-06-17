---
title: How to add a simple GitHub Actions to a JavaScript project
publishedAt: '2022-05-27'
draft: false
---

GitHub will run your action that located in a `.github/workflows` directory relative to the project root.

Create the directory

```bash
$ mkdir .github
$ mkdir .github/workflows
```

Then create the workflow file, this can be anything but should be in a `yml` or `yaml` format

```bash
$ touch .github/workflows/main.yml
```

```yaml
# .github/workflows/main.yml
name: Continous Integration

on:
  push:
    paths-ignore:
      - 'README.md'

jobs:
  build:
    name: Code analysis, test and build
    # Replace the action runner with any os that github support
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v2
        with:
          node-version: 16.13

      - name: Restore cache 🔍
        uses: actions/cache@v2
        id: cache-deps
        with:
          path: |
            node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install dependencies ⬇️
        if: steps.cache-deps.outputs.cache-hit != 'true'
        run: yarn install --frozen-lockfile

      - name: Code analysis ⌚️
        run: |
          yarn fmt:check
          yarn lint

        # This is optional
        # Can be omitted if there's no test for the project
      - name: Test 🧪
        run: yarn test --ci

      - name: Build 👷‍♀️
        run: yarn build
```

### TypeScript

To use this action with TypeScript, just add 1 more commands to run on `Code analysis` step

```diff
  - name: Code analysis ⌚️
    run: |
+     yarn ts:check
      yarn fmt:check
      yarn lint
```

> The above additional run script assuming the `ts:check` script will runs type checking, e.g. `tsc --noEmit`.

But it's optional if the `build` script doesn't already cover the type checking step. For [Next.js](https://nextjs.org/) project, the type checking step is already covered in the `build` step as [described here](https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors).

### References

- Runner Option https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job#choosing-github-hosted-runners
