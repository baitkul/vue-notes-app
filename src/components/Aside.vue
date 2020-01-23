<template>
  <div class="flex flex-col h-full max-h-full overflow-y-auto border-r border-gray-400 ">
    <div class="flex items-center justify-between p-2">
      <span class="w-1/6 px-3 py-1 text-sm text-center text-gray-700 cursor-pointer hover:text-gray-600" @click="createItem">
        <i class="fa fa-plus"></i>
      </span>

      <span
        class="w-1/6 px-3 py-1 text-sm text-center"
        :class="{'text-gray-500 cursor-not-allowed': listIsEmpty, 'cursor-pointer text-gray-700 hover:text-gray-600': !listIsEmpty}"
        @click="toggleEdit"
      >
        <i :class="editMode ? 'fa fa-times' : 'fa fa-edit'"></i>
      </span>
    </div>

    <div class="flex-1 w-full overflow-y-auto">
      <div
        v-for="item in list"
        :key="item.id"
        class="flex items-center h-12 text-xs bg-white border-b border-gray-300 cursor-pointer"
      >
        <div
          class="flex flex-col justify-between h-full py-1 pl-3"
          :class="{'w-4/5': editMode, 'w-full': !editMode}"
          @click="$emit('select', item)"
        >
          <span class="w-full text-sm font-medium text-gray-800 truncate whitespace-no-wrap">
            {{ item.title || ' - '}}
          </span>
          <span class="text-gray-600">{{ item.createdAt | date }}</span>
        </div>

        <div
          class="flex items-center justify-center h-full overflow-hidden text-gray-600 bg-gray-300 shadow-inner hover:bg-gray-400 hover:text-gray-700"
          :class="{'w-1/5': editMode, 'w-0': !editMode}"
          @click="$emit('remove', item)"
        >
          <i class="fa fa-trash"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      editMode: false,
    }
  },

  computed: {
    listIsEmpty() {
      return this.list.length < 1
    }
  },

  watch: {
    listIsEmpty(v) {
      if (v) {
        this.editMode = false
      }
    }
  },

  methods: {
    toggleEdit() {
      this.editMode = !this.editMode
    },

    createItem() {
      this.$emit('create')
    }
  }
}
</script>

<style></style>