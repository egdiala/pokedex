<template>
    <div class="rounded-md px-1 text-gray-600" :style="style">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
    setup () {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return {
            style: computed(() => ({
                backgroundColor: `#${randomColor} !important`,
            })),
        }
    }
})
</script>

<style scoped>

</style>