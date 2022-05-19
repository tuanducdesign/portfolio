---
title: Conduit
liveUrl: #
repoUrl: https://github.com/ashalfarhan/realworld
thumbnail: https://ik.imagekit.io/gncpb3rwf/projects/project10_fe9qwZSYT.jpg
technologies:
  - go
  - docker
  - redis
  - postgres
---

Conduit is a [Real World](https://realworld-docs.netlify.app/docs/intro) challenge project to build a [Medium](https://medium.com) clone with different Frontend or Backend technologies. But this time I built the implementation for Go (Golang) with following technologies:

- Some built-in/standard library e.g. `net/http`
- Basic http routing library with [Gorilla Mux](https://github.com/gorilla/mux)
- An extension of the `database/sql` standard library to simplify mapping data from sql to Go data types [sqlx](https://github.com/jmoiron/sqlx)
- JWT for simple authentication system.
- To manage unit and integration test, I'm using [testify](https://github.com/stretchr/testify)
- `Redis` for caching the posts data.
- `Postgresql` for the Relational Database.
- `Docker` and `Docker Compose` to manage requirements to run the apps (redis, and postgresql), so that I don't need to install those.

In this project I've learn a lot about sql and how the Backend works with REST API, for instance I think this is my first time build a Backend service that needs to write raw sql 😆. In Node.js I can use something like mongoose to work with MongoDB, or and orm for Relational Database.
