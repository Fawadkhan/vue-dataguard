<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>|
      <RouterLink to="/repositories">Repositories</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-right: 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
