<template>
  <div class="container mt-5">
    <div class="mt-20 title text-3xl tracking-wider">
      Order <span class="text-green-theme font-bold">History</span>
    </div>

    <div class="mt-10 w-full overflow-y-auto">
      <!-- <table class="table-auto">
        <tbody>
          <tr>
            <td class="">
              <div class="flex flex-row">
                <img src="borobudur.jpg" class="object-cover w-20" alt="" />
                <div class="flex flex-col">
                  <div class="">Borobudur</div>
                  <div class="">magelang</div>
                </div>
              </div>
            </td>
            <td>asasaas</td>
            <td>asasaas</td>
            <td>asasaas</td>
            <td>asasaas</td>
          </tr>
        </tbody>
      </table> -->
      <div class="table table-fixed w-[674px] md:w-full">
        <div class="table-header-group">
          <div class="table-row text-center">
            <div class="table-cell py-8">Destination</div>
            <div class="table-cell py-8 w-[10%]">Date</div>
            <div class="table-cell py-8 w-[10%]">Quantity</div>
            <div class="table-cell py-8 w-[10%]">Total Price</div>
            <div class="table-cell py-8 w-[30%]">Status</div>
          </div>
        </div>
        <div class="table-row-group mt-5">
          <nuxt-link
            :to="'/orders/' + order.invoice_number"
            v-for="order in orders"
            v-bind:key="order.invoice_number"
            class="table-row text-center"
          >
            <div class="table-cell py-4 w-full">
              <div class="flex flex-row">
                <img
                  :src="order.place.images[0]"
                  class="object-cover w-20 rounded max-h-[60px]"
                  alt=""
                />
                <div class="flex flex-col ml-4 justify-start items-start">
                  <div class="font-semibold tracking-wide">
                    {{ order.place.name }}
                  </div>
                  <div class="italic text-sm font-normal text-placeholder">
                    magelang
                  </div>
                </div>
              </div>
            </div>
            <div class="table-cell py-4 align-middle text-sm">
              {{ order.date | moment('Do, MMM YYYY') }}
            </div>
            <div class="table-cell py-4 align-middle">{{ order.quantity }}</div>
            <div class="table-cell py-4 align-middle text-sm">
              Rp.
              <span class="text-base font-semibold">
                {{ order.total_order.toLocaleString('id-ID') }}</span
              >
            </div>
            <div class="table-cell py-4 align-middle">
              <div
                class="mx-auto border-2 w-fit rounded-full align-middle py-1 px-5"
                :class="{
                  'text-green-500 border-green-500': order.status == 'PAID',
                  'text-blue-500 border-blue-500': order.status == 'PENDING',
                  'text-red-500 border-red-500': order.status == 'EXPIRED',
                }"
              >
                {{ order.status }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      orders: null,
    }
  },

  async fetch() {
    const res = await this.$axios.$get(`/orders/user`)
    this.orders = res.data

    console.log(this.orders)
  },
}
</script>

<style></style>
