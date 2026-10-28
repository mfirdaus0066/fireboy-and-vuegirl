<!--
  CHECKPOINT 0 — STARTER
  This is plain HTML: nothing here is reactive yet.
  Over the workshop you'll turn every hard-coded value into Vue state.
-->
<script setup>
// CP1: import { ref, reactive } from 'vue' and create your state here.
</script>

<template>
  <div class="app">
    <div class="card">
      <!-- CP1: replace the hard-coded title, name and count with {{ }} -->
      <h1>My Todo List</h1>
      <p class="sub">Hello, Student! You have 3 tasks.</p>

      <!-- CP3: make this form work with v-model -->
      <div class="row">
        <input type="text" placeholder="What needs doing?" />
        <button class="primary">Add</button>
      </div>

      <!-- CP2: render this list from an array with v-for -->
      <ul class="list">
        <li class="item">
          <input type="checkbox" />
          <span class="text">Learn ref()</span>
          <button class="remove">✕</button>
        </li>
        <li class="item done">
          <input type="checkbox" checked />
          <span class="text">Node.js</span>
          <button class="remove">✕</button>
        </li>
        <li class="item">
          <input type="checkbox" />
          <span class="text">Build a todo app</span>
          <button class="remove">✕</button>
        </li>
      </ul>

      <!-- CP4: real counts and working filters with computed() -->
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
