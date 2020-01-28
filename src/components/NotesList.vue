<template>
  <div class="relative flex flex-col h-full">
    <!-- search input -->
    <div class="relative mb-8">
      <input
        v-model='searchStr'
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
      <template v-if="pinnedNotes.length">
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

    <div
      class="absolute flex items-center justify-center w-12 h-12 text-green-300 bg-white rounded-full shadow cursor-pointer hover:shadow-md hover:text-green-400"
      :class="{'glowing': animateCreateButton && !filteredNotes.length}"
      :style="{bottom: '5px', right: '5px'}"
      @click="createNewNote"
    >
      <f-icon icon="plus" class="text-xl"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NoteCard from './NoteCard'

export default {
  components: {
    NoteCard,
  },

  props: {
    notes: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      searchStr: '',
    }
  },

  computed: {
    ...mapState(['animateCreateButton']),

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
  },

  mounted() {
    window.setTimeout(() => {
      this.$store.commit('TOGGLE_CREATE_BUTTON_ANIMATION', false)
    }, 1000 * 2)
  },

  methods: {
    createNewNote() {
      this.$emit('create')
    },

    deleteNote(noteId) {
      this.$emit('delete', noteId)
    },

    selectNote(note) {
      this.$emit('select', note)
    },
  }
}
</script>

<style>
.glowing {
  animation-name: glow;
  animation-duration: 0.4s;
  animation-iteration-count: 4;
  animation-timing-function: ease-int-out;
  animation-direction: alternate;
}

@keyframes glow {
  from: {
    box-shadow: 0px 0px 1px 15px rgba(104, 211, 145, 0.6);
  }

  to {
    box-shadow: 0px 0px 1px 15px rgba(104, 211, 145, 0.6);
  }
}
</style>