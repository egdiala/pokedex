<template>
    <div class="rounded-md px-1 text-yellow-600 bg-yellow-100 text-sm">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        return {
        }
    }
})
</script>

<style scoped>

</style>