<template>
  <div class="container sticky top-0 bg-white z-50">
    <div class="flex justify-between container items-center py-4 px-0">
      <div class="right flex flex-row">
        <nuxt-link
          to="/"
          class="hover:text-teal-500 hover:no-underline text-4xl font-thin"
        >
          Plesir
        </nuxt-link>
      </div>
      <div class="left flex flex-row">
        <template v-if="!mobile">
          <nuxt-link
            to="/places"
            class="hover:text-teal-500 hover:no-underline item mx-2"
            >places</nuxt-link
          >
          <nuxt-link
            v-if="this.$auth.loggedIn"
            to="/orders"
            class="hover:text-teal-500 hover:no-underline item mx-2"
            >orders</nuxt-link
          >
          <nuxt-link
            to="/login"
            class="item mx-2 hover:text-teal-500 hover:no-underline"
            v-if="!this.$auth.loggedIn"
            >login</nuxt-link
          >
          <div
            class="item mx-2 hover:text-teal-500 hover:no-underline cursor-pointer"
            v-else
            @click="logout"
          >
            logout
          </div>
        </template>
        <template v-else>
          <b-icon
            @click="isOpen = !isOpen"
            class="text-3xl"
            icon="list"
          ></b-icon>
        </template>
      </div>
    </div>
    <div class="relative" @click="isOpen = !isOpen">
      <div
        class="fixed h-full w-full bg-white/95 flex flex-col justify-start overflow-hidden items-center"
        v-if="isOpen"
      >
        <nuxt-link to="/places" class="m-2 text-lg">places</nuxt-link>
        <nuxt-link to="/orders" class="m-2 text-lg">orders</nuxt-link>
        <nuxt-link to="/login" class="m-2 text-lg" v-if="!this.$auth.loggedIn"
          >login</nuxt-link
        >
        <div class="m-2 text-lg" @click="logout" v-else>logout</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: window.innerWidth <= 750 ? true : false,
      isOpen: false,
      windowWidth: null,
    }
  },

  watch: {
    // whenever question changes, this function will run
    isOpen(newOpen, oldOpen) {
      if (newOpen) {
        document.getElementsByTagName('BODY')[0].style.overflow = 'hidden'
      } else {
        document.getElementsByTagName('BODY')[0].style.overflow = 'auto'
      }
    },
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },

  mounted() {
    if (window !== undefined) {
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 750) {
          this.mobile = true
        } else {
          this.mobile = false
          this.isOpen = false
        }
      })
    }

    // if (this.isOpen) {
    //   document.getElementsByTagName('BODY')[0].style.overflow = 'hidden'
    // }
  },
}
</script>
