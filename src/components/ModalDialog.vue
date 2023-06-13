<template>
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <Form @submit.prevent>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-black">Write your question</span>
          </label>
          <Field
            name="question"
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
            v-model.trim="question"
            :rules="validateQuestion"
          />
          <label class="label">
            <span class="label-text-alt"
              ><ErrorMessage name="question" class="text-xs text-red-600"
            /></span>
          </label>

          <label class="label">
            <span class="label-text text-black">Write your answer</span>
          </label>

          <Field name="answer" :rules="validateAnswer">
            <textarea
              id="answer"
              name="answer"
              v-model.trim="answer"
              class="textarea textarea-bordered w-full max-w-xs"
              :rows="5"
              :cols="40"
              placeholder="Type here"
            ></textarea>
          </Field>

          <label class="label">
            <span class="label-text-alt"
              ><ErrorMessage name="answer" class="text-xs text-red-600"
            /></span>
          </label>
        </div>
        <div class="modal-action">
          <label for="my-modal" class="btn bg-slate-700" @click="cancel">Cancel</label>
          <button type="submit" class="label btn btn-success text-white w-20" @click="onSubmit">
            &nbsp; &nbsp;Save
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup lang="ts">
//below import is for validation purpose
import { Form, Field, ErrorMessage } from 'vee-validate'

//here modal store is used
const modalStore = useModalStore()
const { answer, question, updateValue } = storeToRefs(modalStore)
const { onSubmit, validateAnswer, validateQuestion } = modalStore

const props = defineProps<{
  editFaqId: any
  createFaqEnable: string
  editFaqEnable: string
}>()

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'createFaq'): void
}>()

function cancel() {
  ;[question.value, updateValue.value, answer.value] = ['', '', '']
  emits('cancel')
}

//onmounted is lifeCycle Hook
onMounted(() => {
  updateValue.value = props.editFaqEnable
  if (props.editFaqEnable === 'edit') {
    question.value = props.editFaqId[0].question
    answer.value = props.editFaqId[0].answer
  } else if (props.createFaqEnable === 'create') {
    question.value = ''
    answer.value = ''
  }
})
</script>
