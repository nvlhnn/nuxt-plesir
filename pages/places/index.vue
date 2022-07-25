<template>
  <div>
    <div class="container mt-5 md:mt-20">
      <div class="title text-3xl tracking-wider">
        <span class="text-green-theme font-bold">Places</span> List
      </div>
      <div class="w-full flex flex-row mt-10 items-center">
        <div class="w-[10%] px-3 py-2 rounded-l bg-slate-100 h-full">
          <b-icon class="text-xl py-auto" icon="search"></b-icon>
        </div>
        <input
          type="text"
          class="grow outline-none bg-slate-100 px-5 py-2 shadow-inner"
          placeholder="search..."
          name="search"
          @keyup.enter="setQuery($event)"
          id="search"
          :disabled="$fetchState.pending"
          v-model="filter.search"
        />
        <select
          class="w-[25%] bg-green-theme py-2 tracking-wide rounded-r outline-none font-semibold text-white px-2"
          @change="setQuery($event)"
          name="sort"
          v-model="filter.sort"
          :disabled="$fetchState.pending"
        >
          <option value="" selected class="bg-white text-black">sort</option>
          <option value="latest" class="bg-white text-black">latest</option>
          <option value="oldest" class="bg-white text-black">oldest</option>
          <option value="cheapest" class="bg-white text-black">cheapest</option>
          <option value="expensive" class="bg-white text-black">
            expensive
          </option>
        </select>
      </div>
      <div
        class="mt-6 flex flex-row justify-start items-center space-x-2 w-full h-full py-2 overflow-y-scroll"
      >
        <DayFilter
          v-for="index in 7"
          :key="index"
          :day="index"
          :checked="
            filter.days ? filter.days.includes(index.toString()) : false
          "
          :disabled="$fetchState.pending"
          @day-selected="setFilterDay"
        />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        <p v-if="$fetchState.pending">Fetching places...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <PlaceCard
          v-else
          v-for="place in places"
          :key="place.id"
          :place="place"
        />
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {},
      search: '',
      places: [],
      page: 1,
      scrolledToBottom: false,
      isMaxPlace: false,
      isLoading: false,
    }
  },
  watch: {
    '$route.query': '$fetch',
    page: '$fetch',
  },

  created: function () {
    this.scroll()
  },

  mounted() {
    const query = this.$route.query
    for (const key in query) {
      if (key == 'days' && query[key] != undefined) {
        this.filter[key] = query[key].split(',')
      } else {
        this.filter[key] = query[key]
      }
    }

    if (!this.filter.sort) {
      this.filter.sort = ''
    }

    // if (this.filter.days) {
    console.log(this.filter.days)
    // }
  },

  async fetch() {
    this.isLoading = true
    let query = new URLSearchParams(this.$route.query).toString()
    query = query + '&page=' + this.page
    const res = await this.$axios.$get(`/places/?${query}`)

    if (res.data) {
      if (this.page === 1) {
        this.places = res.data
      } else {
        this.places = [...this.places, ...res.data]
      }
    } else {
      this.isMaxPlace = true
    }
    this.isLoading = false
  },

  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight +
            1 >=
          document.documentElement.offsetHeight

        if (bottomOfWindow && !this.isMaxPlace && this.isLoading == false) {
          this.page++
        }
      }
    },
    setQuery(event) {
      this.page = 1
      switch (event.target.name) {
        case 'sort':
          this.filter.sort = event.target.value
          break
        case 'search':
          this.filter.search = event.target.value
          break
        default:
          break
      }
      this.$router.push({ path: '/places', query: this.filter })
    },
    setFilterDay(days) {
      this.page = 1
      this.filter.days = days.join(',')
      if (days.length < 1) delete this.filter.days
      this.$router.push({ path: '/places', query: this.filter })
    },
  },
}
</script>

<style></style>
