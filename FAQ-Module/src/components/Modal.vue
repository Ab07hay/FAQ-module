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
          v-model.trim="answer"
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
import { onMounted, onUpdated } from 'vue'
import { useFaqStore } from '.././stores/faq'
import { storeToRefs } from 'pinia'
import { useModalStore } from '../stores/modal'



const store = useFaqStore()
const { editFaqId, editFaqEnable, createFaqEnable } = storeToRefs(store)
const modalStore = useModalStore()
const { answer, items, question, updateValue } = storeToRefs(modalStore)
const { createFaqItem } = modalStore

const props = defineProps<{
  editFaqId: any
  createFaqEnable: string
  editFaqEnable: string
}>()
const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'createFaq'): void
  
}>()
function createFaq() {
  emits('createFaq')
}
items.value.push()
function cancel() {
  question.value = ''
  updateValue.value = ''
  answer.value = ''
  emits('cancel')
}
onMounted(() => {
   updateValue.value = props.editFaqEnable
  if (editFaqEnable.value === 'edit') {
    question.value = props.editFaqId[0].question
    answer.value = props.editFaqId[0].answer
  }
  if (props.createFaqEnable === 'create') {
    question.value = ''
    answer.value = ''
  }
})
</script>
