# Vue Todo Workshop 📝

Build a todo app step by step and learn the core of Vue 3 along the way.
At the end, your app is ready to plug into Firebase.

## Setup (do this BEFORE the workshop)

You need **Node.js 20 or newer** (`node -v` to check).

```bash
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173).

## Where do I write code?

| File / folder | What it is |
|---|---|
| `src/student/App.vue` | **Your app.** This is where you work. |
| `src/student/components/` | Put your components here in Checkpoint 5. |
| `src/checkpoints/cp0 … cp7` | Finished code for each checkpoint. Peek if you're stuck! |
| `src/services/fakeApi.js` | A pretend server, used in Checkpoint 7. |

You can always check the answer by changing the branch.

**Fell behind?** Copy the contents of the previous checkpoint folder into `src/student/` and carry on.

## Checkpoints

### CP1 · Reactivity basics (`ref` vs `reactive`)
- [ ] Import `ref` and `reactive` from `'vue'`.
- [ ] Make `title` a `ref` and `todos` a `ref([...])` holding the 3 tasks.
- [ ] Make `user` a `reactive({ name, streak })`.
- [ ] Replace the hard-coded title, name and task count with `{{ }}`.
- [ ] Prove it's reactive: change `title.value` inside a `setTimeout`.

### CP2 · Directives & events
- [ ] Render the list with `v-for="todo in todos"` and `:key="todo.id"`.
- [ ] Add `:class="{ done: todo.done }"` to each row.
- [ ] Show "Nothing to do" with `v-if` / `v-else` when the list is empty.
- [ ] Add a "Show tips" button that toggles a panel with `v-show`.
- [ ] `@click` handlers: add a sample task, toggle done, delete (✕).

### CP3 · Forms & two-way binding
- [ ] `v-model` the text input, a notes `<textarea>`, and an "Important" checkbox.
- [ ] Submit with `<form @submit.prevent="addTodo">`, then clear the inputs.
- [ ] Replace the row checkbox's `:checked` + `@change` with `v-model="todo.done"`.
- [ ] Show the note and an "Important" tag on each task with `v-if`.

### CP4 · Computed & watchers
- [ ] `computed`: `remaining`, `doneCount`, `canAdd`, `visibleTodos`.
- [ ] Make the All / Active / Done filter buttons work.
- [ ] Disable "Add" when `canAdd` is false. Add "Clear done".
- [ ] `watch` `remaining` → update `document.title`.
- [ ] `watch` `todos` (`{ deep: true }`) → save to `localStorage`.
- 🤔 Refresh the page. Why did your tasks disappear?

### CP5 · Components & props
- [ ] Create `TodoForm.vue` → emits `add` with the new task.
- [ ] Create `TodoItem.vue` → prop `todo`, emits `toggle` and `remove`.
- [ ] Create `TodoFilters.vue` → props `filter`, `remaining`, `doneCount`; emits `change-filter`, `clear-done`.
- [ ] `App.vue` keeps the data and handles every event.

### CP6 · Lifecycle (`onMounted`)
- [ ] Start with `todos = ref([])`.
- [ ] In `onMounted`, load the saved list from `localStorage`.
- [ ] In `TodoForm`, auto-focus the input in `onMounted` using a template `ref`.
- 🎉 Refresh: your tasks survive now.

### CP7 · Talking to a server (Firebase prep)
- [ ] Import `* as api from '../services/fakeApi.js'`.
- [ ] Add `loading`, `saving` and `error` refs.
- [ ] Rewrite each handler as `async` with `try / catch / finally`.
- [ ] Show "Loading…" while `loading`, and a red error banner with Retry when `error` is set.
- [ ] Click "Make next request fail" and check that your banner appears.

## Stretch goals (finished early?)
- Double-click a task to edit its text.
- Add a search box: a `computed` that filters by text.
- Sort important tasks to the top.
- Show a 🎉 message when every task is done.
