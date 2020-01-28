<template>
  <div
    class="absolute flex items-center justify-center w-12 h-12 text-green-300 bg-white rounded-full shadow cursor-pointer hover:shadow-md hover:text-green-400"
    :class="{'pulsate': pulsate}"
    :style="positionStyles"
    :title="title"
    @click="$emit('click')"
  >
    <f-icon :icon="icon" class="text-xl"/>
  </div>
</template>

<script>
export default {
  props: {
    positionStyles: {
      type: Object,
      default: () => ({
        bottom: '5px',
        right: '5px'
      })
    },

    icon: {
      type: String,
      default: 'plus'
    },

    pulsate: {
      type: Boolean,
      default: true
    },

    title: {
      type: String,
      default: undefined
    }
  }
}
</script>