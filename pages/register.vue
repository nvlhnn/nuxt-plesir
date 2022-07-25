<template>
  <div class="container mt-40">
    <form @submit.prevent="submitRegister">
      <div class="flex flex-col justify-center items-center">
        <div class="italic text-placeholder">register</div>
        <div class="mt-5 flex flex-row justify-between items-center">
          <input
            class="rounded shadow-inner bg-slate-50 border-none outline-none w-[11.75rem] mr-1 py-2 text-center"
            type="text"
            required
            placeholder="name"
            v-model="register.name"
          />
          <input
            class="rounded shadow-inner bg-slate-50 border-none outline-none w-[11.75rem] ml-1 py-2 text-center"
            type="text"
            required
            placeholder="email"
            v-model="register.email"
          />
        </div>
        <div class="flex flex-row mt-3 justify-between items-center">
          <input
            required
            class="rounded shadow-inner bg-slate-50 border-none outline-none w-[11.75rem] mr-1 py-2 text-center"
            type="password"
            placeholder="password"
            v-model="register.password"
          />
          <input
            class="rounded shadow-inner bg-slate-50 border-none outline-none w-[11.75rem] ml-1 py-2 text-center"
            type="password"
            required
            placeholder="confirm password"
            v-model="register.confirmPassword"
          />
        </div>
        <button
          class="mt-3 active:ring-2 active:ring-inset active:ring-green-300 outline-orange-500 bg-green-theme rounded w-96 p-2 text-white hover:bg-[#00B06D]"
        >
          sign in
        </button>
        <div
          class="mt-2 text-red-500"
          v-if="register.error.status"
          v-html="register.error.msg"
        ></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: {
          status: true,
          msg: '',
        },
      },
    }
  },

  methods: {
    async submitRegister() {
      try {
        if (this.register.password != this.register.confirmPassword) {
          this.register.error.status = true
          this.register.error.msg = 'password doesnt match'
          return
        }

        const user = await this.$axios.post('/auth/register', {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password,
        })

        this.$auth
          .setUserToken(user.data.data.token)
          .then(() => this.$router.push({ path: '/' }))
      } catch (error) {
        let errM = ''
        if (
          error.response.status == 400 &&
          error.response.data.message.length > 0
        ) {
          let errData = ''
          error.response.data.message.forEach((err) => {
            errData += `<li>${err.message} </li>`
            errM = `<ul>${errData}</ul>`
          })
        } else if (error.response.status == 409) {
          errM = 'email already in use'
        } else {
          errM = 'Server error. Please try again later.'
        }

        this.register.error.status = true
        this.register.error.msg = errM
      }
    },
  },
}
</script>

<style></style>
