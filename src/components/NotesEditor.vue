<template>
  <div class="flex flex-col h-full">
    <div class="relative mb-4">
        <span
          class="py-4 text-gray-700 cursor-pointer"
          @click="$emit('back')"
        >
          <f-icon icon="arrow-left" />
        </span>
      </div>

      <div>
        <input
          v-model="entity.title"
          type="text"
          class="w-full py-2 text-2xl bg-transparent border-b-2 border-gray-300"
          placeholder="Enter title"
          @keyup.enter="$refs.body.focus()"
        />
      </div>

      <div class="flex-1 mt-4 overflow-hidden">
        <textarea
          ref="body"
          v-model="entity.body"
          class="w-full h-full py-2 bg-transparent resize-none"
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
  }
}
</script>

<style>

</style>