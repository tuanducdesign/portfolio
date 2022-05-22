---
title: CSS Spin Animation
description: Simple CSS animation
icon: devicon-css3-plain colored
tags:
  - css
---

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
