<template>
  <div class="">
    <input
      class="hidden peer"
      type="checkbox"
      :value="day"
      :id="day"
      @change="setDay"
      :checked="checked"
      :disabled="disabled"
      name="daySelect"
    />
    <label
      class="bg-green-400 border-2 border-green-400 peer-checked:bg-green-theme peer-checked:outline outline-2 outline-offset-1 outline-green-theme hover:bg-green-theme text-white px-3 rounded-lg py-1"
      :for="day"
    >
      {{ dayName[day - 1] }}
    </label>
  </div>
</template>
<script>
export default {
  props: ['day', 'filter', 'disabled', 'checked'],
  data() {
    return {
      dayName: ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'],
      //   daySelector: [n],
    }
  },
  methods: {
    setDay() {
      const daySelected = [
        ...document.querySelectorAll('input[name=daySelect]:checked'),
      ].map((a) => a.value)

      this.$emit('day-selected', daySelected)
    },
  },
}
</script>
