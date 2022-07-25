<template>
  <nuxt-link
    :to="'/places/' + place.slug"
    class="group hover:text-inherit hover:no-underline no flex flex-col justify-center items-center"
  >
    <img
      class="shadow rounded-lg object-cover w-full h-[156px] md:h-[200px]"
      :src="place.images[0]"
      alt=""
      srcset=""
    />
    <div
      class="shadow bg-white px-[1.75rem] md:px-20 relative -top-2 md:-top-5 py-2 rounded-lg text-center"
    >
      <div
        class="group-hover:text-green-theme capitalize md:text-base tracking-wider font-semibold"
      >
        {{
          place.name.length > 15
            ? place.name.substring(0, 12) + '...'
            : place.name
        }}
      </div>
      <div class="capitalize italic text-xs md:text-xs text-placeholder">
        {{ place.region }}
      </div>
      <div
        class="mt-3 mb-2 text-bold text-xs md:text-sm tracking-wider font-semibold"
      >
        {{
          place.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })
        }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: ['place'],
  data: () => {
    return {}
  },
}
</script>
