import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal',()=>{
    
const question = ref('')
const answer = ref('')
const updateValue = ref('')
const items = ref<Record<string, string>[]>([])
const previousItems = localStorage.getItem('faqItem')
const re = JSON.parse(previousItems)
// console.log(re);
re.forEach((element: any) => {
  items.value.push(element)
})

function createFaqItem() {
    const payload = {
      question: question.value.trim(),
      answer: answer.value.trim(),
      created: formatDate(Date.now(), 'MMM DD, YYYY, h:mm A')
    }
    if(props.createFaqEnable==='create'){
      items.value.unshift(payload)
    localStorage.setItem('faqItem', JSON.stringify(items.value))
    toast.success('Successfully Created', {
      timeout: 2000
    })
    }
    else{
      items.value[4].question=payload.question
      items.value[4].answer=payload.answer
      items.value[4].updated=formatDate(Date.now(), 'MMM DD, YYYY, h:mm A')
      
    localStorage.setItem('faqItem', JSON.stringify(items.value))
    toast.success('Successfully Updated', {
      timeout: 2000
    })
    }
  }
})