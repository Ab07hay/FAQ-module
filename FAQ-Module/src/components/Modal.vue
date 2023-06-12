<template>
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box">
      <Form @submit.prevent>
        <div class="form-control w-full max-w-xs">
          <label class="label">
            <span class="label-text text-black">Write your quetion</span>
            <!-- <span class="label-text-alt">Top Right label</span> -->
          </label>
          <!-- <input
          type="text"
          placeholder="Type here"
          v-model.trim="question"
          class="input input-bordered w-full max-w-xs"
        /> -->
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
            <!-- <span class="label-text-alt">Top Right label</span> -->
          </label>
          <!-- <textarea
          type="text"
          placeholder="Type here"
          v-model.trim="answer"
          class="input input-bordered w-full max-w-xs"
        /> -->
          <Field
            name="answer"
            placeholder="Type here"
            v-model.trim="answer"
            class="input input-bordered w-full max-w-xs"
            type="textarea"
            :rules="validateAnswer"
          />

          <label class="label">
            <span class="label-text-alt"
              ><ErrorMessage name="answer" class="text-xs text-red-600"
            /></span>
            <!-- <span class="label-text-alt">Bottom Right label</span> -->
          </label>
        </div>
        <div class="modal-action">
          <label for="my-modal" class="btn bg-slate-700" @click="cancel">Cancel</label>
         <button type="submit" class="label btn btn-success text-white w-20" @click="onSubmit">&nbsp &nbspSave</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
const store = useFaqStore()
const { editFaqId, editFaqEnable, createFaqEnable } = storeToRefs(store)
const modalStore = useModalStore()
const { answer, items, question, updateValue } = storeToRefs(modalStore)
const { onSubmit ,validateAnswer,validateQuestion } = modalStore

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
  [question.value, updateValue.value, answer.value] = ['', '', '']
  emits('cancel')
}

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
