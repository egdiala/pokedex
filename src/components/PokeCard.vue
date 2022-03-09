<template>
    <div v-bind="$attrs" class="border border-gray-50 rounded-lg overflow-clip hover:border-yellow-100 hover:cursor-pointer transition-transform ease-in delay-150 hover:scale-105 hover:-translate-y-1 hover:drop-shadow-2xl"  @click="viewStats">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`" class="w-36 h-36 mx-auto">
        <div class="bg-yellow-200 p-3 text-gray-900 capitalize">
            {{pokemon.name}}
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'poke-card',
    props: {
        pokemon: {
            type: Object,
            required: true
        },
    },
    setup (props) {
        props = reactive(props);
        const router = useRouter()
        const pokemonId = computed(() => {
            const pokemonUrl = props.pokemon.url;
            const pokeUrlArr = pokemonUrl.split("/");
            //return the id of the pokemon
            return pokeUrlArr[pokeUrlArr.length - 2]
        });
        const viewStats = function () {
            router.push({
                name: 'stats',
                params: {
                    id: pokemonId.value,
                },
            })
        }
        return {
            pokemonId,
            viewStats
        }
    }
})
</script>