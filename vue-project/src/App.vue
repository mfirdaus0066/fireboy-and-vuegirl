<!--
  CHECKPOINT 1 — Reactivity basics (ref vs reactive)
  New: ref(), reactive(), .value, {{ interpolation }}
-->
<script setup>
import { ref, reactive } from 'vue'

// ref() wraps ONE value: a string, number, boolean... or a whole array.
const title = ref('My Todo List')

const todos = ref([
  { id: 1, text: 'Learn ref()', done: false },
  { id: 2, text: 'Install Node.js', done: true },
  { id: 3, text: 'Build a todo app', done: false },
])

// reactive() makes an OBJECT reactive. You use its properties directly.
const user = reactive({ name: 'Student', streak: 1 })

// Proof that the page updates by itself when data changes:
// after 2 seconds we change the data, and Vue re-renders. No DOM code!
setTimeout(() => {
  title.value = 'My Reactive Todo List ⚡' // a ref needs .value in <script>
  user.streak++                            // reactive does NOT use .value
}, 2000)
</script>

<template>
  <div class="app">
    <div class="card">
      <!-- In the template, refs are unwrapped: no .value needed -->
      <h1>{{ title }}</h1>
      <p class="sub">
        Hello, {{ user.name }}! You have {{ todos.length }}
        {{ todos.length === 1 ? 'task' : 'tasks' }}. 🔥 Streak: {{ user.streak }} day(s)
      </p>

      <div class="row">
        <input type="text" placeholder="What needs doing?" />
        <button class="primary">Add</button>
      </div>

      <!-- Still repetitive... CP2 fixes this with v-for -->
      <ul class="list">
        <li class="item">
          <input type="checkbox" />
          <span class="text">{{ todos[0].text }}</span>
          <button class="remove">✕</button>
        </li>
        <li class="item done">
          <input type="checkbox" checked />
          <span class="text">{{ todos[1].text }}</span>
          <button class="remove">✕</button>
        </li>
        <li class="item">
          <input type="checkbox" />
          <span class="text">{{ todos[2].text }}</span>
          <button class="remove">✕</button>
        </li>
      </ul>

      <div class="footer">
        <span>2 items left</span>
        <div class="filters">
          <button class="active">All</button>
          <button>Active</button>
          <button>Done</button>
        </div>
      </div>
    </div>
  </div>
</template>
