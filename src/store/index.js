import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notesCount: 0,
    animateCreateButton: true,
  },

  mutations: {
    SET_NOTES_COUNT(state, v) {
      state.notesCount = v
    },

    TOGGLE_CREATE_BUTTON_ANIMATION(state, v) {
      state.animateCreateButton = v
    }
  },
})
