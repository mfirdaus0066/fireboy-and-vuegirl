<!--
  CHECKPOINT 6 — Lifecycle hooks (onMounted)
  New: onMounted() to load data once the component is on screen.
  Fixes the CP4 cliffhanger: we saved to localStorage but never loaded it.
-->
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilters from './components/TodoFilters.vue'

const title = ref('My Todo List')
const user = reactive({ name: 'Student', streak: 1 })

const DEFAULT_TODOS = [
  { id: 1, text: 'Learn ref()', note: '', important: false, done: false },
  { id: 2, text: 'Install Node.js', note: 'Use the LTS version', important: false, done: true },
  { id: 3, text: 'Build a todo app', note: '', important: true, done: false },
]

// Start EMPTY. The data arrives in onMounted, just like data from a server will.
const todos = ref([])
const filter = ref('all')

const remaining = computed(() => todos.value.filter((t) => !t.done).length)
const doneCount = computed(() => todos.value.length - remaining.value)
const visibleTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((t) => !t.done)
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  return todos.value
})

console.log('1. setup runs: the component is being created (not on screen yet)')

onMounted(() => {
  console.log('2. onMounted: the component is on screen. Load the data!')
  const saved = localStorage.getItem('todos')
  todos.value = saved ? JSON.parse(saved) : DEFAULT_TODOS
})

watch(remaining, (count) => {
  document.title = count > 0 ? `(${count}) Todos` : 'All done! ✅'
})

watch(todos, (list) => {
  localStorage.setItem('todos', JSON.stringify(list))
}, { deep: true })

function addTodo(data) {
  // Biggest id + 1, so ids stay unique after a reload
  const nextId = Math.max(0, ...todos.value.map((t) => t.id)) + 1
  todos.value.push({ id: nextId, done: false, ...data })
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id) {
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

      <TodoForm @add="addTodo" />

      <ul v-if="visibleTodos.length > 0" class="list">
        <TodoItem
          v-for="todo in visibleTodos"
          :key="todo.id"
          :todo="todo"
          @toggle="toggleTodo"
          @remove="removeTodo"
        />
      </ul>
      <p v-else class="empty">Nothing here for "{{ filter }}".</p>

      <TodoFilters
        :filter="filter"
        :remaining="remaining"
        :done-count="doneCount"
        @change-filter="filter = $event"
        @clear-done="clearDone"
      />
    </div>
  </div>
</template>
