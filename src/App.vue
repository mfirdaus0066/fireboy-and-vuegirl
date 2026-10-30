<!--
  CHECKPOINT 6 — Lifecycle hooks (onMounted)
  New: onMounted() to load saved data and focus the input once the page is on screen.

  Functions in this checkpoint: addTodo, toggleTodo, removeTodo, clearDone
  (same four; each one now also saves the list to localStorage as its last line)
-->
<script setup>
import { ref, reactive, computed, onMounted , onUnmounted, watch,} from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import TodoItem from './components/TodoItem.vue'
import TodoFilters from './components/TodoFilters.vue'
import LoginForm from './components/LoginForm.vue'
import { 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  writeBatch, 
  serverTimestamp,
  where,
 } from 'firebase/firestore'
import { db, todosCol , auth} from './firebase'

const user = ref(null)
const authReady = ref(false)

const title = ref('My Todo List')

const DEFAULT_TODOS = [
  { id: 1, text: 'Learn ref()', note: '', important: false, done: false },
  { id: 2, text: 'Install Node.js', note: 'Use the LTS version', important: false, done: true },
  { id: 3, text: 'Build a todo app', note: '', important: true, done: false },
]

// Start EMPTY. The data arrives in onMounted, just like data from a server will.
const todos = ref([])

const showTips = ref(false)

const newText = ref('')
const newNote = ref('')
const newImportant = ref(false)

// A "template ref": Vue puts the real <input> element in here after mounting
const inputEl = ref(null)

const filter = ref('all')

const remaining = computed(() => todos.value.filter((t) => !t.done).length)
const doneCount = computed(() => todos.value.length - remaining.value)
const canAdd = computed(() => newText.value.trim().length > 0)

const visibleTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((t) => !t.done)
  if (filter.value === 'done') return todos.value.filter((t) => t.done)
  return todos.value
})

let stopAuth = null
let stopTodos = null

onMounted(() => {
  stopAuth = onAuthStateChanged(auth, (u) => {
    user.value = u
    authReady.value = true
  })
})

// Each time the user changes, stop the old listener and start one for the new user
watch(user, (u) => {
  if (stopTodos) stopTodos()
  todos.value = []
  if (!u) return

  const q = query(todosCol, where('uid', '==', u.uid), orderBy('createdAt'))
  stopTodos = onSnapshot(
    q,
    (snap) => { todos.value = snap.docs.map((d) => ({ id: d.id, ...d.data() })) },
    (err) => console.error('Could not load todos:', err.message),
  )
})

onUnmounted(() => {
  if (stopAuth) stopAuth()
  if (stopTodos) stopTodos()
})

function logout() {
  signOut(auth)   // the watch above clears the list and stops the listener
}

function addTodo() {
  if (newText.value.trim() === '') return

  const newTodo = ({
    
    text: newText.value.trim(),
    note: newNote.value.trim(),
    important: newImportant.value,
    done: false,
    uid: user.value.uid,
    createdAt: serverTimestamp(),

  })

  newText.value = ''
  newNote.value = ''
  newImportant.value = false

  addDoc(todosCol,newTodo)
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id)
  updateDoc(doc(db, 'todos', id), { done: !todo.done })
}

function removeTodo(id) {
  deleteDoc(doc(db, 'todos', id))
}

function clearDone() {
  const batch = writeBatch(db)
  todos.value
    .filter((t) => t.done)
    .forEach((t) => batch.delete(doc(db, 'todos', t.id)))
  batch.commit()
}

</script>

<template>
  <div class="app">
    <div class="card">
      <h1>{{ title }}</h1>
      
      <p v-if="!authReady" class="empty">Loading…</p>
      
      <LoginForm v-else-if="!user" />

      <template v-else>
        <p class="sub">Hello, {{ user.email }}! {{ remaining }} of {{ todos.length }} tasks left.
          <button class="link" @click="logout">Sign out</button>
        </p>
        


        <div class="toolbar">
          <button class="link" @click="showTips = !showTips">
            {{ showTips ? 'Hide' : 'Show' }} tips
          </button>
        </div>
        <div v-show="showTips" class="tips">
          Tip: refresh the page. Your tasks are still here.
        </div>
      

      <form @submit.prevent="addTodo">
        <div class="row">
          <input ref="inputEl" v-model="newText" type="text" placeholder="What needs doing?" />
          <button class="primary" type="submit" :disabled="!canAdd">Add</button>
        </div>
        <textarea v-model="newNote" rows="2" placeholder="Notes (optional)"></textarea>
        <label class="check">
          <input v-model="newImportant" type="checkbox" /> Important
        </label>
      </form>

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
      </template>
    </div>
  </div>
  
</template>
