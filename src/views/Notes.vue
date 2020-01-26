<template>
  <div class="h-full">
    <NotesList
      v-if="activeComponent === 'NotesList'"
      :notes="notes"
      @select="selectNote"
      @create="createNewNote"
      @delete="deleteNote"
    />

    <NotesEditor
      v-else-if="activeComponent === 'NotesEditor'"
      :note.sync="selectedNote"
      @back="dismissEditor"
    />
  </div>
</template>

<script>
import shortid from 'shortid'
import NotesEditor from '@/components/NotesEditor'
import NotesList from '@/components/NotesList'

export default {
  components: {
    NotesEditor,
    NotesList,
  },

  data() {
    return {
      notes: [],
      selectedNote: null,
      activeComponent: 'NotesList',
    }
  },

  created() {
    const cachedNotes = this.$forage.get('notes')

    if (Array.isArray(cachedNotes)) {
      this.notes = cachedNotes
      this.updateNotesCount()
    }
  },

  mounted() {
    window.addEventListener('beforeunload', this.cacheData)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', this.cacheData)
    })
  },

  methods: {
    setComponent(name) {
      this.activeComponent = name
    },

    dismissEditor() {
      this.activeComponent = 'NotesList'
      this.selectedNote = null
    },

    selectNote(payload) {
      this.selectedNote = payload
      this.activeComponent = 'NotesEditor'
    },

    createNewNote() {
      const note = {
        id: shortid.generate(),
        title: '',
        body: '',
        createdAt: new Date(),
      }

      this.notes.push(note)
      this.selectNote(note)
      this.updateNotesCount()
    },

    deleteNote(noteId) {
      const idx = this.notes.findIndex(item => item.id === noteId)

      if (idx !== -1) {
        this.notes.splice(idx, 1)
        this.updateNotesCount()
      }
    },

    updateNotesCount() {
      this.$store.commit('SET_NOTES_COUNT', this.notes.length)
    },

    cacheData() {
      this.cacheNotes()
    },

    cacheNotes() {
      this.$forage.set('notes', this.notes)
    },
  }
}
</script>