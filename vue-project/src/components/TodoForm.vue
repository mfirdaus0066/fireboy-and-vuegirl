<!--
  CP6 change: auto-focus the input when the form appears on screen.
  You can't focus an element before it exists, so we wait for onMounted.
-->
<script setup>
import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['add'])

const text = ref('')
const note = ref('')
const important = ref(false)

// A "template ref": Vue puts the real <input> element in here after mounting
const inputEl = ref(null)

const canAdd = computed(() => text.value.trim().length > 0)

onMounted(() => {
  inputEl.value.focus()
})

function submit() {
  if (!canAdd.value) return
  emit('add', {
    text: text.value.trim(),
    note: note.value.trim(),
    important: important.value,
  })
  text.value = ''
  note.value = ''
  important.value = false
}
</script>

<template>
  <form @submit.prevent="submit">
    <div class="row">
      <input ref="inputEl" v-model="text" type="text" placeholder="What needs doing?" />
      <button class="primary" type="submit" :disabled="!canAdd">Add</button>
    </div>
    <textarea v-model="note" rows="2" placeholder="Notes (optional)"></textarea>
    <label class="check">
      <input v-model="important" type="checkbox" /> Important
    </label>
  </form>
</template>
