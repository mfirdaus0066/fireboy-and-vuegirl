<!--
  CHECKPOINT 2 — Template directives & event handling
  New: v-for + :key, v-if / v-else, v-show, @click, :class
-->
<script setup>
import { ref, reactive } from 'vue'

const title = ref('My Todo List')
const user = reactive({ name: 'Student', streak: 1 })

const todos = ref([
  { id: 1, text: 'Learn ref()', done: false },
  { id: 2, text: 'Install Node.js', done: true },
  { id: 3, text: 'Build a todo app', done: false },
])

const showTips = ref(false)
let nextId = 4

// Event handlers are just functions
function addSample() {
  todos.value.push({ id: nextId, text: `Sample task #${nextId}`, done: false })
  nextId++
}

function toggle(todo) {
  todo.done = !todo.done
}

function remove(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <div class="app">
    <div class="card">
      <h1>{{ title }}</h1>
      <p class="sub">Hello, {{ user.name }}! You have {{ todos.length }} tasks.</p>

      <!-- v-show only hides with CSS (element stays in the page) -->
      <div class="toolbar">
        <button class="link" @click="showTips = !showTips">
          {{ showTips ? 'Hide' : 'Show' }} tips
        </button>
      </div>
      <div v-show="showTips" class="tips">
        Tip: click a checkbox to finish a task, ✕ to delete it.
      </div>

      <div class="row">
        <input type="text" placeholder="What needs doing? (CP3)" disabled />
        <button class="primary" @click="addSample">Add sample</button>
      </div>

      <!-- v-if / v-else really add/remove elements -->
      <ul v-if="todos.length > 0" class="list">
        <!-- v-for repeats the <li>; :key helps Vue track each item -->
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="item"
          :class="{ done: todo.done }"
        >
          <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
          <span class="text">{{ todo.text }}</span>
          <button class="remove" @click="remove(todo.id)">✕</button>
        </li>
      </ul>
      <p v-else class="empty">🎉 Nothing to do! Add a task above.</p>

      <div class="footer">
        <span>? items left</span>
        <div class="filters">
          <button class="active">All</button>
          <button>Active</button>
          <button>Done</button>
        </div>
      </div>
    </div>
  </div>
</template>
