import { getLocalStorageData, setLocalStorageData } from '@/composable/localStorageData'
import { showSuccessToast } from '@/composable/toast'
import type { FaqData } from '@/interfaces/faqPayload'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

export const useFaqStore = defineStore('faqModule', () => {
  const searchFieldValue = ref<string>('')
  const faqData = ref<FaqData[]>([])
  const editFaqId = ref()
  const editQueId = ref()
  const createFaqEnable = ref('')
  const editFaqEnable = ref('')
  const toast = useToast()

  faqData.value = getLocalStorageData()

  const filteredItemss = computed(() => {
    const searchTerm = searchFieldValue.value.toLowerCase()

    return searchTerm === ''
      ? faqData.value
      : faqData.value.filter((item) => item.question.toLowerCase().includes(searchTerm))
  })

  function reloadFaq() {
    faqData.value = getLocalStorageData()
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
      setLocalStorageData(faqData.value)
      showSuccessToast('Successfully Deleted')
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
