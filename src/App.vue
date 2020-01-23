<template>
  <div class="flex items-center justify-center h-screen bg-gray-500">
    <Notes />

    <div class="absolute bottom-0 p-2 text-sm text-center text-gray-700">
      Made using
      <a
        href="https://vuejs.org"
        target="_blank"
        class="font-medium underline"
        rel="noopener noreferrer">vuejs</a>&nbsp;and&nbsp;
      <a
        href="https://tailwindcss.com"
        target="_blank"
        class="font-medium underline"
        rel="noopener noreferrer">tailwindcss</a>

    </div>
  </div>
</template>

<script>
import Notes from '@/components/Notes'

export default {
  components: {
    Notes,
  }
}
</script>
<style>

</style>
