<!--
  The "new task" form. It owns its own input state (local refs),
  and emits ONE event with the finished task when submitted.
-->
<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['add'])

const text = ref('')
const note = ref('')
const important = ref(false)

const canAdd = computed(() => text.value.trim().length > 0)

function submit() {
  if (!canAdd.value) return
  // Send the data UP to the parent, then reset the form
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
      <input v-model="text" type="text" placeholder="What needs doing?" />
      <button class="primary" type="submit" :disabled="!canAdd">Add</button>
    </div>
    <textarea v-model="note" rows="2" placeholder="Notes (optional)"></textarea>
    <label class="check">
      <input v-model="important" type="checkbox" /> Important
    </label>
  </form>
</template>
