<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
import List from './components/List.vue'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <div class=" ">
    <div class="bg-gray-500">
      <div class="container mx-auto">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="container mx-auto min-h-[700px]">
      <list></list>
    </div>

    <div class="bg-gray-500">
      <div class="container mx-auto m-12">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
