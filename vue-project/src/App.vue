<!--
  CHECKPOINT 3 — Form inputs & two-way binding
  New: v-model on text input, textarea and checkbox; @submit.prevent
-->
<script setup>
import { ref, reactive } from 'vue'

const title = ref('My Todo List')
const user = reactive({ name: 'Student', streak: 1 })

const todos = ref([
  { id: 1, text: 'Learn ref()', note: '', important: false, done: false },
  { id: 2, text: 'Install Node.js', note: 'Use the LTS version', important: false, done: true },
  { id: 3, text: 'Build a todo app', note: '', important: true, done: false },
])

const showTips = ref(false)
let nextId = 4

// Form state — v-model keeps these in sync with the inputs
const newText = ref('')
const newNote = ref('')
const newImportant = ref(false)

function addTodo() {
  if (newText.value.trim() === '') return

  todos.value.push({
    id: nextId++,
    text: newText.value.trim(),
    note: newNote.value.trim(),
    important: newImportant.value,
    done: false,
  })

  // Clearing the data also clears the inputs (two-way!)
  newText.value = ''
  newNote.value = ''
  newImportant.value = false
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

      <div class="toolbar">
        <button class="link" @click="showTips = !showTips">
          {{ showTips ? 'Hide' : 'Show' }} tips
        </button>
      </div>
      <div v-show="showTips" class="tips">
        Tip: press Enter to add a task. Tick "Important" to tag it.
      </div>

      <!-- .prevent stops the browser from reloading the page on submit -->
      <form @submit.prevent="addTodo">
        <div class="row">
          <input v-model="newText" type="text" placeholder="What needs doing?" />
          <button class="primary" type="submit">Add</button>
        </div>
        <textarea v-model="newNote" rows="2" placeholder="Notes (optional)"></textarea>
        <label class="check">
          <input v-model="newImportant" type="checkbox" /> Important
        </label>
        <!-- Live preview shows two-way binding working -->
        <p v-if="newText" class="sub">Preview: "{{ newText }}"</p>
      </form>

      <ul v-if="todos.length > 0" class="list">
        <li v-for="todo in todos" :key="todo.id" class="item" :class="{ done: todo.done }">
          <!-- v-model on a checkbox replaces :checked + @change from CP2 -->
          <input v-model="todo.done" type="checkbox" />
          <span class="text">
            {{ todo.text }}
            <span v-if="todo.important" class="tag">Important</span>
            <span v-if="todo.note" class="note">{{ todo.note }}</span>
          </span>
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
