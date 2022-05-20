---
title: I've made a RESTful HTTP client which will make your life much easier
description: Most of you reading this are probably already familiar and using
publishedAt: '2022-01-01'
cover:
  path: /posts/samson-ZGjbiukp_-A-unsplash_YBOy7aIIW.jpg
  width: 5184
  height: 3456
tags:
  - typescript
  - npm
  - webdev
  - restful
---

Most of you reading this are probably already familiar and using [axios](https://www.npmjs.com/package/axios) for making HTTP requests from your application to an API, whether it is your own API or an external one.

Today I want to introduce you to 4rest, the new npm package I built, on top of axios, which is designed to help you set up all of your app's functions for making HTTP requests to API, easily, quickly, and make them as organized as possible by splitting them to services based on API's data models.

Let's see a basic usage example:

1. First of all you create a Forest Instance with your API base URL and other relevant configuration.

```js
import forest from '4rest';

export const instance = forest.create({
  axiosSettings: { baseURL: 'http://localhost:5000' },
});
```

2. Then we create a Forest Service using the instance we just made.

```ts
import { instance } from './forestInstance';
import { UserWithId, User } from './types';

export const userService = instance.createService<UserWithId, User>('user');
```

**That's It!**
Just by doing these 2 simple steps we got our self a total of 9 different functions for making calls to an API with types for request payload and response data on them, including:

- getAll
- getById
- deleteAll
- deleteById
- post
- patch
- patchById
- put
- putById

Let's see a few examples of using the service methods in our app:

- **GET**

```ts
// GET http://localhost:5000/user
async function getUsers() {
  const users: User[] = (await userService.getAll()).data;
}

// GET http://localhost:5000/user/:id
async function getUserById(id: string) {
  const user: User = (await userService.getById(id)).data;
}
```

- **POST**

```ts
// POST http://localhost:5000/user
async function createUser(newUser: User) {
  const userCreated: User = (await userService.post(newUser)).data;
}
```

- **PATCH**

```ts
// PATCH http://localhost:5000/user
async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = (await userService.patch(partialUser)).data;
}

// PATCH http://localhost:5000/user/:id
async function updateUserById(id: ObjectId, partialUser: Partial<User>) {
  const updatedUser: User = (await userService.patchById(id, partialUser)).data;
}
```

This is only the most basic example of how you use 4rest but there are a lot more options to configure service and instance, which let you do much more than shown in this article like zod payload and response data type validations, methods routes configuration, custom service with custom methods, requests onSuccess and onError handling and more.
