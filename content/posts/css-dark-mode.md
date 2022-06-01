---
title: Dark Mode without JavaScript framework or library
description: A guide how to add dark mode in a website with only HTML, CSS and Vanilla JavaScript
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
  - html
  - dark mode
  - webdev
---

If you're wondering like `how can i add dark mode without javascript framework or library?` then the answer is, `Yes, you can!`.

## Color Scheme

Before we dive into the fun part, let make sure that the browser know if our site can render different color scheme (dark, and light) by placing one `meta` tag

```html
<head>
  <meta name="color-scheme" content="light dark" />
  <!-- ... rest of the head -->
</head>
```

What is this used for?, if you change system preference of your device to dark, you will notice that some of our native html element style is also changed.

Assuming you have some understanding in `CSS`, and `JavaScript`, let's dive into it.

## Adaptive stylesheet

Create a `style.css`, and copy this code

```css
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

## Controlling the theme

After stylesheet created, then we can continue to add a button to toggle the theme.

```html
<!-- index.html -->
<head>
  <meta name="color-scheme" content="light dark" />
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
  const text = theme === 'light' ? 'dark' : 'light';
  themeButtom.innerText = `Switch to ${text}`;
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

In above snippet, we grab the themeButton and store it in a variable called `themeButton`, and we declare a function called `setTheme` to change html's `data-theme` attribute, and our theme button's to change text to the opposite of the selected current theme.

Then we're listening to the button's `click` event, and what we're doing is:

- Get the current theme that is retrieved from the html's `data-theme` attribute, and if the value is `falsy` then assign to the default value to which is `light`.
- And we check if the current theme is `light`, then we call the `setTheme` function with `"dark"` argument, otherwise pass `"light"`.

Congratulations!, now you should be able to toggle the theme.

## Bonus

Here's some bonus tips for you.

### Persisting

To persist the user selected theme, we can use the Web Storage called `localStorage` or `sessionStorage`.

You can read more about them [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).

> In short, `localStorage` will keep the value forever, unless user decided to remove it. On the other hand, `sessionStorage` will remove all of the value if user close the browser.

For this example I think `localStorage` is the best option to save the user preferences.

What we need to do is to save the new theme every time we call the `setTheme` function

```js
// script.js
//... rest of the code

function setTheme(theme = 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  const text = theme === 'light' ? 'dark' : 'light';
  themeButtom.innerText = `Switch to ${text}`;

  // Save the new theme to the `localStorage`
  localStorage.setItem('theme', theme);
}
```

After we save the new theme, we can load the selected theme from the `localStorage` when page load.

```js
// script.js
//... rest of the code
function setTheme(theme = 'light') {
  document.documentElement.setAttribute('data-theme', theme);
  const text = theme === 'light' ? 'dark' : 'light';
  themeButtom.innerText = `Switch to ${text}`;
  localStorage.setItem('theme', theme);
}

// We read from the `localStorage`
// If there's nothing saved, then the fallback will be `"light"`
const preloadedTheme = localStorage.getItem('theme') || 'light';

// Immediately call `setTheme`
setTheme(preloadedTheme);
//... rest of the code
```

At this point you should be able to toggle between dark and light mode, and when you refresh the page, the theme preference should still persisted.

### Prevent flashing

If you try to set the theme to `dark` and reload the page, you should notice some short of flashing. This is because the `script` that has the logic to set the theme from localStorage is executed after the first browser paint.

To solve this, we move the logic to read user preference to the `head` of the html.

```html
<head>
  <meta name="color-scheme" content="light dark" />
  <script>
    let preloadedTheme = localStorage.getItem('theme');
    if (preloadedTheme == null) {
      const isPreferDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      preloadedTheme = isPreferDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', preloadedTheme);
  </script>
  <!-- ... rest of the head -->
</head>
```

Here we are reading from the `localStorage` and check if there's no value from the `localStorage` with the key of `'theme'` (which means this is the first time the user visit our site) then we try to detect their system preference if set to dark by using `window.matchMedia` method, and set the `data-theme` to whatever the system preference is.

And now you shouldn't get that flashing anymore, Cool!

## Conclusion

I hope this is useful to you!

[Here's a working codesandbox](https://codesandbox.io/s/dark-mode-with-css-and-js-69uv6t)

## Helpful links

- CSS Variables https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- WTF is `falsy` https://developer.mozilla.org/en-US/docs/Glossary/Falsy
- `window.matchMedia` https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
