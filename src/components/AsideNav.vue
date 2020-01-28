<template>
  <div class="flex flex-col w-64 h-full pt-2 pr-2 bg-white border-r border-gray-300">
    <!-- logo -->
    <div class="flex items-center p-4">
      <img
        src="@/assets/logo.png"
        alt="logo"
        class="w-6 h-6"/>
      <h1 class="ml-2 font-medium tracking-wide uppercase ">Vue notes app</h1>
    </div>

    <!-- links -->
    <div class="mt-2">
      <router-link
        to="notes"
        class="flex items-center px-4 py-2 tracking-wide text-gray-700 rounded-r-full outline-none cursor-pointer select-none"
        :class="{'bg-green-200 text-gray-900 shadow': isActiveLink('notes')}"
        @click="activeLink = 'notes'"
      >
        <f-icon icon="file-alt"/>
        <span class="ml-4">Notes</span>
        <span
          class="px-2 py-1 ml-auto text-xs font-medium leading-none bg-gray-300 rounded-full"
          :class="{'bg-green-100': isActiveLink('notes')}"
        >
          {{ notesCount }}
        </span>
      </router-link>

      <router-link
        to="reminders"
        class="flex items-center px-4 py-2 mt-2 tracking-wide text-gray-700 rounded-r-full outline-none cursor-pointer select-none"
        :class="{'bg-green-200 text-gray-900 shadow': isActiveLink('reminders')}"
        @click="activeLink = 'reminders'"
      >
        <f-icon icon="bell"/>
        <span class="ml-4">Reminders</span>
         <span
          class="px-2 py-1 ml-auto text-xs font-medium leading-none bg-gray-300 rounded-full"
          :class="{'bg-green-100': isActiveLink('reminders')}"
        >
          {{ remindersCount }}
        </span>
      </router-link>
    </div>

    <!-- meta -->
    <div class="flex flex-col flex-1">
      <div
        class="py-2 pl-4 mt-auto text-gray-400 text-gray-700 cursor-pointer select-none"
        @click="openSettingsDialog"
      >
        <f-icon icon="cog"/>
        <span class="ml-4">Settings</span>
      </div>
      <a
        href="https://github.com/baitkul/vue-notes-app"
        rel="noopener noreferrer"
        target="_blank"
        class="py-2 pl-4 text-gray-700 cursor-pointer select-none"
      >
        <f-icon :icon="['fab', 'github']"/>
        <span class="ml-4">Repository</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    remindersCount: {
      type: Number,
      default: 0
    },
  },

  computed: {
    ...mapState([
      'settingsDialogVisible'
    ]),

    ...mapGetters([
      'notesCount'
    ]),
  },

  methods: {
    isActiveLink(name) {
      return this.$route.name === name
    },

    openSettingsDialog() {
      this.$store.commit('TOGGLE_SETTINGS_DIALOG', !this.settingsDialogVisible)
    }
  }
}
</script>

<style>

</style>