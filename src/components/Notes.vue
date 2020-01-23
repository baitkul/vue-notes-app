<template>
  <Window>
    <div class="flex h-full">
      <Aside
        class="w-1/4"
        :list="notes"
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

  mounted() {
    const cached = this.$forage.get('notes')

    if (Array.isArray(cached)) {
      this.notes = cached
    }

    window.addEventListener('beforeunload', this.cacheNotes)

    this.$once('hook:beforeDestroy', () => {
      this.cacheNotes()
      window.removeEventListener('beforeunload', this.cacheNotes)
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
    }
  }
}
</script>

<style>

</style>