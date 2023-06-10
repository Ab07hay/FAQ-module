<template>
  <!-- <progress class="progress w-56"></progress> -->
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <div class="form-control w-full max-w-xs" :key="Math.random()">
        <label class="label">
          <span class="label-text text-black">What is your quetion?</span>
          <!-- <span class="label-text-alt">Top Right label</span> -->
        </label>
        <input
          type="text"
          placeholder="Type here"
          v-model="question"
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
import { onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import moment from 'moment'
const props = defineProps<{
  editFaqId: any
  createFaqEnable: any
  editFaqEnable: any
}>()
const question = ref('')
const answer = ref('')
const updateValue=ref('')
const items = ref<Record<string, string>[]>([])
const emits = defineEmits<{
  (e: 'createFaqItem', payload: Object): void
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
    question: question.value,
    answer: answer.value,
    created: formatDate(Date.now(), 'MMM DD, YYYY, h:mm A')
  }
  items.value.unshift(payload)
  localStorage.setItem('faqItem', JSON.stringify(items.value))
}
function cancel() {
    question.value = ''
    updateValue.value='create'
    answer.value = ''
}
onMounted(() => {
  updateValue.value=props.editFaqEnable
  if (props.createFaqEnable === 'create') {
    question.value = ''
    answer.value = ''
  }
  if (updateValue.value === 'edit') {
    question.value = props.editFaqId[0].question
    answer.value = props.editFaqId[0].answer
  }
})
</script>
