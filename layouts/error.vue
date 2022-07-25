<template>
  <div class="container h-[500px]">
    <div class="flex justify-center items-center h-full">
      <div v-if="error.statusCode === 404">Page not found</div>
      <div v-else>something was wrong :(</div>
    </div>
    <!-- <NuxtLink to="/">Home page</NuxtLink> -->
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error', // you can set a custom layout for the error page
}
</script>
