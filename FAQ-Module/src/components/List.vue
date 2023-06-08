<template>
    <p class="text-xl float-left font-mono  hover:underline decoration-solid mt-5">Frequently Asked Quetions?</p>
    <div class="text-right mt-3">
      <button class="btn btn-primary">Create FAQ</button>
  </div>
  <div class="overflow-x-auto mt-5">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Question</th>
          <th>Answer</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="bg-base-200">
          <th>1</th>
          <td>Cy Ganderton</td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
          <td>Purple</td>

        </tr>
        <!-- row 2 -->
        <tr>
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
          <td>Purple</td>

        </tr>
        <!-- row 3 -->
        <tr>
          <th>3</th>
          <td>Brice Swyre</td>
          <td>Tax Accountant</td>
          <td>Red</td>
          <td>Purple</td>

        </tr>
      </tbody>
    </table>
  </div>
</template>
