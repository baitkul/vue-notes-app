import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notesCount: 0
  },

  mutations: {
    SET_NOTES_COUNT(state, v) {
      state.notesCount = v
    }
  },
})
