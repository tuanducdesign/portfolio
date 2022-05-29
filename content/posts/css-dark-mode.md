---
title: Dark Mode with CSS
description: A guide how to add dark mode in a website with only CSS and JavaScript
publishedAt: '2022-05-29'
featured: false
draft: true
cover:
  path: /posts/mario-azzi-CL6560K5vOo-unsplash_G29pe5Xu6.jpg
  width: 4240
  height: 2832
  credit: https://unsplash.com/photos/CL6560K5vOo
  author: Mario Azzi
tags:
  - css
  - javascript
---

If you're wondering like `how can i add dark mode without javascript framework or library?` then the answer is, `Yes, you can!`.

Assuming you have some understanding in `CSS`, and `JavaScript`, let's dive into it.

Create a `style.css`, and copy this code

```css
/* styles.css */
html {
  --bg-color: #fff;
  --color: #000;
}

html[data-theme='dark'] {
  --bg-color: #000;
  --color: #fff;
}

body {
  background-color: var(--bg-color);
  color: var(--color);
}
```

In above snippet, we declare 2 variables `--bg-color` and `--color` and set them to white and black. Below that, we delare the same variables with reversed colors. The second selector means: if the html tag has `data-theme` attribute set to `dark`, then modify both variables with the value inside of the `html[data-theme='dark']` block.

Then we use the variables by applying that to the `body` element.

After stylesheet created, then we can continue to add a button to toggle the theme.

```html
<!-- index.html -->
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <nav>
    <button id="theme-button">Switch to dark</button>
  </nav>
</body>
```

This button will responsible for toggling the `data-theme` attribute of the html.

Now let's take a look at the `script.js`.

```js
// script.js
const themeButtom = document.getElementById('theme-button');

function setTheme(theme = 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  themeButtom.innerText = `Switch to ${theme}`;
}

themeButtom.addEventListener('click', () => {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'light';
  if (currentTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});
```

> Don't forget to reference this script to the html

In above snippet, we grab the themeButton and store it in a variable called `themeButton`, and we declare a function called `setTheme` to change html's `data-theme` attribute, and our theme button's to change with the new theme.

Then we're listening to the button's `click` event, and what we're doing is:

- Get the current theme that is retrieved from the html's `data-theme` attribute, and if the value is `falsy` then assign to the default value to which is `light`.
- And we check if the current theme is `light`, then we call the `setTheme` function with `"dark"` argument, otherwise pass `"light"`.

Congratulations!, now your site can have different preferences.

## Bonus

### Transition

To add transition when user toggle the theme, just add 1 line of code to the `body` element.

```css
/* styles.css */
body {
  background-color: var(--bg-color);
  color: var(--color);

  transition: color, background-color 500ms;
}
```

There I set the transition duration to `500` miliseconds to make it smooth. But you can set the duration how long you want.

### Persisting

To persist the user selected theme, we can use the Web Storage called `localStorage` or `sessionStorage`.

You can read more about them [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).

> In short, `localStorage` will keep the value forever, unless user decided to remove it. On the other hand, `sessionStorage` will remove all of the value if user close the browser.

For this example I think `localStorage` is the best option to save the user preferences.

We need to **_preload_** the selected theme when page load.

```js
// script.js
//... rest of the code

function setTheme(theme = 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  themeButtom.innerText = `Switch to ${theme}`;

  localStorage.setItem('theme', theme);
}

const preloadedTheme = localStorage.getItem('theme') || 'light';
setTheme(preloadedTheme);

//... rest of the code
```

Here's what we modify:

- We add a new line to the `setTheme` function to save the theme in `localStorage` with the key of `"theme"`.
- Then we try to read the `localStorage` with the key of `"theme"`, if the value is `falsy` then assign the default to `"light"`, and save that to the `preloadedTheme` variable.
- Then we immediately call `setTheme` and pass `preloadedTheme` variable as an argument.

## Conclusion

Here's the final version of the code:

```js
// script.js
const themeButtom = document.getElementById('theme-button');

function setTheme(theme = 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  themeButtom.innerText = `Switch to ${theme}`;
  localStorage.setItem('theme', theme);
}

const preloadedTheme = localStorage.getItem('theme') || 'light';

setTheme(preloadedTheme);

themeButtom.addEventListener('click', () => {
  const currentTheme =
    document.documentElement.getAttribute('data-theme') || 'light';
  if (currentTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});
```

```css
/* styles.css */
html {
  --bg-color: #fff;
  --color: #000;
}

html[data-theme='dark'] {
  --bg-color: #000;
  --color: #fff;
}

body {
  background-color: var(--bg-color);
  color: var(--color);
  transition: color, background-color 500ms;
}
```

[Here's a working codesandbox](https://codesandbox.io/s/dark-mode-with-css-and-js-69uv6t)

I hope this is useful to you!

## Helpful links

- CSS Variables https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- WTF is `falsy`? https://developer.mozilla.org/en-US/docs/Glossary/Falsy
