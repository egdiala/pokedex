<template>
    <section>
        <div class="container mx-auto px-3 py-4 md:px-0">
            <Loader v-if="pokemons.length < 1"/>
            <div v-else>
                <div class="flex grow md:flex-row flex-col space-y-4 space-x-0 md:space-x-4 md:space-y-0 items-center">
                    <Input placeholder="Find a pokemon..." label="Search by Name" v-model.lazy="search" @keyup="filterByName" class="w-full" />
                    <Select label="Gender Filter" v-model="gender" :options="genders" @change="filterByGender" class="w-full" />
                    <Select label="Habitat Filter" v-model="habitat" :options="habitats" @change="filterByHabitat" class="w-full" />
                </div>
                <div v-if="gender || habitat" class="px-4 lg:px-0 flex items-center mt-5">
                    <Chip :label="gender" @click="gender = '', clear()"/>
                    <Chip :label="habitat" @click="habitat = '', clear()"/>
                </div>
                <div v-if="filteredPokemon.length > 0" ref='scrollComponent' class="grid md:grid-cols-5 grid-cols-2 gap-6 mt-10">
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
import { useStore } from 'vuex'
import { pokeUrl } from '../api'

export default defineComponent({
    name: "Home",
    setup() {
        const store = useStore()
        const pokemons = ref([]);
        const filteredPokemon = ref(pokemons.value);
        const total = ref(0);
        const offset = ref(0);
        const search = ref('')
        const gender = ref('')
        const habitat = ref('')
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
            store.dispatch('getGenders')
            store.dispatch('getHabitats')
            getPokemonList();
            window.addEventListener("scroll", infiniteHandler)
        });
        onUnmounted(() => {
  		    window.removeEventListener("scroll", infiniteHandler)
  	    });
        // live search filter
        const filterByName = function () {
            if (search.value !== "") {
                const result = filteredPokemon.value.filter((pokemon) => pokemon.name.toLowerCase().match(search.value.toLowerCase()));
                filteredPokemon.value = result;
            }
            else {
                console.log('not here')
                filteredPokemon.value = pokemons.value;
            }
        };
        const filterByGender = function() {
            store.dispatch('getGender', {gender: gender.value}).then(() => {
                filteredPokemon.value = store.state.pokemons
            })
        };
        const filterByHabitat = function() {
            store.dispatch('getHabitat', {habitat: habitat.value}).then(() => {
                filteredPokemon.value = store.state.pokemons
            })
        };
        const clear = () => {
            filteredPokemon.value = pokemons.value
        }
        return {
            clear,
            search,
            gender,
            habitat,
            genders: store.state.genders,
            habitats: store.state.habitats,
            filterByName,
            filterByGender,
            filterByHabitat,
            filteredPokemon,
            pokemons,
            playSound,
            scrollComponent
        };
    }
})
</script>