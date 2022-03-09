<template>
    <section>
        <div class="container mx-auto px-3 py-4 md:px-0">
            <TransitionGroup tag="div" name="list" class="grid md:grid-cols-5 grid-cols-2 gap-4">
                    <div v-for="pokemon in pokemons" :key="pokemon.name">
                        <PokeCard :pokemon="pokemon" @mouseover="playSound" />
                    </div>
            </TransitionGroup>
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>