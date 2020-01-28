<template>
  <div class="relative flex flex-col h-full">
    <!-- search input -->
    <div class="relative mb-8">
      <input
        v-model="searchStr"
        class="w-full px-4 py-2 text-sm bg-white rounded-full shadow"
        type="text"
        placeholder="Search note"
      />

      <span
        v-show="searchStr.length"
        class="absolute bottom-0 right-0 flex items-center justify-center h-full p-4 text-gray-400 cursor-pointer hover:text-gray-700"
        @click="searchStr = ''"
      >
        <f-icon icon="backspace" />
      </span>
    </div>

    <!-- notes -->
    <div v-if="notes.length" class="overflow-y-auto">
      <template v-if="listsDivided">
        <h5 class="pl-2 mb-2 text-xs font-medium leading-none text-gray-500 uppercase">pinned</h5>
        <div class="flex flex-wrap">
          <NoteCard
            v-for="note in pinnedNotes"
            :key="note.id"
            :note="note"
            @select="selectNote"
            @delete="deleteNote"
          />
        </div>

        <h5 class="pl-2 mt-6 mb-2 text-xs font-medium leading-none text-gray-500 uppercase">other</h5>
        <div class="flex flex-wrap">
          <NoteCard
            v-for="note in notPinnedNotes"
            :key="note.id"
            :note="note"
            @select="selectNote"
            @delete="deleteNote"
          />
        </div>
      </template>

      <template v-else>
        <div class="flex flex-wrap">
          <NoteCard
            v-for="note in filteredNotes"
            :key="note.id"
            :note="note"
            @select="selectNote"
            @delete="deleteNote"
          />
        </div>
      </template>
    </div>

    <div v-else class="flex items-center justify-center flex-1">
      <span class="text-2xl tracking-wide text-gray-400 uppercase">Empty list</span>
    </div>

    <FloatingButton
      title="Create note"
      icon="plus"
      :position-styles="{bottom: '5px', right: '5px'}"
      :pulsate="animateCreateButton && !filteredNotes.length"
      @click="createNewNote"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import nanoid from 'nanoid'
import NoteCard from './NoteCard'
import FloatingButton from './FloatingButton'

export default {
  components: {
    NoteCard,
    FloatingButton,
  },

  data() {
    return {
      searchStr: '',
    }
  },

  computed: {
    ...mapState(['animateCreateButton']),

    notes: {
      get() {
        return this.$store.state.notes
      },
      set(v) {
        return this.$store.commit('UPDATE_NOTES', v)
      }
    },

    filteredNotes() {
      if (!this.searchStr) {
        return this.$_.orderBy(this.notes, ['createdAt'], ['desc'])
      }

      const filtered = this.notes.filter(item => {
        return item.title.toLowerCase().includes(this.searchStr.toLowerCase()) ||
          item.body.toLowerCase().includes(this.searchStr.toLowerCase())
      })

      return this.$_.orderBy(filtered, ['createdAt'], ['desc'])
    },

    pinnedNotes() {
      return this.filteredNotes.filter(item => item.pinned)
    },

    notPinnedNotes() {
      return this.filteredNotes.filter(item => !item.pinned)
    },

    listsDivided() {
      return this.pinnedNotes.length && !this.searchStr
    }
  },

  mounted() {
    window.setTimeout(() => {
      this.$store.commit('TOGGLE_CREATE_BUTTON_ANIMATION', false)
    }, 1000 * 2)
  },

  methods: {
    createNewNote() {
      const note = {
        id: nanoid(),
        title: '',
        body: '',
        createdAt: new Date(),
        pinned: false,
      }

      this.notes.push(note)
      this.selectNote(note)
    },

    deleteNote(noteId) {
      const idx = this.notes.findIndex(item => item.id === noteId)

      if (idx !== -1) {
        this.notes.splice(idx, 1)
      }
    },

    selectNote(note) {
      this.$store.commit('SET_ACTIVE_NOTE', note)
    },
  }
}
</script>