---
title: How to add custom axios config
publishedAt: '2022-06-30'
draft: false
---

[`axios`](https://axios-http.com) is a really cool http client library for building a Web Application these days, but how can you customize the config so that you can determine the behavior of a request dynamically based on a property when you want to hit an endpoint of your API?

Let's say we have an instance of axios that we configure the base URL so that every time we want to hit our API, we just need to specify the path of the url.

```js
// http.ts
import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.your-project.com',
});

export default http;
```

And then we have an interceptor to show a toast error message when we receive error response from our API:

```js
// src/http.js
import axios from 'axios';
import { toast } from 'react-toastify';

const http = axios.create({
  baseURL: 'https://api.your-project.com',
});

http.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data.error || error.message;
      toast.error(message);
      return Promise.reject(error);
    }
    if (error instanceof Error) {
      toast.error(error.message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default http;
```

Now if we want to add additional config to tell our interceptor that we don't want to show error message, we can do this:

```js
// src/clients/users.js
import { http } from '@app/http';

export const getUserProfile = () => {
  return http.request({
    method: 'GET',
    url: '/user/profile',
    disableToast: true,
  });
};
```

Then what we need to do is to modify our interceptor to respect with that property:

```js
http.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      if (error.config.disableToast) {
        return Promise.reject(error);
      }
      const message = error.response?.data.error || error.message;
      toast.error(message);
      return Promise.reject(error);
    }
    if (error instanceof Error) {
      toast.error(error.message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
```

### TypeScript

If you're using TypeScript, then you will notice that in `client.ts`, we're not allowed to call `axios.request` with `disableToast` property. And the same error goes to our interceptor, it will look something like this.

> Property 'disableToast' does not exist on type `AxiosRequestConfig<any>`.(2339)

To solve this, we need to tell TypeScript that `disableToast` is actually exist on the `AxiosRequestConfig` type.

```ts
// src/@types/axios.d.ts
import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    disableToast?: boolean;
  }
}
```

This is called **Declaration Merging**, you can read more about them [here](https://www.typescriptlang.org/docs/handbook/declaration-merging.html). But in short, we are adding another property to the `AxiosRequestConfig` interface from `axios`.

In above snippet we're creating a new declaration file and extends the existing interface from axios. But you can also solve this problem by inlining the declaration like [this](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAQwB7AgZzgMyhEcDkyqa+A3AFCiSxwDecMECa8AvljnvlAKYIDGMALSNmMYJgCeZcuQAmPfgBsEvOCAhyArkp4Ei6fHXJxTcHkmrxgAOxg8omAXoCCKdACUeARy08WAMIQNpjAAObGZlFwaAAWEADuACpMLAD8AFxwAEYQELoINhRRrOSl5PzBLHCxMDBgcAC8iO5oAHT8vAj2ABS0JmbZzDwAqh4AMln4tfVoGQD08whgwG2SEFpQQmA4AFaKMB24+AA0ZQCUFOQzYG229lD8PGCMUO28aJA2aDxtWj89AamD5fH5NAB8cBBVR4ZyiDhwUAhkWipgkcB6BnawDQbmIAFEoIiegjoOdzijUVF0T0AISkqBHELhNpxRIpMQU-pUnlQngwTY2OAABU4ON+vH2ghJRLJxV5plKCtMlW+8Dk3QQTXMssZ0O+PDSbQ1MC1zDoOsRWRYUFsEVY8oVquqIH8aAQYT0zRNCDaDLgAB8A5boG1XWh3Z7HbzRCw-bqeuHIzxLkDebwBVAhaLcOK2pKDjLEameUqqTT-bYWIUnhBMHBCcXKTHUocGUXQ0mPSnozyM4KRWKfvmeFKYB2oCWqWXUf2s4Pc8OC9KGVPFWdU7ILFY4M74J6YCMflAc6FdNqehTGpDuWY50KbiPfP5x7fUa6YPE5FMAOL4pKnGmUSbEoUzzP8DjzDsdbALogE8myyStlkThKD8cJmKwqYOluljQOqPBODo8A3KQQA).
