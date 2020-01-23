<template>
  <div class="flex flex-col h-full p-2 text-gray-700">
    <template v-if="model">
      <input
        v-model="model.title"
        type="text"
        class="w-full p-2 text-2xl bg-transparent border-b-2 border-gray-300"
        :placeholder="$t('enter-title')"
        @keyup.enter="$refs.body.focus()"
      />

      <textarea
        ref="body"
        v-model="model.body"
        class="w-full h-full p-2 mt-4 bg-transparent resize-none"
        :placeholder="$t('enter-body')"
      ></textarea>
    </template>

    <div v-else class="flex items-center justify-center flex-1 w-full text-2xl tracking-wide text-gray-400 uppercase">
      {{ $t('not-selected') }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entity: {
      type: Object,
      default: null
    }
  },

  computed: {
    model: {
      get() {
        return this.entity
      },
      set(v) {
        this.$emit('update:entity', v)
      }
    }
  }
}
</script>