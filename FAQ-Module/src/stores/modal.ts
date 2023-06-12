import { defineStore, storeToRefs } from 'pinia'
import { ref ,watch} from 'vue'
import { useFaqStore } from './faq'
import { formatDate } from '@/composable/formatDate'
import { useToast } from 'vue-toastification'
import type { FaqData } from '@/interfaces/faqPayload'

export const useModalStore = defineStore('modal', () => {
  const toast = useToast()
  const store = useFaqStore()
  const { editFaqId, editFaqEnable, createFaqEnable,editQueId } = storeToRefs(store)
  const {filteredItemss}=store
  const question = ref('')
  const answer = ref('')
  const updateValue = ref('')
  const items = ref<FaqData[]>([])
 
  function createFaqItem () {
    const previousItems: any = localStorage.getItem('faqItem') ? localStorage.getItem('faqItem') : ''
    const re = JSON.parse(previousItems)
    items.value=[]
    re.forEach((element: any) => {
      items.value.push(element)
    })
    const payload:FaqData = {
      question: question.value.trim(),
      answer: answer.value.trim(),
      created: formatDate(Date.now(), 'MMM DD, YYYY, h:mm A'),
      updated:''
    }
    if (createFaqEnable.value === 'create') {
      items.value.unshift(payload)
      localStorage.setItem('faqItem', JSON.stringify(items.value))
      store.reloadFaq();
      toast.success('Successfully Created', {
        timeout: 2000
      })
    } else {
      items.value[editQueId.value].question = payload.question
      items.value[editQueId.value].answer = payload.answer
      items.value[editQueId.value].updated = formatDate(Date.now(), 'MMM DD, YYYY, h:mm A')

      localStorage.setItem('faqItem', JSON.stringify(items.value))
      store.reloadFaq();
      toast.success('Successfully Updated', {
        timeout: 2000
      })
    }
  }

  return {question,answer,updateValue,items,createFaqItem}
})
