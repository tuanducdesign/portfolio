---
title: Hello world in Go
description: Get started with Go (Golang)
icon: devicon-go-original-wordmark colored
tags:
  - go
---

Don't forget to download the Go compiler [here](https://go.dev/dl).

After downloading the compiler, make sure that the command available

```sh
$ go version
```

> The above command should output the version you've installed

## Syntax

Go must have a single main function for the entry of a program.

```go
// hello.go
package main

import "fmt"

func main() {
    fmt.Println("Hello from Go!")
}
```

Then run it with

```sh
$ go run hello.go
```
