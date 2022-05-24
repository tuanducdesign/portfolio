---
title: Conduit
description: Medium.com clone built with Golang
liveUrl: #
repoUrl: https://github.com/ashalfarhan/realworld
thumbnail: /projects/project10_fe9qwZSYT.jpg
technologies:
  - go
  - docker
  - redis
  - postgres
---

## Overview

Conduit is a [Real World](https://realworld-docs.netlify.app/docs/intro) challenge project to build a [Medium](https://medium.com) clone with different Frontend or Backend technologies. But this time I built the implementation for Go (Golang).

## Technologies

- Some built-in/standard library e.g. `net/http`
- [Gorilla Mux](https://github.com/gorilla/mux) Basic http routing library
- [sqlx](https://github.com/jmoiron/sqlx) An extension of the `database/sql` standard library to simplify mapping data from `SQL` to Go data types
- `JWT` for simple authentication system.
- [testify](https://github.com/stretchr/testify) To manage unit and integration test
- `Redis` for caching the posts data.
- `Postgresql` for the Relational Database.
- `Docker` and `Docker Compose` to manage requirements to run the apps (redis, and postgresql), so that I don't need to install those.

In this project I've learn a lot about `SQL` and how the Backend works with REST API, for instance I think this is my first time build a Backend service that needs to write raw `SQL` queries.
