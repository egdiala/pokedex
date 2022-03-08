<template>
  <header v-bind="$attrs">
    <div class="flex flex-grow items-center">
      <div class="flex items-center space-x-1 mx-auto">
        <img alt="pokeball" src="./../assets/img/pokeball.png" class="w-8" />
        <span class="text-base font-medium text-yellow-300 text-center">Pokédex</span>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
    name: 'navbar',
    setup () {
        return {
            
        }
    }
})
</script>

<style scoped>
  .nova-navbar {
    @apply top-0 right-0 left-0 h-16 flex items-center bg-white border-gray-200 px-2 !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>