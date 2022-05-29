---
title: TypeScript Narrowing
description: A simple guide how to implement Narrowing in TypeScript with Discriminated Unions
publishedAt: '2022-05-17'
featured: true
cover:
  path: /posts/deva-darshan-v0zwX1aPlHI-unsplash__1__HADmF4NhF.jpg
  width: 2782
  height: 3477
  credit: https://unsplash.com/photos/v0zwX1aPlHI
  author: Deva Darshan
tags:
  - react
  - typescript
---

In this post I'm going to show you how to use [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions) in TypeScript, and the realworld use case. Discriminated Unions is really useful when we working with complex object structure.

## Example

Imagine that we have a function that will call an ability of an animal. `Bird` will have the ability to `fly`, and `Fish` have the ability to `swim`. We will use a field called `kind` to determine which animal we're dealing with. Take a look at our first attempt to declare an interface of `Animal`.

```ts
interface Animal {
  kind: 'bird' | 'fish';
  fly?: () => void; // Optional, because fish cannot fly
  swim?: () => void; // Optional, because bird cannot swim
}
```

> If you're wondering the type of `kind` property, it's called [`String Literals`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types), basically is a string but the value must be that exact string. This will prevent us from typo or misspelling issue.

We can write the `callAbility` function that will applies the logic to determining of calling the right ability between `fish` and `bird`.

```ts
function callAbility(animal: Animal) {
  if (animal.kind === 'bird') {
    animal.fly();
    // If you're using vscode, you will notice above code will have red squiggly lines that says:
    // `Cannot invoke an object which is possibly 'undefined'.`
  }
}
```

It looks like TypeScript still doesn't know what todo there. At this point we feel like we know more about our values than the type checker does. To simplify this issue, we can just use a `non-null assertion` (a `!` after `null` or `undefined` property) to tell TypeScript that `"Nope, this will never be undefined or null."`

```ts
function callAbility(animal: Animal) {
  if (animal.kind === 'bird') {
    animal.fly!();
  }
}
```

> Note that `non-null assertion` must not oftenly be used since those assertions are error-prone. It would be better if we always check if something `null` or `undefined`.

So this still would be a problem, we need to somehow communicate with TypeScript to give a better idea of what animal looks like. Let's rewrite the `Animal` interface.

```ts
interface Bird {
  kind: 'bird';
  fly: () => void;
}

interface Fish {
  kind: 'fish';
  swim: () => void;
}

type Animal = Bird | Fish;
```

Now we've separated the `Animal` out into two types with different values for the `kind` property and both methods now becomes required. If you check again the first `callAbility` function declaration, you will notice that there's no `red squiggly line` when we call the `fly` method

```ts
function callAbility(animal: Animal) {
  if (animal.kind === 'bird') {
    animal.fly();
    // Hover over the animal inside the if block, and it should says:
    // `(parameter) animal: Bird`
  }
}
```

Cool, Now the error is gone! When every type in a union contains a common property with literal types, TypeScript considers that to be a discriminated union, and can narrow out the members of the union.

In this case, `kind` was that common property (which is what’s considered a discriminant property of `Animal`). Checking whether the kind property was `"bird"` got rid of every type in `Animal` that didn’t have a kind property with the type `"bird"`. That narrowed shape down to the type Circle.

**Btw, you can try this out with the `switch` statement.**

The keynote thing here is that `Bird` and `Fish` were really two separate types but both have specific `kind` field.

## Realworld Examples

I'm going to give you two realworld example how to implement Discriminated Unions on your code.

### Narrowing API Response

This example will implement Discriminated Unions in API Response with `axios`. Consider your backend have consistent shape of response, take a look at the following:

```ts
type SuccessResponse<T> = {
  data: T;
  success: true;
};

type ErrorResponse = {
  error: { message: string };
  success: false;
};

type BaseResponse<T> = SuccessResponse<T> | ErrorResponse;
```

We create the generic `BaseResponse` type that will take a single type parameter to represent what the data looks like if it was successful. Now here's what we would implement the discriminated unions:

