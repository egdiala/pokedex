<template>
    <section>
        <div class="container mx-auto">
            <div class="grid grid-cols-6 gap-4">
                <div v-for="n in 1000">{{n + 1}}</div>
            </div>
        </div>
    </section>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Home',
    setup () {
        return {}
    }
})
</script>

<style lang="scss" scoped>

</style>