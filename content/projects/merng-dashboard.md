---
title: MERNG Dashboard
liveUrl: https://dashboard-haans.netlify.app
repoUrl: https://github.com/ashalfarhan/merng-dashboard
thumbnail: /projects/dashboard-illustration_Gqs3ea9xo.jpg
technologies:
  - reactjs
  - expressjs
  - graphql
  - nodejs
  - mongodb
---

## Overview

MERNG Dashboard is a simple Admin Dashboard Web Application built with `MERNG` stack which stands for:

- MongoDB
- Express
- React
- Node.js
- GraphQL

This is my first time creating a `GraphQL` API, learning how authentication flow works with JSON Web Token (`JWT`).

Instead of hosting my own Database, I prefer to choose [Mongo DB Atlas](https://cloud.mongodb.com) as the Cloud Database, the reasons are:

1. This is my first time doing Backend World, and at that time, I don't know how to deal with database migration at all. So Cloud Database like [Mongo DB Atlas](https://cloud.mongodb.com) is the best option I think.
2. It's `free`

## Technologies

- GraphQL Library: [Apollo](https://apollographql.com)
- UI Component Library: [Chakra UI](https://chakra-ui.com/)
- Form management: [`react-hook-form`](https://react-hook-form.com/)
- I18n: [`react-intl`](https://github.com/formatjs/formatjs)
- GraphQL Schema to TypeScript type generator: [`graphql-codegen`](https://www.graphql-code-generator.com/)
- Object schema validation:
  - Frontend [`yup`](https://github.com/jquense/yup)
  - Backend [`class-validator`](https://github.com/typestack/class-validator)
- GraphQL schema and resolvers abstraction from TypeScript classes and decorators: [`type-graphql`](https://github.com/MichalLytek/type-graphql)

> This App is mostly written in `TypeScript`
