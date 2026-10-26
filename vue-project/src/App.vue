<!--
  CHECKPOINT 5 — Components & props
  New: splitting UI into files, defineProps (data down), defineEmits (events up)
  App.vue is now the "parent": it OWNS the todos and decides how they change.
-->
<script setup>
import { ref, reactive, computed, watch } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilters from './components/TodoFilters.vue'

const title = ref('My Todo List')
const user = reactive({ name: 'Student', streak: 1 })

const todos = ref([
  { id: 1, text: 'Learn ref()', note: '', important: false, done: false },
  { id: 2, text: 'Install Node.js', note: 'Use the LTS version', important: false, done: true },
  { id: 3, text: 'Build a todo app', note: '', important: true, done: false },
])

const filter = ref('all')
let nextId = 4

const remaining = computed(() => todos.value.filter((t) => !t.done).length)
const doneCount = computed(() => todos.value.length - remaining.value)
const visibleTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((t) => !t.done)
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  return todos.value
})

watch(remaining, (count) => {
  document.title = count > 0 ? `(${count}) Todos` : 'All done! ✅'
}, { immediate: true })

watch(todos, (list) => {
  localStorage.setItem('todos', JSON.stringify(list))
}, { deep: true })

// These handlers run when a CHILD emits an event
function addTodo(data) {
  todos.value.push({ id: nextId++, done: false, ...data })
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

      <!-- @add listens for emit('add', ...) inside TodoForm -->
      <TodoForm @add="addTodo" />

      <ul v-if="visibleTodos.length > 0" class="list">
        <!-- :todo passes a prop DOWN; @toggle / @remove listen for events UP -->
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
