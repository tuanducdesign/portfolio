---
title: CSS Spin Animation
description: Simple CSS animation
icon: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg
tags:
  - css
---

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  animation: spin 0.5s linear infinite;
}
```
