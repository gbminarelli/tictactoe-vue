<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="mx-2">Local Multiplayer</router-link> |
      <router-link to="/single-player" class="mx-2">Single Player</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
  #app {
    text-align: center;
    color: #00171f;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #00171f;
  }

  #nav a.router-link-exact-active {
    color: #007ea7;
  }
</style>
