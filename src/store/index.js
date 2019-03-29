import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemArray: JSON.parse(localStorage.getItem('itemsArray')),
    estados: [],
    media: [],
    graphData: []
  },
  getters: {
    getData (state) {
      return state.itemArray
    },
    getEstados(state) {
      return state.estados
    },
    getMedia(state) {
      return state.media
    },
    getGraphData(state) {
      return state.graphData
    }
  },
  mutations: {
    addDataToState(state, items) {
      state.itemArray = items
    },
    addEstadosToState(state, estados) {
      state.estados = estados
    },
    addMediaToState(state, media) {
      state.media = media
    },
    addGraphDataToState(state, graphData) {
      state.graphData = graphData
    }
  },
  actions: {
    async addData({state, commit}, data) {
      let items = await JSON.parse(localStorage.getItem('itemsArray')) || [];
      var newItem = {
        establishment: data.establishment,
        address: {
          pais: data.address.country,
          estado: data.address.administrative_area_level_1,
          latitude: data.address.latitude,
          longitude: data.address.longitude,
          cidade: data.address.locality
        }
      }
      items.push(newItem);
      localStorage.setItem('itemsArray', JSON.stringify(items));
      commit('addDataToState', items)
    },
    async refreshCounter({state, commit, getters}) {
      let array = getters.getData

      let estadosArray = array.map(element => {
        return element.address.estado
      })

      let estados = estadosArray

      let counts = []
      estados.forEach(element => {
          let newCount = {
            item: element,
            count: 1
          }
          for (let i = 0; i < estados.length; i++) {
            //conta os iguais em posições diferentes
            if (estados.indexOf(element)!==i && estados[i]===element) {
              newCount.count++
              estados[i]=''
            }
          }
          counts.push(newCount)
      })

      let filterEmpty = counts.filter(element => {
        return element.item.length>0
      })

      commit('addEstadosToState', filterEmpty)

      let sum = 0

      filterEmpty.forEach(element => {
        sum += element.count
      })

      let media = sum/getters.getEstados.length
      commit('addMediaToState', media)

      //meta: ['PR', 15],['SP', 2]
      console.log(filterEmpty)

      let graphData = [['Estado','Número']]

      filterEmpty.forEach(element => {
        let aux = [element.item, element.count]
        console.log(aux)
        graphData.push(aux)
      })

      console.log(graphData)
      commit('addGraphDataToState', graphData)

    }
  }
})