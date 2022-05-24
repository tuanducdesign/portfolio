---
title: passgo
description: Dead simple password generator built with Golang
liveUrl: #
repoUrl: https://github.com/ashalfarhan/passgo
thumbnail: /projects/project9_-Slq5rX9o.jpg
technologies:
  - go
---

## Overview

`passgo` is a Command Line Interface (CLI) utility to generate random strong password. The spec is really simple:

- Minimum length of 8
- Maximum length of 25
- By default it will generate a string with alphabet, numbers, and symbols, but you can exclude one of those with `flag`
- Generated password should be copied to your clipboard if it's supported
- To save the generated password somewhere, pass the `-save` flag, and it will prompt you where to save the file, and the name of the password

## Technologies

There's no technologies used in this project. Really, the `Go`'s standard library is powerful.
