<template>
  <div class="flex justify-center items-center">
    <div class="loader bg-purple-100 p-3 rounded-full flex space-x-3">
      <div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loader"
};
</script>
