<template>
  <div class="flex w-full h-full overflow-hidden">
    <!-- aside -->
    <aside class="w-1/4 h-full bg-gray-300">
      <div class="flex items-center p-2 border-b border-gray-400">
        <span class="w-1/6 px-3 py-1 text-sm text-center text-gray-700" @click="createNote">
          <i class="fa fa-plus"></i>
        </span>

        <h5 class="w-4/6 text-sm font-medium tracking-wide text-center text-gray-700 uppercase">Notes app</h5>

        <span
          class="w-1/6 px-3 py-1 text-xs text-center"
          :class="{'text-gray-500 cursor-not-allowed': !notes.length, 'text-gray-700': notes.length}"
          @click="toggleEdit"
        >
          <i :class="editMode && notes.length ? 'fa fa-times' : 'fa fa-pen'"></i>
        </span>
      </div>

      <div class="h-full overflow-y-auto">
        <div
          v-for="(note, index) in notes"
          :key="note.id"
          class="flex items-center px-3 py-2 border-b border-gray-400 cursor-pointer hover:bg-gray-200"
          :class="{'bg-gray-200': isActiveNote(note.id)}"
        >
          <div :class="editMode ? 'w-5/6' : 'w-full'" @click="setActiveNote(note)">
            <h5 class="w-full text-sm font-medium truncate whitespace-no-wrap" :class="{'text-blue-600': isActiveNote(note.id)}">
              {{ note.title }}
            </h5>
            <div class="flex mt-1 text-xs text-gray-600" :class="{'text-blue-400': isActiveNote(note.id)}">
              <span class="w-2/5">
                {{ note.createdAt | date }}
              </span>
              <span class="w-3/5 truncate whitespace-no-wrap">
                {{ note.body }}
              </span>
            </div>
          </div>

          <div
            class="overflow-hidden text-xs text-center text-red-400 cursor-pointer ease-in-out hover:text-red-700"
            :class="editMode ? 'w-1/6 p-2 ml-2' : 'w-0'"
            @click="deleteNote(index)"
          >
            <i class="fa fa-trash"></i>
          </div>
        </div>
      </div>
    </aside>

    <!-- main section -->
    <section class="flex flex-col w-3/4 h-full p-2 text-gray-700 bg-gray-100 ">
      <template v-if="activeNote">
        <input
          v-model="activeNote.title"
          type="text"
          class="w-full p-2 text-2xl bg-transparent border-b-2 border-gray-300"
          placeholder="Title"
          @keyup.enter="$refs.body.focus()"
        />

        <textarea
          ref="body"
          v-model="activeNote.body"
          class="w-full h-full p-2 mt-4 bg-transparent resize-none"
          placeholder="Body"
        ></textarea>
      </template>

      <div v-else class="flex items-center justify-center w-full h-full text-2xl tracking-wide text-gray-300 uppercase">
        Please select note
      </div>
    </section>
  </div>
</template>

<script>
import shortid from 'shortid'

export default {
  data() {
    return {
      activeNote: null,
      editMode: false,
      notes: [],
    }
  },

  watch: {
    notes: {
      deep: true,
      handler(v) {
        if (v.length < 1 && this.editMode) {
          this.editMode = false
        }

        this.updateForage()
      }
    },
  },

  mounted() {
    const cached = this.$forage.get('notes')

    if (Array.isArray(cached)) {
      this.notes = cached
    }

    window.addEventListener('beforeunload', this.updateForage)

    this.$once('hook:beforeDestroy', () => {
      this.updateForage()
      window.removeEventListener('beforeunload', this.updateForage)
    })
  },

  methods: {
    toggleEdit() {
      if (!this.notes.length) {
        return false
      }

      this.editMode = !this.editMode
    },

    createNote() {
      if (this.editMode) {
        this.toggleEdit()
      }

      const note = {
        id: shortid.generate(),
        title: undefined,
        body: undefined,
        createdAt: new Date(),
      }

      this.setActiveNote(note)
      this.notes.push(note)
    },

    deleteNote(idx) {
      this.setActiveNote(null)
      this.notes.splice(idx, 1)

      if (--idx >= 0) {
        this.setActiveNote(this.notes[idx])
      }
    },

    updateForage() {
      this.$forage.set('notes', this.notes)
    },

    setActiveNote(note) {
      this.activeNote = note
    },

    isActiveNote(noteId) {
      if (this.activeNote && 'id' in this.activeNote) {
        return noteId === this.activeNote.id
      }

      return false
    }
  }
}
</script>
