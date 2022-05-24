---
title: Node.js testing with ava
description: Setup testing in a node.js project with ava
icon: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg
tags:
  - nodejs
  - testing
  - avajs
  - javascript
---

This snippet will explain from the project setup.
To skip the setup you can go to [installation](#installation)

## Setup

Create new node.js project

```bash
$ npm init --y
```

Create a simple function to test

```js
// add.js
/**
 * Add two numbers
 * @param {number} a a number
 * @param {number} b a number
 * @returns a + b
 */
exports.add = (a, b) => a + b;
```

> You can test that function with `console.log`

## Installation

Install `ava` to the project

```bash
$ npm i -D ava
```

Add `test` script that runs the `ava` binary

```jsonc
{
  // ...
  "scripts": {
    // ...
    "test": "ava"
  }
}
```

## Testing

Create a test file to test the `add` function

```js
// add.test.js
const test = require('ava');
const { add } = require('./add');

test('should correctly add 1 and 1', t => {
  t.is(add(1, 1), 2);
});
```

Then you can run the test script

```bash
$ npm test
```

## Tips

To get types/intellisense in `vscode`, modify how to import `ava`

```diff
- const test = require("ava");
+ const { default: test } = require("ava");
```

## References

- ava Repository https://github.com/avajs/ava
- using TypeScript https://github.com/avajs/ava/blob/main/docs/recipes/typescript.md
