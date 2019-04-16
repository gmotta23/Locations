import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemArray: JSON.parse(localStorage.getItem('itemsArray')),
    estados: [],
    media: 0,
    graphData: [],
    sum: 0
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
    },
    getSum(state) {
      return state.sum
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
    },
    addSumToState(state, sum) {
      state.sum = sum
    }
  },
  actions: {
    async addData({state, commit}, data) {

      //Puxa o local storage
      let items = await JSON.parse(localStorage.getItem('itemsArray')) || [];

      //Cria um objeto
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

      //Adiciona o objeto no array puxado
      items.push(newItem);
      //Seta novamente o localStorage
      localStorage.setItem('itemsArray', JSON.stringify(items));
      commit('addDataToState', items)
    },
    async refreshCounter({state, commit, getters}) {
      let array = getters.getData

      //Transforma o array de objetos da store em um array de estados

      if (!array) {
        return 0
      }

      let estadosArray = array.map(element => {
        return element.address.estado
      })

      let estados = estadosArray

      //Conta estados que se repetem, criando objetos referentes a cada estado e sua respectiva contagem

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
              //Anula estados já contados para evitar repetição
              estados[i]=''
            }
          }
          counts.push(newCount)
      })

      //Filtra os elementos vazios
      
      let filterEmpty = counts.filter(element => {
        return element.item.length>0
      })

      commit('addEstadosToState', filterEmpty)

      let sum = 0

      filterEmpty.forEach(element => {
        sum += element.count
      })

      commit('addSumToState', sum)

      let media = sum/getters.getEstados.length
      commit('addMediaToState', media)

      //Apropria os dados para aparecerem no gráfico

      let graphData = [['Estado','Estabelecimentos']]

      filterEmpty.forEach(element => {
        let aux = [element.item, element.count]
        graphData.push(aux)
      })

      commit('addGraphDataToState', graphData)

    }
  }
})