import { getLocalStorageData, setLocalStorageData } from '@/composable/localStorageData'
import { showSuccessToast } from '@/composable/toast'
import type { FaqData } from '@/interfaces/faqPayload'
import { defineStore } from 'pinia' // pinia here is use for state management
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

//this is the faqModule store for use for listing page
export const useFaqStore = defineStore('faqModule', () => {
  const modalStore = useModalStore()
  const { answer, question } = storeToRefs(modalStore)
  //all below ref here act as a state properties
  const searchFieldValue = ref<string>('')
  const faqData = ref<FaqData[]>([])
  const editFaqId = ref()
  const globalErrorHandlerKey = ref(true)
  const editQueId = ref()

  faqData.value = getLocalStorageData()

  //computed act as a getters in pinia state management

  //below computed is for the search box user are able to search with quetion or answer
  const filteredItemss = computed(() => {
    const searchTerm = searchFieldValue.value.toLowerCase()

    return searchTerm === ''
      ? faqData.value
      : faqData.value.filter(
          (item) =>
            item.question.toLowerCase().includes(searchTerm) ||
            item.answer.toLowerCase().includes(searchTerm)
        )
  })

  //all the given functions becomes actions

  function reloadFaq() {
    faqData.value = getLocalStorageData()
  }

  function editFaq(index: number) {
    editFaqId.value = faqData.value.filter((data: FaqData, i: number) => {
      return i === index ? data : ''
    })
    editQueId.value = index

    if (editQueId.value >= 0) {
      answer.value = editFaqId.value[0].answer
      question.value = editFaqId.value[0].question
    }
  }

  function createFaq() {
    answer.value = ''
    question.value = ''
    globalErrorHandlerKey.value = false
  }

  function deleteFaq(index: number) {
    const text = 'Are you sure, you want to delete this item'
    if (confirm(text) == true) {
      faqData.value.splice(index, 1)
      setLocalStorageData(faqData.value)
      showSuccessToast('Successfully Deleted')
    }
  }


  return {
    deleteFaq,
    editFaq,
    reloadFaq,
    createFaq,
    faqData,
    globalErrorHandlerKey,
    editQueId,
    filteredItemss,
    searchFieldValue,
    editFaqId
  }
})
