<template>
    <section>
        <div class="container mx-auto px-3 py-4 md:px-0">
            <Loader v-if="pokemons.length < 1"/>
            <div v-else>
                <div ref='scrollComponent' class="grid md:grid-cols-5 grid-cols-2 gap-6">
                    <div v-for="pokemon in pokemons" :key="pokemon.name" class="animate__animated animate__fadeInUp">
                        <PokeCard :pokemon="pokemon" @mouseover="playSound" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <audio class="play">
        <source src="./../assets/audio/poke_select.mp3" type="audio/mpeg">
    </audio>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { pokeUrl } from '../api'

export default defineComponent({
    name: "Home",
    setup() {
        const pokemons = ref([]);
        const offset = ref(0);
        const scrollComponent = ref(null)
        const playSound = () => {
            document.querySelector(".play").play();
            return;
        };
        const infiniteHandler = (e) => {
            let element = scrollComponent.value;
            if (pokemons.value.length > 0) {
                if (element.getBoundingClientRect().bottom < window.innerHeight) {
                    offset.value = offset.value + 100;
                    getPokemonList();
                }                
            }

        }
        const getPokemonList = () => {
            pokeUrl.get(`pokemon?limit=100&offset=${offset.value}`).then(res => {
                let results = res.data.results;
                pokemons.value.push(...results);
            }).catch(err => {
                console.log(err);
            });            
        }
        onMounted(() => {
            getPokemonList();
            window.addEventListener("scroll", infiniteHandler)
        });
        onUnmounted(() => {
  		    window.removeEventListener("scroll", infiniteHandler)
  	    });
        return {
            pokemons,
            playSound,
            scrollComponent
        };
    }
})
</script>