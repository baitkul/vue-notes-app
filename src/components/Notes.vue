<template>
  <Window>
    <div class="flex h-full">
      <Aside
        class="w-1/4"
        :list="notes"
        :active-id="activeNoteId"
        @create="onCreateNote"
        @select="onSelectNote"
        @remove="onRemoveNote"
      />

      <Editor
        class="w-3/4"
        :entity.sync="activeNote"
      />
    </div>
  </Window>
</template>

<script>
import shortid from 'shortid'
import Window from './Window'
import Aside from './Aside'
import Editor from './Editor'

export default {
  components: {
    Window,
    Aside,
    Editor,
  },

  data() {
    return {
      notes: [],
      activeNote: undefined,
    }
  },

  computed: {
    activeNoteId() {
      if (!this.activeNote) {
        return ''
      }

      return this.activeNote.id
    }
  },

  mounted() {
    const cachedNotes = this.$forage.get('notes')
    const cachedLocale = this.$forage.get('locale')

    if (Array.isArray(cachedNotes)) {
      this.notes = cachedNotes
    }

    if (typeof cachedLocale === 'string') {
      this.$i18n.locale = cachedLocale
    }

    window.addEventListener('beforeunload', this.cacheData)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', this.cacheData)
    })
  },

  methods: {
    onCreateNote() {
      const note = {
        id: shortid.generate(),
        title: undefined,
        body: undefined,
        createdAt: new Date(),
      }

      this.activeNote = note
      this.notes.push(note)
    },

    onSelectNote(note) {
      this.activeNote = note
    },

    onRemoveNote(note) {
      const idx = this.notes.findIndex(item => item.id === note.id)

      if (idx !== -1) {
        this.notes.splice(idx, 1)
      }

      if (this.activeNote && this.activeNote.id === note.id) {
        this.activeNote = undefined
      }
    },

    cacheNotes() {
      this.$forage.set('notes', this.notes)
    },

    cacheLocale() {
      this.$forage.set('locale', this.$i18n.locale)
    },

    cacheData() {
      this.cacheNotes()
      this.cacheLocale()
    }
  }
}
</script>

<style>

</style>