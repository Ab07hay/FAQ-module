<template>
  <!-- <progress class="progress w-56"></progress> -->
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text text-black">Write your quetion</span>
          <!-- <span class="label-text-alt">Top Right label</span> -->
        </label>
        <input
          type="text"
          placeholder="Type here"
          v-model.trim="question"
          class="input input-bordered w-full max-w-xs"
        />
        <label class="label">
          <!-- <span class="label-text-alt">Bottom Left label</span>
          <span class="label-text-alt">Bottom Right label</span> -->
        </label>

        <label class="label">
          <span class="label-text text-black">Write your answer</span>
          <!-- <span class="label-text-alt">Top Right label</span> -->
        </label>
        <textarea
          type="text"
          placeholder="Type here"
          v-model="answer"
          class="input input-bordered w-full max-w-xs"
        />
        <label class="label">
          <!-- <span class="label-text-alt">{{editFaqId}}</span> -->
          <!-- <span class="label-text-alt">Bottom Right label</span> -->
        </label>
      </div>
      <div class="modal-action">
        <label for="my-modal" class="btn" @click="cancel">Cancel</label>
        <label for="my-modal" class="btn btn-success" @click="createFaqItem">Save</label>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'
import moment from 'moment'
import { useFaqStore } from '.././stores/faq';
import { storeToRefs } from 'pinia';
const store = useFaqStore()
const {editFaqId,editFaqEnable,createFaqEnable}= storeToRefs(store)
// const props = defineProps<{
//   editFaqId: any
//   createFaqEnable: any
//   editFaqEnable: any
// }>()
const toast = useToast()

const question = ref('')
const answer = ref('')
const updateValue = ref('')
const items = ref<Record<string, string>[]>([])
const emits = defineEmits<{
  (e: 'cancel'): void
  
}>()
function formatDate(date: string | Date | number, dateFormat = 'MMMM Do YYYY, h:mm:ss A') {
  return moment(date).format(dateFormat)
}
const previousItems = localStorage.getItem('faqItem')
const re = JSON.parse(previousItems)
// console.log(re);
re.forEach((element: any) => {
  items.value.push(element)
})
items.value.push()
function createFaqItem() {
  const payload = {
    question: question.value.trim(),
    answer: answer.value.trim(),
    created: formatDate(Date.now(), 'MMM DD, YYYY, h:mm A')
  }
  if(createFaqEnable.value==='create'){
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
function cancel() {
  question.value = ''
  updateValue.value = ''
  answer.value = ''
  emits('cancel')
}

onMounted(() => {

  
  updateValue.value = editFaqEnable.value

  if (updateValue.value === 'edit') {
    question.value = editFaqId.value[0].question
    answer.value = editFaqId.value[0].answer
  }
  if (createFaqEnable.value === 'create') {
    question.value = ''
    answer.value = ''
  }
})
</script>
