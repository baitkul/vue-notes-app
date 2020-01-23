<template>
  <div class="flex flex-col h-full max-h-full overflow-y-auto border-r border-gray-400 ">
    <div class="flex items-center justify-between p-2">
      <span
        class="flex items-center justify-center w-8 h-8 text-xs leading-none text-center text-gray-700 bg-white rounded-full shadow-md cursor-pointer hover:text-gray-900"
        @click="createItem"
      >
        <i class="fa fa-plus"></i>
      </span>

      <span
        class="flex items-center justify-center w-8 h-8 text-xs leading-none text-center bg-white rounded-full shadow-md"
        :class="{
          'text-gray-500 cursor-not-allowed': listIsEmpty,
          'cursor-pointer text-gray-700 hover:text-gray-900': !listIsEmpty
        }"
        @click="toggleEdit"
      >
        <i :class="editMode ? 'fa fa-times' : 'fa fa-pen'"></i>
      </span>
    </div>

    <div class="flex-1 w-full overflow-y-auto">
      <div
        v-for="item in list"
        :key="item.id"
        class="flex items-center h-12 text-xs bg-white border-b border-gray-300 cursor-pointer"
      >
        <div
          class="flex flex-col justify-between h-full px-3 py-1 border-l-4 border-transparent"
          :class="{'w-4/5': editMode, 'w-full': !editMode, 'border-blue-500': isItemActive(item.id)}"
          @click="$emit('select', item)"
        >
          <span class="w-full text-sm font-medium text-gray-800 truncate whitespace-no-wrap">
            {{ item.title || ' - '}}
          </span>
          <span class="flex text-gray-600">
            <span class="w-2/5">{{ item.createdAt | date }}</span>
            <span class="w-3/5 truncate whitespace-no-wrap">{{ item.body | trunc(25) }}</span>
          </span>
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
    },

    activeId: {
      type: String,
      default: '',
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
      if (this.listIsEmpty) {
        return false
      }

      this.editMode = !this.editMode
    },

    createItem() {
      this.$emit('create')
    },

    isItemActive(id) {
      return this.activeId === id
    }
  }
}
</script>

<style></style>