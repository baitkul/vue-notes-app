<template>
  <div class="overflow-hidden bg-gray-200 rounded shadow-xl" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: 'en',
      styles: {
        height: '80vh',
        width: '1024px',
      }
    }
  },

  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale
    },
  }
}
</script>

<style>

</style>