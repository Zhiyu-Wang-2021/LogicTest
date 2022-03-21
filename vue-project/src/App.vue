<script setup>
import { RouterView } from "vue-router";
import NavMenu from "./components/NavMenu.vue";
</script>

<template>
  <header>

    <div class="wrapper">
      <NavMenu/>

    </div>
  </header>
  <div class="router-view">
    <RouterView />
  </div>

</template>

<style>
@import "@/assets/base.css";
.router-view {
  margin: 150px 50px 50px;
}
</style>
