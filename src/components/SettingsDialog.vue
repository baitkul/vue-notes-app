<template>
  <div
    class="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black-25"
    @click.self="dismissDialog"
  >
    <div class="w-6/12 px-4 py-2 overflow-hidden bg-white rounded shadow-lg">

      <div class="flex items-center">
        <h4 class="tracking-wide text-gray-700 uppercase">Settings</h4>
        <span
          class="p-1 ml-auto text-sm leading-none text-gray-500 cursor-pointer hover:text-gray-700"
          @click="dismissDialog"
        >
          <f-icon icon="times" />
        </span>
      </div>

      <div class="mt-6">
        <div class="flex items-center justify-between">
          <h5 slot="label" class="text-xs font-medium text-gray-700 uppercase">Localstorage sync</h5>
          <el-switch v-model="localStorageSync"/>
        </div>

        <div class="flex items-center justify-between mt-4">
          <h5 slot="label" class="text-xs font-medium text-gray-700 uppercase">App language</h5>
          <div class="flex justify-end">
            <button
              class="flex items-center px-2 border rounded outline-none"
              :class="{'border-green-500': locale === 'en'}"
              @click="locale = 'en'"
            >
              <img src="https://www.countryflags.io/us/shiny/16.png"/>
              <span class="ml-2 text-xs font-normal leading-loose uppercase">en</span>
            </button>
            <button
              class="flex items-center px-2 ml-2 border rounded outline-none"
              :class="{'border-green-500': locale === 'ru'}"
              @click="locale = 'ru'"
            >
              <img src="https://www.countryflags.io/ru/shiny/16.png"/>
              <span class="ml-2 text-xs font-normal leading-loose uppercase">ru</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Switch,
} from 'element-ui'

export default {
  components: {
    ElSwitch: Switch,
  },

  data() {
    return {
    }
  },

  computed: {
    localStorageSync: {
      get() {
        return this.$store.state.settings.localStorageSync
      },
      set(v) {
        console.log(v)
        this.$store.commit('TOGGLE_LOCALSTORAGE_SYNC', v)
      }
    },

    locale: {
      get() {
        return this.$store.state.settings.locale
      },
      set(v) {
        this.$store.commit('SET_LOCALE', v)
      }
    }
  },

  methods: {
    dismissDialog() {
      this.$store.commit('TOGGLE_SETTINGS_DIALOG', false)
    }
  }
}
</script>

<style>
.bg-black-25 {
  background-color: rgba(0,0,0,0.25);
}
</style>