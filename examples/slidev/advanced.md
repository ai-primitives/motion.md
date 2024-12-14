---
theme: default
layout: cover
background: https://source.unsplash.com/1600x900/?nature,water
---

# Advanced Slidev Features
Demonstrating advanced Slidev capabilities

---
layout: intro
---

# Presenter Mode

Press `B` to toggle dark mode
Press `O` to toggle overview mode

<v-click>

- ✨ [Animations](https://sli.dev/guide/animations.html)
- 🎨 [Customizing](https://sli.dev/guide/customization.html)
- 📤 [Exporting](https://sli.dev/guide/exporting.html)
- 🛠 [Configurations](https://sli.dev/guide/config.html)

</v-click>

---
layout: default
---

# Component Auto-Importing

```vue
<template>
  <Counter :count="10" />
</template>
```

<Counter :count="10" m="t-4" />

---
preload: false
---

# Animations

<div class="grid grid-cols-2 gap-4">
<div v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }">
  Slides
</div>
<div v-motion
  :initial="{ y: 100, opacity: 0 }"
  :enter="{ y: 0, opacity: 1 }">
  Content
</div>
</div>

---
layout: iframe-right
url: https://github.com/slidevjs/slidev
---

# Code Groups

```ts {monaco}
console.log('Hello, World!')
```

```python {2|4-5|7}
def greet(name):
    return f"Hello, {name}!"

def main():
    print(greet("World"))

if __name__ == "__main__":
    main()
```
