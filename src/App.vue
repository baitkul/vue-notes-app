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
