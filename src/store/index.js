import { createStore } from 'vuex'
import { pokeUrl } from '../api'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      genders: [],
      habitats: [],
      pokemons: []
    }
  },
  mutations: {
    updateGenders (state, genders) {
      state.genders = genders
    },
    updateHabitats(state, habitats) {
      state.habitats = habitats
    },
    updatePokemonsByGender(state, pokemons) {
      state.pokemons.push(...pokemons.map(a => a.pokemon_species))
    },
    updatePokemonsByHabitat(state, pokemons) {
      state.pokemons.push(...pokemons)
    },
    unsetPokemons(state) {
      state.pokemons.length = 0
    }
  },
  actions: {
    getGenders () {
      pokeUrl.get('gender').then(res => {
        let result = res.data.results
        store.commit('updateGenders', result.map(a => a.name))
      }).catch(err => {
        console.log(err)
      })
    },
    getGender({ commit }, payload) {
      pokeUrl.get(`gender/${payload.gender}`).then(res => {
        store.commit('unsetPokemons')
        let result = res.data.pokemon_species_details
        store.commit('updatePokemonsByGender', result)
      }).catch(err => {
        console.log(err)
      })
    },
    getHabitats() {
      pokeUrl.get('pokemon-habitat').then(res => {
        let result = res.data.results
        store.commit('updateHabitats', result.map(a => a.name))
      }).catch(err => {
        console.log(err)
      })
    },
    getHabitat({ commit }, payload) {
      pokeUrl.get(`pokemon-habitat/${payload.habitat}`).then(res => {
        store.commit('unsetPokemons')
        let result = res.data.pokemon_species
        store.commit('updatePokemonsByHabitat', result)
      }).catch(err => {
        console.log(err)
      })
    },
  }
})