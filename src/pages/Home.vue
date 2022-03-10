<template>
    <section>
        <div class="container mx-auto px-3 py-4 md:px-0">
            <Loader v-if="pokemons.length < 1"/>
            <div v-else>
                <div class="flex grow mb-6">
                    <Input placeholder="Find a pokemon..." label="Search" v-model="search" @keydown="filterEntry" />
                </div>
                <div v-if="filteredPokemon.length > 0" ref='scrollComponent' class="grid md:grid-cols-5 grid-cols-2 gap-6">
                    <div v-for="pokemon in filteredPokemon" :key="pokemon.name" class="animate__animated animate__fadeInUp">
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
        const filteredPokemon = ref(pokemons.value);
        const total = ref(0);
        const offset = ref(0);
        const search = ref('')
        const scrollComponent = ref(null)
        const playSound = () => {
            document.querySelector(".play").play();
            return;
        };
        const infiniteHandler = (e) => {
            let element = scrollComponent.value;
            if (pokemons.value.length > 0) {
                if (element.getBoundingClientRect().bottom < window.innerHeight) {
                    if (total.value > offset.value) {
                        offset.value = offset.value + 100;
                        getPokemonList();
                    }
                    return;
                }                
            }
        };
        const getPokemonList = () => {
            pokeUrl.get(`pokemon?limit=100&offset=${offset.value}`).then(res => {
                let results = res.data.results;
                total.value = res.data.count;
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
        // live search filter
        const filterEntry = function () {
            if (search.value !== "") {
                const result = filteredPokemon.value.filter((pokemon) => pokemon.name.toLowerCase().match(search.value.toLowerCase()));
                filteredPokemon.value = result;
            }
            else {
                console.log('not here')
                filteredPokemon.value = pokemons.value;
            }
        };
        return {
            search,
            filterEntry,
            filteredPokemon,
            pokemons,
            playSound,
            scrollComponent
        };
    }
})
</script>