---
theme: default
layout: cover
transition: fade
voiceover: true
cameraMotion: pan-zoom
background: ai://generate?prompt=abstract modern tech background
---


# Advanced Motion.md Features
Demonstrating sophisticated capabilities

---
layout: two-cols
transition: slide-up
voiceover: "Let's explore advanced code transitions and animations"
cameraMotion: zoom-in
---

# Code Transitions

::left::

<CodeTransition>

```typescript {1-3|4-6|all}
interface User {
  name: string;
  age: number;
}

function createUser(data: User) {
  // Implementation
}
```

```typescript {1-3|4-7|all}
interface User {
  name: string;
  age: number;
  roles: string[];
}

function createUser(data: User) {
  validateUser(data);
  return saveUser(data);
}
```

</CodeTransition>

::right::

# Features

- Smooth token transitions
- Line highlighting
- Step-by-step reveals
- Error annotations
- Callouts

---
layout: full
transition: fade
voiceover: "Demonstrating AI-generated content and camera motions"
cameraMotion: pan-right
background: video://luma/3d-render
---

# Mixed Media Demo

<div class="grid grid-cols-2 gap-4">
  <div>
    <img src="ai://generate?prompt=futuristic city" />
  </div>
  <div>
    <video src="storyblocks://timelapse-city" />
  </div>
</div>

---
layout: default
transition: slide-up
voiceover: "Advanced animation sequences with custom timing"
cameraMotion: zoom-out
---

# Animation Sequence

<AnimationSequence>
  <div v-motion="fade-in" :delay="1000">First Item</div>
  <div v-motion="slide-up" :delay="2000">Second Item</div>
  <div v-motion="zoom-in" :delay="3000">Third Item</div>
</AnimationSequence>
