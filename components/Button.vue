<template>
  <div>
    <button
      class="bg-green-theme rounded w-full p-2 text-white hover:bg-[#00B06D]"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>
