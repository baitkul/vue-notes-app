<template>
  <div class="flex flex-col overflow-hidden bg-white rounded shadow-xl" :style="styles">
    <div class="flex items-center w-full h-8 px-2 py-1 bg-gray-400 border-b border-gray-500">
      <span class="text-xs">
        <i class="text-red-500 fa fa-circle"></i>
        <i class="mx-1 text-yellow-500 fa fa-circle"></i>
        <i class="text-green-500 fa fa-circle"></i>
      </span>
      <span class="flex-1 text-sm text-center">
        notes-app
      </span>
      <span class="flex text-xs">
        <span
          class="flex items-center px-2 py-1 rounded cursor-pointer"
          :class="{'bg-gray-100 shadow-xl': $i18n.locale === 'ru'}"
          @click="setLocale('ru')"
        >
          <img src="https://www.countryflags.io/ru/shiny/16.png" class="h-4 mr-1" />
          рус
        </span>

        <span
          class="flex items-center px-2 py-1 rounded cursor-pointer"
          :class="{'bg-gray-100 shadow-xl': $i18n.locale === 'en'}"
          @click="setLocale('en')"
        >
          <img src="https://www.countryflags.io/us/shiny/16.png" class="h-4 mr-1" />
          eng
        </span>
      </span>
    </div>

    <div class="flex-1 w-full overflow-hidden bg-gray-200 ">
      <slot></slot>
    </div>
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