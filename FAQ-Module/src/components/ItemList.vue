<template>
  <p class="text-xl float-left font-mono hover:underline decoration-solid mt-5">
    Frequently Asked Questions?
  </p>
  <div class="text-right mt-3">
    <label for="my-modal" class="btn btn-primary" @click="createFaq()">Create FAQ</label>

    <div :key="Math.random()">
      <ModalDialog
        :editFaqId="editFaqId"
        :createFaqEnable="createFaqEnable"
        :editFaqEnable="editFaqEnable"
        @cancel="cancel"
      />
    </div>
  </div>
  <div class="text-right mt-3">
    <input
      type="text"
      placeholder="Search with Question, Answer "
      v-model="searchFieldValue"
      class="input input-bordered w-1/3"
    />
  </div>

  <div class="overflow-x-auto mt-5">
    <table class="table table-zebra w-full">
      <thead class="text-center">
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
      <tbody class="text-center" v-if="filteredItems && filteredItems.length > 0">
        <tr class="bg-base-200" v-for="(item, index) in filteredItems" :key="index">
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
          <td>{{ item.created }}</td>
          <td>{{ item.updated ? item.updated : '---' }}</td>
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
      <tbody v-else>
        <tr>
          <td align="center" colspan="7"><i>No frequently asked questions found</i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">

//all the components and stores are auto imported so no need to import it manually we mentioned code in vite.config.ts file for the autoImport

const store = useFaqStore()  //here using faq store 

const { createFaqEnable, editFaqEnable, editFaqId, searchFieldValue } = storeToRefs(store) // because of destructuring all states we need to use storeToRefs to mainatain reactivity
const { cancel, deleteFaq, editFaq, createFaq } = store // function not required storeToRefs
const filteredItems = computed(() => store.filteredItemss) 
</script>
