import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useFaqStore } from './faq'
import { formatDate } from '@/composable/formatDate'
import type { FaqData } from '@/interfaces/faqPayload'
import { getLocalStorageData, setLocalStorageData } from '@/composable/localStorageData'
import { showSuccessToast } from '@/composable/toast'

export const useModalStore = defineStore('modal', () => {
  const store = useFaqStore()
  const { createFaqEnable, editQueId } = storeToRefs(store)
  const question = ref('')
  const answer = ref('')
  const updateValue = ref('')
  const items = ref<FaqData[]>([])

  function createFaqItem() {
    const localStorageData = getLocalStorageData()
    items.value = []
    localStorageData.forEach((element: FaqData) => {
      items.value.push(element)
    })
    const payload: FaqData = {
      question: question.value.trim(),
      answer: answer.value.trim(),
      created: formatDate(Date.now(), 'MMM DD, YYYY, h:mm A'),
      updated: ''
    }
    if (createFaqEnable.value === 'create') {
      items.value.unshift(payload)
      setLocalStorageData(items.value)
      store.reloadFaq()
      showSuccessToast('Successfully Created')
    } else {
      const itemToUpdate = items.value[editQueId.value]
      updateItemProperties(itemToUpdate, payload.question, payload.answer)
      setLocalStorageData(items.value)
      store.reloadFaq()
      showSuccessToast('Successfully Updated')
    }
  }

  
  function onSubmit() {
    question.value && answer.value && createFaqItem()
  }
  function validateQuestion() {
    return question.value ? true : 'Question field should not be empty'
  }
  function validateAnswer() {
    return answer.value ? true : 'Answer field should not be empty'
  }

  function updateItemProperties(item: FaqData, question: string, answer: string) {
    item.question = question
    item.answer = answer
    item.updated = formatDate(Date.now(), 'MMM DD, YYYY, h:mm A')
  }
  return { question, answer, updateValue, items, createFaqItem ,onSubmit,validateAnswer,validateQuestion}
})
