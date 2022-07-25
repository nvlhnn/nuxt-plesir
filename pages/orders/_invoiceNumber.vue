<template>
  <div
    class="container mt-5 md:mt-20"
    v-if="!$fetchState.pending && $fetchState.Error == null"
  >
    <div class="title text-xl">
      Order Number &nbsp;:&emsp;<span class="text-green-theme font-bold">{{
        order.invoice_number
      }}</span>
    </div>
    <div class="justify-center items-start mt-10 flex flex-col md:flex-row">
      <img
        :src="order.place.images[0]"
        class="basis-1/2 object-cover w-full max-h-[256px] md:max-w-[50%] md:h-[356px] rounded-lg shadow"
        alt=""
      />
      <div class="basis-1/2 md:ml-10 mt-10 md:mt-0 md:text-left text-center">
        <div class="p-5 rounded shadow-xl bg-gray-100">
          <table class="w-full">
            <tbody>
              <tr class="border-b-2">
                <td class="text-lg text-placeholder pr-10">destination</td>
                <td
                  class="text-lg md:text-2xl capitalize font-semibold tracking-wide"
                >
                  {{ order.place.name }}
                </td>
              </tr>
              <tr class="border-b-2 pb-2">
                <td class="text-lg text-placeholder pr-10 pt-3 align-end">
                  date
                </td>
                <td
                  class="text-lg capitalize font-semibold pt-3 tracking-wide align-end"
                >
                  {{ order.date | moment('Do MMMM YYYY') }}
                </td>
              </tr>
              <tr class="border-b-2">
                <td class="text-lg text-placeholder pr-10 pt-3 align-end">
                  quantity
                </td>
                <td
                  class="text-lg capitalize font-semibold pt-3 tracking-wide align-end"
                >
                  {{ order.quantity }}
                </td>
              </tr>
              <tr class="border-b-2">
                <td class="text-lg text-placeholder pr-10 pt-3 align-end">
                  price
                </td>
                <td
                  class="text-lg capitalize font-semibold pt-3 tracking-wide align-end"
                >
                  Rp. {{ order.price.toLocaleString('id-ID') }}
                </td>
              </tr>
              <tr class="border-b-2">
                <td class="text-lg text-placeholder pr-10 pt-3 align-end">
                  admin fee
                </td>
                <td
                  class="text-lg capitalize font-semibold pt-3 tracking-wide align-end"
                >
                  Rp. {{ order.admin_fee.toLocaleString('id-ID') }}
                </td>
              </tr>
              <tr class="border-b-2">
                <td class="text-lg text-placeholder pr-10 pt-3 align-end">
                  total order
                </td>
                <td
                  class="text-lg capitalize font-semibold pt-3 tracking-wide align-end"
                >
                  Rp. {{ order.total_order.toLocaleString('id-ID') }}
                </td>
              </tr>
              <tr class="border-b-2">
                <td class="text-lg text-placeholder pr-10 pt-3 align-end">
                  status
                </td>
                <td
                  class="text-lg capitalize font-semibold pt-3 tracking-wide align-end"
                >
                  {{ order.status }}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="mt-5 text-white font-semibold bg-green-theme w-full py-2 text-center"
            v-if="order.status == 'PENDING'"
          >
            <a :href="order.payment_url" class="text-center w-full">
              Complete Payment
            </a>
          </div>
        </div>

        <!-- <div class="mb-2 text-4xl capitalize tracking-wide font-semibold">
          borobudur
        </div>
        <hr />
        <div class="flex justify-between w-full items-center">
          <div class="capitalize italic text-sm text-placeholder my-2">
            Magelang
          </div>
          <div
            class="text-bold text-sm tracking-wider text-green-theme font-semibold"
          >
            Rp. <span class="text-lg"> 15.000 </span>
          </div>
        </div>

        <div class="desc mt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
          facere saepe magni consequatur illo corporis, quas harum
          necessitatibus hic? Deserunt autem ullam minima nesciunt magni
          blanditiis facere
        </div>
        <div
          class="mt-4 max-w-sm gap-x-16 gap-y-2 grid place-items-center grid-cols-2"
        >
          <div class="flex w-full flex-row justify-between">
            <div class="font-semibold text-green-theme">senin</div>
            <div class="font-semibold">14.00 - 12.00</div>
          </div>
          <div class="flex w-full flex-row justify-between">
            <div class="font-semibold text-green-theme">senin</div>
            <div class="font-semibold">14.00 - 12.00</div>
          </div>
          <div class="flex w-full flex-row justify-between">
            <div class="font-semibold text-green-theme">senin</div>
            <div class="font-semibold">14.00 - 12.00</div>
          </div>
          <div class="flex w-full flex-row justify-between">
            <div class="font-semibold text-green-theme">senin</div>
            <div class="font-semibold">14.00 - 12.00</div>
          </div>
          <div class="flex w-full flex-row justify-between">
            <div class="font-semibold text-green-theme">senin</div>
            <div class="font-semibold">14.00 - 12.00</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
    }
  },

  async fetch() {
    // try {
    const res = await this.$axios.$get(
      `/orders/${this.$route.params.invoiceNumber}`
    )
    this.order = res.data
    // } catch (error) {
    //   console.log(error.response)
    //   this.$nuxt.error({ statusCode: error.response.status })
    // }
  },
}
</script>

<style></style>
