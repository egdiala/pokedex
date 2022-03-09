<template>
  <header class="sticky z-10 top-0 right-0 left-0 h-10 flex items-center bg-red-500 border-b border-yellow-200" v-bind="$attrs">
    <div class="flex flex-grow items-center">
      <div class="flex items-center space-x-1 mx-auto">
        <img alt="pokeball" src="./../assets/img/pokeball.png" class="w-8" />
        <span class="text-base font-medium text-yellow-300 text-center">Pokédex</span>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'navbar',
})
</script>