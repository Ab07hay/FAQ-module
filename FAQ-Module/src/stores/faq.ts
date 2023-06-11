import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useFaqStore = defineStore('faqModule', () => {
  const searchFieldValue = ref<string>('')
  interface FaqData {
    question: string
    answer: string
    created: Date
    updated?: Date
  }
  const faqData = ref<FaqData[]>([])
  const editFaqId = ref()
  const createFaqEnable = ref('')
  const editFaqEnable = ref('')
  const toast = useToast()
  const listItems: any= localStorage.getItem('faqItem') ? localStorage.getItem('faqItem') : ''
  faqData.value = JSON.parse(listItems)
  const filteredItemss = computed(() => {
    if (searchFieldValue.value === '') {
      return faqData.value
    } else {
      const searchTerm = searchFieldValue.value.toLowerCase()
      const filterValue: any = faqData.value.filter((item: { question: string }) =>
        item.question.toLowerCase().includes(searchTerm)
      )
      return filterValue
    }
  })

  function editFaq(index: number) {
    editFaqId.value = faqData.value.filter((data: any, i: any) => {
      return i === index ? data : ''
    })
    createFaqEnable.value = ''
    editFaqEnable.value = 'edit'
  }

  function deleteFaq(index: number) {
    faqData.value.splice(index, 1)
    localStorage.setItem('faqItem', JSON.stringify(faqData.value))
    toast.success('Successfully Deleted', {
      timeout: 2000
    })
  }

  function createFaq() {
    createFaqEnable.value = 'create'
  }
  function cancel() {
    createFaqEnable.value = 'create'
    editFaqEnable.value = ''
  }

  return {
    cancel,
    createFaq,
    deleteFaq,
    editFaq,
    faqData,
    filteredItemss,
    searchFieldValue,
    toast,
    editFaqEnable,
    createFaqEnable,
    editFaqId
  }
})
