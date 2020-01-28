import Vue from 'vue'
import Vuex from 'vuex'
import { Forage } from '@/plugins/forage'

Vue.use(Vuex)

const forage = new Forage()

export default new Vuex.Store({
  state: {
    animateCreateButton: true,
    settingsDialogVisible: false,

    activeNote: undefined,
    notes: forage.get('app-notes', []),

    settings: forage.get('app-settings', {
      locale: 'en',
      localStorageSync: false,
    }),
  },

  getters: {
    notesCount: (state) => state.notes.length
  },

  mutations: {
    SET_LOCALE(state, v) {
      state.settings.locale = v
    },

    SET_ACTIVE_NOTE(state, v) {
      state.activeNote = v
    },

    UPDATE_NOTES(state, v) {
      state.notes = v
    },

    TOGGLE_LOCALSTORAGE_SYNC(state, v) {
      state.settings.localStorageSync = v
    },

    TOGGLE_CREATE_BUTTON_ANIMATION(state, v) {
      state.animateCreateButton = v
    },

    TOGGLE_SETTINGS_DIALOG(state, v) {
      state.settingsDialogVisible = v
    },
  },

  actions:{
    cacheData({ state }) {
      if (state.settings.localStorageSync) {
        forage.set('app-notes', state.notes)
        forage.set('app-settings', state.settings)
      } else {
        forage.delete('app-notes', state.notes)
        forage.delete('app-settings', state.settings)
      }
    }
  }
})