```ts
import { axios, BaseResponse } from 'somewhere';

type Todo = {
  id: string;
  name: string;
  done: boolean;
};

const getTodos = async () => {
  const { data: response } = await axios.get<BaseResponse<Todo[]>>('/todos');
  if (response.success) {
    // Do something with `response.data` in this block
  } else {
    // Handle error because the response is not success
    // Uncomment below code and you will notice a squiggly line when we access the `data` property
    // console.log(response.data);
    // `Property 'data' does not exist on type 'ErrorResponse'.`
  }
};
```

I love using the above pattern because we can make sure that we only access the data if the response was successful.

### Narrowing `dispatch` from `useReducer`

If you need to manage complex state but only in specific component, and the rest of the application does not need to know, you can use `useReducer` instead of `useState` or `redux`. Let's take a look at below example:

> The source code of this example is in [here](https://codesandbox.io/s/clever-wave-91zn3v?file=/src/App.tsx)

Create the `todo.ts` file that will handle all the logic of our todo list.

```tsx
// todo.ts
import { nanoid } from 'nanoid';

export type Todo = {
  done: boolean;
  name: string;
  id: string;
};

export type TodoState = {
  todos: Todo[];
};

// You can also extract each action into dedicated type
export type TodoAction =
  | {
      type: 'addTodo';
      // Takes name of the todo
      payload: string;
    }
  | {
      type: 'removeTodo';
      // Takes id of the todo
      payload: string;
    }
  | {
      type: 'resetTodo';
    }
  | {
      type: 'toggleTodo';
      // Takes id of the todo
      payload: string;
    };

export function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nanoid(), done: false, name: action.payload },
        ],
      };
    case 'removeTodo':
      return {
        ...state,
        todos: [...state.todos.filter(val => val.id !== action.payload)],
      };
    case 'toggleTodo':
      return {
        ...state,
        todos: [
          ...state.todos.map(val => ({
            ...val,
            done: val.id === action.payload ? !val.done : val.done,
          })),
        ],
      };
    case 'resetTodo':
      return {
        ...state,
        todos: [],
      };
    default:
      // The default case can just return the state
      // if we don't know the action type.
      // But we can also throw an error if we will,
      // so that we can make debugging easier
      // if we pass incorrect action.
      return state;
  }
}
```

Then create the `CreateTodoForm.tsx` component for creating a new todo

```tsx
// CreateTodoForm.tsx
import { FormEvent, useState } from 'react';

export function CreateTodoForm({
  onSubmit,
}: {
  onSubmit: (name: string) => void;
}) {
  const [name, setName] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name: </span>
        <input
          onChange={e => setName(e.target.value)}
          value={name}
          type="text"
        />
      </label>
      <button type="submit">Create</button>
    </form>
  );
}
```

Now the `App.tsx` is where we call the `useReducer` hook

```tsx
import { useReducer } from 'react';
import './styles.css';
import { todoReducer, TodoState } from './todo';
import { CreateTodoForm } from './CreateTodoForm';

const initialState: TodoState = {
  todos: [],
};

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <CreateTodoForm
        onSubmit={name => dispatch({ type: 'addTodo', payload: name })}
      />
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.name}</span>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() =>
                dispatch({ type: 'toggleTodo', payload: todo.id })
              }
            />
            <button
              // Try to remove the property 'payload' below when calling dispatch
              // and you will get TypeScript error that says:
              // `Property 'payload' is missing in type '{ type: "removeTodo"; }'`
              onClick={() => dispatch({ type: 'removeTodo', payload: todo.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'resetTodo' })}>Reset</button>
    </div>
  );
}
```

When we `dispatch` any action to our reducer, we will get the better hints of what the `payload` type of the specific `action type` should we passed, this will prevent us from passing wrong payload to an action.

If you revisit the `todoReducer` function, inside of each `case` of the `action.type`, the `action.payload` will be the correct type of what we declared in `TodoAction` type. So inside of the `"resetTodo"` action, the `action` object doesn't contain the `payload` property anymore, since we've already handle all of the possible case of `action.type`.

## Thank you

I hope this is useful knowledge to share, let me know if I missed something. This is my first time to write an article 😅.

## References

- Literal Types https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
- Narrowing https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- `useReducer` https://reactjs.org/docs/hooks-reference.html#usereducer
