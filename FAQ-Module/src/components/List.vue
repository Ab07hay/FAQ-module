<template>
  <p class="text-xl float-left font-mono hover:underline decoration-solid mt-5">
    Frequently Asked Quetions?
  </p>
  <div class="text-right mt-3">
    <label for="my-modal" class="btn btn-primary" @click="createFaq()">Create FAQ</label>
    <div :key="Math.random()">
      <modalApp
        :editFaqId="editFaqId"
        :createFaqEnable="createFaqEnable"
        :editFaqEnable="editFaqEnable"
      >
      </modalApp>
    </div>
  </div>
  <div class="form-control mt-3">
    <div class="input-group">
      <input type="text" placeholder="Search…" class="input input-bordered" />
      <button class="btn btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="overflow-x-auto mt-5">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Question</th>
          <th>Answer</th>
          <th>Created Date</th>
          <th>Updated Date</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="bg-base-200" v-for="(item, index) in faqData" :key="item">
          <th>{{ index + 1 }}</th>
          <td>
            <span
              class="tooltip w-80 break-words hover:whitespace-normal overflow-hidden transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
              :data-tip="item.question"
              >{{ item.question }}</span
            >
          </td>
          <td>
            <span
              class="tooltip w-56 break-words hover:whitespace-normal overflow-hidden transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
              :data-tip="item.answer"
              >{{ item.answer }}</span
            >
          </td>
          <td><span></span>{{ item.created }}</td>
          <td><span></span>{{ item.created }}</td>
          <!-- <td><a href="" @click="editFaq(index)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg></a>
          </td> -->
          <td>
            <label for="my-modal" class="btn btn-outline" @click="editFaq(index)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </label>
          </td>
          <td>
            <button @click="deleteFaq(index)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import modalApp from './Modal.vue'
const faqData = ref()
const editFaqId = ref<{}>()
const createFaqEnable = ref('')
const editFaqEnable = ref('')

function createFaq() {
  createFaqEnable.value = 'create'
}
onMounted(() => {
  const listItems: any = localStorage.getItem('faqItem') ? localStorage.getItem('faqItem') : ''
  faqData.value = JSON.parse(listItems)
})
function deleteFaq(index: number) {
  faqData.value.splice(index, 1)
  localStorage.setItem('faqItem', JSON.stringify(faqData.value))
}
function editFaq(index: number) {
  editFaqId.value = faqData.value.filter((data: any, i: any) => {
    return i === index ? data : ''
  })
  editFaqEnable.value = 'edit'
}
</script>
