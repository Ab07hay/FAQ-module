<script setup lang="ts">
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
import List from './components/List.vue'
</script>

<template>
  <div class=" ">
    <div class="bg-sky-900">
      <div class="container mx-auto">
        <Navbar></Navbar>
      </div>
    </div>
    <div class="container mx-auto min-h-[700px]">
      <list></list>
    </div>
    <div class="bg-gray-100">
      <div class="container mx-auto m-12">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>
