<template>
  <div class="container mt-5 md:mt-20 w-full">
    <div class="justify-center items-start flex flex-col md:flex-row">
      <img
        :src="place ? place.images[0] : ''"
        class="basis-1/2 object-cover w-full max-h-[256px] md:w-[50%] md:max-h-[356px] rounded-lg shadow"
        alt=""
      />
      <div
        class="basis-1/2 md:ml-10 mt-10 md:mt-0 md:text-left text-center w-full"
      >
        <div
          class="mb-2 md:text-4xl capitalize tracking-wide text-2xl font-semibold"
        >
          {{ place.name }}
        </div>
        <hr />
        <div class="flex justify-between w-full items-center">
          <div class="capitalize italic text-sm text-placeholder my-2">
            {{ place.region }}
          </div>
          <div
            class="text-bold text-sm tracking-wider text-green-theme font-semibold"
          >
            Rp.
            <span class="text-lg">
              {{ (+place.price).toLocaleString('id-ID') }}
            </span>
          </div>
        </div>

        <div class="desc mt-3">
          <p class="indent-8 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
            facere saepe magni consequatur illo corporis, quas harum
            necessitatibus hic? Deserunt autem ullam minima nesciunt magni
            blanditiis facere
          </p>
        </div>
        <div
          class="mt-4 max-w-sm text-sm gap-x-16 gap-y-2 grid place-items-center grid-cols-2"
        >
          <div
            class="flex w-full flex-row justify-between"
            v-for="work in place.work_days"
            :key="work.day"
          >
            <div class="font-semibold text-green-theme">{{ work.day }}</div>
            <div class="font-semibold">
              {{
                new Date('1970-01-01 ' + work.hour.open + '.207866+07')
                  | moment('h:mm')
              }}
              -
              {{
                new Date('1970-01-01 ' + work.hour.close + '.207866+07')
                  | moment('h:mm')
              }}
            </div>
          </div>
        </div>

        <form action="" @submit="submitHandler($event)">
          <div class="mt-10 flex justify-between w-full items-center">
            <div
              class="flex justify-center flex-col md:flex-row md:justify-start w-full"
            >
              <date-picker
                wrapper-class="wrap w-full"
                input-class="date-picker
            h-full rounded--r-none rounded-l outline-none shadow-inner
            bg-slate-50 px-3 w-full py-2 my-1 text-center md:text-left md:my-0"
                placeholder="select date"
                format="D, dd MMMM yyyy"
                :language="id"
                v-model="order.date"
                required
                :disabled-dates="disabledDates"
              />
              <input
                class="shadow-inner bg-slate-50 outline-none px-3 py-2 text-center md:text-left my-2 md:my-0"
                type="number"
                min="1"
                placeholder="input ticket's quantity"
                autofocus
                v-model.number="order.quantity"
                required
              />
              <button
                class="disabled:bg-green-300 disabled:ring-0 rounded-r active:ring-1 ring-inset ring-white bg-green-theme hover:bg-[#00B06D] text-white px-3 py-2"
                :disabled="!(order.date && order.quantity)"
                type="submit"
              >
                order
              </button>
              <div class="hidden" id="toast-icon">
                <b-icon class="mr-2" icon="bag-check"></b-icon>
              </div>
            </div>
          </div>
        </form>
        <!-- mobile button -->

        <div
          v-if="order.date && order.quantity"
          class="flex justify-between items-center mt-5 rounded text-white p-3 bg-gray-400"
        >
          <div>total order</div>
          <div class="text-bold text-sm tracking-wider font-semibold">
            Rp.
            <span class="text-lg">
              {{ (order.quantity * place.price).toLocaleString('id-ID') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { en, id } from 'vuejs-datepicker/dist/locale'

export default {
  data() {
    return {
      id: id,
      disabledDates: {
        to: this.getYesterday(),
        days: [],
      },
      order: {
        date: null,
        quantity: null,
        place_id: null,
        productSlug: this.$route.params.slug,
      },
      place: '',
      daysId: [],
    }
  },
  async fetch() {
    const res = await this.$axios.$get(`/places/${this.$route.params.slug}`)
    this.place = res.data
    this.order.place_id = this.place.id
    this.daysId = this.place.work_days.map((a) => {
      switch (a.day) {
        case 'senin':
          return 1
          break
        case 'selasa':
          return 2
          break
        case 'rabu':
          return 3
          break
        case 'kamis':
          return 4
          break
        case 'jumat':
          return 5
          break
        case 'sabtu':
          return 6
          break
        case 'minggu':
          return 0
          break
        default:
          break
      }
    })

    this.disabledDates.days = [0, 1, 2, 3, 4, 5, 6].filter(
      (a) => !this.daysId.includes(a)
    )
  },
  mounted() {
    let date_wrapper =
      document.getElementsByClassName('date-picker')[0].parentElement.classList
    date_wrapper.add('h-full')
    date_wrapper.add('rounded-r-none')

    if (localStorage.hasOwnProperty('order')) {
      const order = JSON.parse(localStorage.getItem('order'))
      this.order.date = order.date
      this.order.quantity = order.quantity

      localStorage.removeItem('order')
    }
  },

  computed: {},

  methods: {
    async submitHandler(event) {
      try {
        event.preventDefault()
        if (!this.$auth.loggedIn) {
          localStorage.setItem('order', JSON.stringify(this.order))
          this.$router.push({ path: '/login' })
        } else {
          const res = await this.$axios.$post(`/orders/`, this.order)

          this.$toasted.show('Order Success', {
            theme: 'toasted-primary',
            position: 'top-right',
            duration: 2000,
            type: 'success',
            icon: (el) => {
              const icon = document.getElementById('toast-icon').innerHTML
              el.innerHTML = icon
              return el
            },
          })
        }
      } catch (error) {
        console.log(error.response)
        this.$nuxt.error({
          statusCode: error.response.status,
          message: 'Something went wrong :(',
        })

        this.$toasted.show('Order failed. Please try again later', {
          theme: 'toasted-primary',
          position: 'top-right',
          duration: 2000,
          type: 'error',
        })
      }
    },
    getYesterday() {
      let date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    },
  },
}
</script>

<style></style>
