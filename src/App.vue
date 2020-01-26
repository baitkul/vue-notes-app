<template>
  <div class="flex items-center justify-center h-screen bg-gray-500">
    <Window>
      <div class="flex h-full overflow-hidden">
        <AsideNav />

        <div class="flex-1 p-4">
          <router-view />
        </div>
      </div>
    </Window>

    <footer class="absolute bottom-0 left-0 w-full p-2 text-sm text-center">
      Made with&nbsp;
      <a
        href="https://vuejs.org"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium underline"
      >Vue.js</a>
      &nbsp;&amp;&nbsp;
      <a
        href="https://tailwindcss.com"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium underline"
      >Tailwindcss</a>
    </footer>
  </div>
</template>

<script>
import Window from '@/components/Window'
import AsideNav from '@/components/AsideNav'

export default {
  components: {
    AsideNav,
    Window,
  },
}
</script>
<style>

</style>
