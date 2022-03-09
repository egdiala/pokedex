<template>
    <section>
        <div class="container mx-auto px-3 py-4 md:px-0">
            <div class="grid md:grid-cols-5 grid-cols-2 gap-4">
                <div v-for="pokemon in pokemons" :key="pokemon.name" class="animate__animated animate__fadeInUp">
                    <PokeCard :pokemon="pokemon" @mouseover="playSound" />
                </div>
            </div>
        </div>
    </section>
    <audio class="play">
        <source src="./../assets/audio/poke_select.mp3" type="audio/mpeg">
    </audio>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { pokeUrl } from '../api'

export default defineComponent({
    name: "Home",
    setup() {
        const pokemons = ref([]);
        const playSound = function () {
            document.querySelector('.play').play();
            return;
        }
        onMounted(() => {
            pokeUrl.get("pokemon?limit=100&offset=0").then(res => {
                let results = res.data.results;
                pokemons.value.push(...results);
            }).catch(err => {
                console.log(err);
            })
        });
        return {
            pokemons,
            playSound
        };
    }
})
</script>