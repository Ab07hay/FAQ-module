<template>
  <div class="form-control mt-3">
    <div class="input-group">
      <input
        type="text"
        placeholder="Search Question..."
        v-model="searchFieldValue"
        class="input input-bordered"
      />
      <button class="btn btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
 <!-- <h1>{{ filteredItems }}</h1>  -->
</template>

<script setup lang="ts">
import { computed, defineEmits, onMounted, ref } from 'vue'

const emits = defineEmits<{
  (e: 'searchByValue', payload: any): void
}>()

const searchFieldValue = ref('')
const faqData = ref([])
const filteredItems = computed(() => {
  if (searchFieldValue.value === '') {
    emits('searchByValue', faqData.value)
    return faqData.value
  } else {
    const searchTerm = searchFieldValue.value.toLowerCase()
    const filterValue: any = faqData.value.filter((item: { question: string }) =>
      item.question.toLowerCase().includes(searchTerm)
    )
    emits('searchByValue', filterValue)
    return filterValue
  }
})
onMounted(() => {
  const listItems: any = localStorage.getItem('faqItem') ? localStorage.getItem('faqItem') : ''
  faqData.value = JSON.parse(listItems)
})
</script>
