<template>
  <nuxt-link
    :to="'/places/' + place.slug"
    class="flex flex-col rounded justify-center items-center"
  >
    <div class="image">
      <img
        class="object-cover h-[215px] w-[325px] rounded-lg"
        :src="img_url"
        alt=""
      />
    </div>
    <div
      class="caption py-3 mx-auto tracking-wider text-lg font-bold font-sans capitalize"
    >
      {{ place.name }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['img_url', 'place'],
}
</script>
