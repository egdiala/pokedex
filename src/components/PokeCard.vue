<template>
    <div v-bind="$attrs" class="border border-gray-300 rounded-lg">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`" class="w-10 h-10">
        <div class="bg-yellow-100 p-2">
            {{pokemon}}
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'poke-card',
    props: {
        pokemon: {
            type: String,
            required: true
        },
        pokemonId: {
            type: [String, Number],
            required: true
        }
    },
    setup () {
        return {}
    }
})
</script>