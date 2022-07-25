<template>
  <div class="container mt-20 md:mt-32">
    <Hero />
    <div
      class="mt-20 md:mt-0 text-center tracking-wider text-2xl text-bold capitalize"
    >
      latest place
    </div>
    <div v-swiper:mySwiper="swiperOption" class="mt-5">
      <div class="swiper-wrapper">
        <template v-if="places">
          <PlaceSwiper
            class="swiper-slide"
            v-for="index in 5"
            :img_url="places.data[index].images[0]"
            :place="places.data[index]"
            :key="index"
          />
        </template>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
    </div>
  </div>
</template>

<script>
import PlaceSwiper from '../components/PlaceSwiper.vue'
export default {
  name: 'IndexPage',
  async asyncData({ $axios }) {
    const places = await $axios.$get(`/places/`)
    return { places }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 8,
          },
          // when window width is <= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          // when window width is <= 800px
          800: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      },
    }
  },
  components: { PlaceSwiper },
}
</script>
