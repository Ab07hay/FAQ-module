import { getLocalStorageData } from '@/composable/localStorageData'
import type { FaqData } from '@/interfaces/faqPayload'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

export const useFaqStore = defineStore('faqModule', () => {
  const searchFieldValue = ref<string>('')

  const faqData = ref<FaqData[]>([])
  const editFaqId = ref()
  const editQueId = ref()
  const createFaqEnable = ref('')
  const editFaqEnable = ref('')
  const toast = useToast()
  // const listItems: any = localStorage.getItem('faqItem') ? localStorage.getItem('faqItem') : ''
  // faqData.value = JSON.parse(listItems)
  faqData.value=getLocalStorageData()
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

  function reloadFaq() {
    // const listItems: any = localStorage.getItem('faqItem') ? localStorage.getItem('faqItem') : ''
    // faqData.value = JSON.parse(listItems)
    faqData.value=getLocalStorageData()
  }
  
  function editFaq(index: number) {
    editFaqId.value = faqData.value.filter((data: FaqData, i: number) => {
      return i === index ? data : ''
    })
    createFaqEnable.value = ''
    editQueId.value = index
    editFaqEnable.value = 'edit'
  }

  function deleteFaq(index: number) {
    let text = 'Are you sure, you want to delete this item'
    if (confirm(text) == true) {
      faqData.value.splice(index, 1)
      localStorage.setItem('faqItem', JSON.stringify(faqData.value))
      toast.success('Successfully Deleted', {
        timeout: 2000
      })
    } 
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
    reloadFaq,
    faqData,
    editQueId,
    filteredItemss,
    searchFieldValue,
    toast,
    editFaqEnable,
    createFaqEnable,
    editFaqId
  }
})
