---
title: CSS Spin Animation
description: Simple CSS animation
tag: css
---

This can be useful to be applied on loader.

```css
/* style.css */

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader {
  animation: spin 0.5s linear infinite;
}
```
