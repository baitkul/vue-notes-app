<template>
  <div class="flex flex-col h-full">
    <div class="relative flex mb-4">
        <button class="py-2 leading-none text-gray-600 hover:text-gray-800" @click="goBack">
          <f-icon icon="arrow-left" />
        </button>
        <button class="p-2 ml-auto leading-none text-gray-600 hover:text-gray-800">
          <f-icon icon="bell" />
        </button>
        <button
          class="p-2 ml-4 leading-none text-gray-600 hover:text-gray-800"
          :class="{'text-gray-600 hover:text-gray-800': !entity.pinned, 'text-green-400 hover:text-green-500': entity.pinned}"
          @click="entity.pinned = !entity.pinned"
        >
          <f-icon icon="thumbtack" />
        </button>
      </div>

      <div>
        <input
          v-model="entity.title"
          type="text"
          class="w-full py-2 text-2xl bg-transparent border-b-2 border-gray-300 outline-none"
          placeholder="Enter title"
          @keyup.enter="$refs.body.focus()"
          @keyup.tab="$refs.body.focus()"
        />
      </div>

      <div class="flex-1 mt-4 overflow-hidden">
        <textarea
          ref="body"
          v-model="entity.body"
          class="w-full h-full py-2 bg-transparent outline-none resize-none"
          placeholder="Enter text"
        ></textarea>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true,
    }
  },

  computed: {
    entity: {
      get() {
        return this.note
      },
      set(v) {
        this.$emit('update:note', v)
      }
    }
  },

  mounted() {
    window.addEventListener('keyup', this.keyupHandler)

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keyup', this.keyupHandler)
    })
  },

  methods: {
    keyupHandler(e) {
      if (e.key === 'Escape') {
        this.goBack()
      }
    },

    goBack() {
      this.$emit('back')
    }
  }
}
</script>

<style>

</style>