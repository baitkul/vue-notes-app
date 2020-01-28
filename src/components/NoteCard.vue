<template>
  <div class="w-1/3 p-2 cursor-pointer select-none" @click="$emit('select', note)">
    <div class="relative flex flex-col flex-grow-0 p-2 bg-white border border-gray-300 rounded">
      <h5 class="mb-2 text-sm font-medium">
        {{ (note.title || ' - ') | trunc(50) }}
      </h5>
      <p class="mb-2 overflow-hidden text-xs">{{ (note.body || ' - ') | trunc(105) }}</p>
      <p class="text-xs text-gray-600">{{ note.createdAt | date('dd/MM/yyyy HH:mm') }}</p>
      <div
        class="absolute flex items-center justify-center p-2 text-gray-400 bg-white cursor-pointer hover:text-red-300"
        :style="{top: '0', right: '0'}"
        @click.stop="$emit('delete', note.id)"
      >
        <f-icon icon="trash" class="text-xs"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>