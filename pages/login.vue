<template>
  <div class="container">
    <div class="flex flex-col mt-40 justify-center items-center">
      <div class="italic text-placeholder">login</div>

      <input
        v-model="login.email"
        class="mt-5 rounded shadow-inner bg-slate-50 border-none outline-none w-60 py-2 text-center"
        type="text"
        placeholder="email"
      />
      <input
        class="rounded shadow-inner bg-slate-50 border-none outline-none w-60 py-2 text-center mt-3 placeholder:hidden"
        @keyup.enter="userLogin"
        type="password"
        v-model="login.password"
        placeholder="password"
      />
      <button
        class="mt-3 active:ring-2 active:ring-inset active:ring-green-300 outline-orange-500 bg-green-theme rounded w-60 p-2 text-white hover:bg-[#00B06D]"
        @click="userLogin"
      >
        sign in
      </button>
      <div
        class="mt-2 text-red-500"
        :disabled="login.loading"
        v-if="login.error"
      >
        invalid email or password
      </div>
      <nuxt-link class="italic mt-5 text-blue-500" to="/register"
        >sign up</nuxt-link
      >
      <!-- <h1>asasjhajsas</h1>
      <h1>asasjhajsas</h1> -->
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      login: {
        email: '',
        password: '',
        loading: false,
        error: false,
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        this.login.loading = true
        await this.$auth
          .loginWith('local', { data: this.login })
          .then((res) => {
            this.$auth.setUser(res.data.data)
          })
          .then(() => {
            this.login.loading = false
          })

        if (localStorage.hasOwnProperty('order')) {
          const order = JSON.parse(localStorage.getItem('order'))
          this.$router.push({ path: `/places/${order.productSlug}` })
        }

        console.log(localStorage.hasOwnProperty('order'))
        console.log(JSON.parse(localStorage.getItem('order')))
        // .then(() => {
        //   this.$router.push({ path: '/' })
        // })
      } catch (err) {
        this.login.error = true
        this.login.loading = false
      }
    },
  },
}
</script>

<style></style>
