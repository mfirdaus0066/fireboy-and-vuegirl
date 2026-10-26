<!--
  CHECKPOINT 4 — Computed properties & watchers
  New: computed() for derived state, watch() for side effects
-->
<script setup>
import { ref, reactive, computed, watch } from 'vue'

const title = ref('My Todo List')
const user = reactive({ name: 'Student', streak: 1 })

const todos = ref([
  { id: 1, text: 'Learn ref()', note: '', important: false, done: false },
  { id: 2, text: 'Install Node.js', note: 'Use the LTS version', important: false, done: true },
  { id: 3, text: 'Build a todo app', note: '', important: true, done: false },
])

const showTips = ref(false)
let nextId = 4

const newText = ref('')
const newNote = ref('')
const newImportant = ref(false)

// Which filter button is selected: 'all' | 'active' | 'done'
const filter = ref('all')

// ---- computed: values DERIVED from other state. Cached, auto-updated. ----
const remaining = computed(() => todos.value.filter((t) => !t.done).length)
const doneCount = computed(() => todos.value.length - remaining.value)
const canAdd = computed(() => newText.value.trim().length > 0)

const visibleTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((t) => !t.done)
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  return todos.value
})

// ---- watch: run a SIDE EFFECT when something changes ----
// 1) Keep the browser tab title in sync with the count
watch(remaining, (count) => {
  document.title = count > 0 ? `(${count}) Todos` : 'All done! ✅'
}, { immediate: true })

// 2) Save the list whenever it changes. deep: true = also watch inside each todo.
//    Check DevTools → Application → Local Storage. Refresh the page...
//    the list resets! We save, but never load. That's CP6's job.
watch(todos, (list) => {
  localStorage.setItem('todos', JSON.stringify(list))
}, { deep: true })

function addTodo() {
  if (!canAdd.value) return
  todos.value.push({
    id: nextId++,
    text: newText.value.trim(),
    note: newNote.value.trim(),
    important: newImportant.value,
    done: false,
  })
  newText.value = ''
  newNote.value = ''
  newImportant.value = false
}

function remove(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

function clearDone() {
  todos.value = todos.value.filter((t) => !t.done)
}
</script>

<template>
  <div class="app">
    <div class="card">
      <h1>{{ title }}</h1>
      <p class="sub">Hello, {{ user.name }}! {{ remaining }} of {{ todos.length }} tasks left.</p>

      <div class="toolbar">
        <button class="link" @click="showTips = !showTips">
          {{ showTips ? 'Hide' : 'Show' }} tips
        </button>
      </div>
      <div v-show="showTips" class="tips">
        Tip: the tab title updates as you tick tasks. That's a watcher.
      </div>

      <form @submit.prevent="addTodo">
        <div class="row">
          <input v-model="newText" type="text" placeholder="What needs doing?" />
          <button class="primary" type="submit" :disabled="!canAdd">Add</button>
        </div>
        <textarea v-model="newNote" rows="2" placeholder="Notes (optional)"></textarea>
        <label class="check">
          <input v-model="newImportant" type="checkbox" /> Important
        </label>
      </form>

      <!-- Loop over the COMPUTED list, not the raw one -->
      <ul v-if="visibleTodos.length > 0" class="list">
        <li v-for="todo in visibleTodos" :key="todo.id" class="item" :class="{ done: todo.done }">
          <input v-model="todo.done" type="checkbox" />
          <span class="text">
            {{ todo.text }}
            <span v-if="todo.important" class="tag">Important</span>
            <span v-if="todo.note" class="note">{{ todo.note }}</span>
          </span>
          <button class="remove" @click="remove(todo.id)">✕</button>
        </li>
      </ul>
      <p v-else class="empty">Nothing here for "{{ filter }}".</p>

      <div class="footer">
        <span>{{ remaining }} {{ remaining === 1 ? 'item' : 'items' }} left</span>
        <div class="filters">
          <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
          <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
          <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Done</button>
        </div>
        <button v-if="doneCount > 0" class="link" @click="clearDone">
          Clear done ({{ doneCount }})
        </button>
      </div>
    </div>
  </div>
</template>
