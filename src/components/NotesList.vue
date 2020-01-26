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
    <div class="flex flex-wrap overflow-y-auto">
      <div
        v-for="note in filteredNotes"
        :key="note.id"
        class="w-1/3 p-2 cursor-pointer select-none"
        @click="selectNote(note)"
      >
        <div class="relative flex flex-col flex-grow-0 p-2 bg-white border border-gray-300 rounded">
          <h5 class="mb-2 text-sm font-medium">
            {{ (note.title || ' - ') | trunc(50) }}
          </h5>
          <p class="mb-2 overflow-hidden text-xs">{{ (note.body || ' - ') | trunc(105) }}</p>
          <p class="text-xs text-gray-600">{{ note.createdAt | date('dd/MM/yyyy HH:mm') }}</p>
          <div
            class="absolute flex items-center justify-center p-2 text-gray-400 bg-white cursor-pointer hover:text-red-300"
            :style="{top: '0', right: '0'}"
            @click.stop="deleteNote(note.id)"
          >
            <f-icon icon="trash" class="text-xs"/>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full shadow cursor-pointer hover:text-green-300"
      :style="{bottom: '5px', right: '5px'}"
      @click="createNewNote"
    >
      <f-icon icon="plus" class="text-sm"/>
    </div>
  </div>
</template>

<script>
import { orderBy } from 'lodash-es'

export default {
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
    filteredNotes() {
      if (!this.searchStr) {
        return orderBy(this.notes, ['createdAt'], ['desc'])
      }

      const filtered = this.notes.filter(item => {
        return item.title.toLowerCase().includes(this.searchStr.toLowerCase()) ||
          item.body.toLowerCase().includes(this.searchStr.toLowerCase())
      })

      return orderBy(filtered, ['createdAt'], ['desc'])
    },
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

</style>