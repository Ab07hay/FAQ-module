import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFaqStore = defineStore('faqModule', () => {
  const searchFieldValue = ref<string>('')
  interface FaqData {
    question: string
    answer: string
    created: Date
    updated?: Date
  }
  const faqData = ref<FaqData[]>([])
  const editFaqId = ref<{}>()
  const createFaqEnable = ref('')
  const editFaqEnable = ref('')
})
