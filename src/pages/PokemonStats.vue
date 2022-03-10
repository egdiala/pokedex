<template>
    <section>
        <div class="container mx-auto px-3 py-4 md:px-0">
            <Loader v-if="!pokemonData.name"/>
            <div v-else class="flex flex-col space-y-8">
                <div class="flex md:flex-row flex-col md:space-x-8 space-y-8 md:items-start">
                    <div class="mx-auto md:mx-0">
                        <img :src="pokemonData.sprites.front_default" class="w-56 h-56 mx-auto">
                    </div>
                    <div class="flex flex-col bg-[#1A1A1A] px-8 py-4 rounded-lg space-y-4 grow">
                        <div class="flex items-center justify-between">
                            <h4 class="text-3xl font-medium capitalize">{{ pokemonData.name }}</h4>
                            <h1 class="text-5xl font-bold capitalize text-yellow-400"><small>#</small>{{ pokemonData.id }}</h1>
                        </div>
                        <div class="flex flex-col space-y-3">
                            <div v-for="(stat,s) in pokemonData.stats" class="flex space-x-2 items-center capitalize">
                                <span class="w-36">{{ textFormatter(stat.stat.name) }} </span><StatGauge :base-stat="stat.base_stat" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col space-y-4">
                    <div class="w-full bg-red-500 p-2 text-xl text-white">Profile</div>
                    <div class="flex space-x-2 items-center">
                        <span>{{ pokemonData.abilities.length > 1 ? 'Abilities' : 'Ability' }}: </span>
                        <div class="flex space-x-1">
                            <div v-for="(ability, a) in pokemonData.abilities" :key="a" class="text-gray-300">{{ ability.ability.name}}<small v-if="a + 1 !== pokemonData.abilities.length">,</small></div>
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <span>Height: </span>
                        <div class="flex space-x-1">
                            {{ pokemonData.height }}
                        </div>
                    </div>
                    <div class="flex space-x-2 items-center">
                        <span>Types: </span>
                        <div class="flex space-x-2">
                            <Badge v-for="(type,t) in pokemonData.types" :key="t">{{ type.type.name}}</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { pokeUrl } from '../api'
import StatGauge from '../components/StatGauge.vue'

export default defineComponent({
    name: "Stats",
    setup() {
        const route = useRoute();
        const pokemonData = ref({});
        onMounted(() => {
            pokeUrl.get(`pokemon/${route.params.id}`).then(res => {
                let result = res.data;
                console.log(result);
                pokemonData.value = result;
            }).catch(err => {
                console.log(err);
            });
        });
        const textFormatter = function(text) {
            if (text.includes("-")) {
                return text.split("-").join(" ");
            }
            return text
        };
        return {
            pokemonData,
            textFormatter
        };
    },
    components: { StatGauge }
})
</script>

<style scoped>

</style>