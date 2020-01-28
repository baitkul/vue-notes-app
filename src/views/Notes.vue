<template>
  <div class="h-full">
    <component :is="activeComponent" />
  </div>
</template>

<script>
import NotesEditor from '@/components/NotesEditor'
import NotesList from '@/components/NotesList'

export default {
  components: {
    NotesEditor,
    NotesList,
  },

  computed: {
    activeComponent() {
      const selectedNote = this.$store.state.activeNote
      return selectedNote ? 'NotesEditor' : 'NotesList'
    }
  },
}
</script>