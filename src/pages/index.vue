<template>
  <div class="container">
    <cadastro class="cadastro"/>
    <cardBox class="cardBox"/>
    <counter class="counter"/>
    <graph class="graph"/>
  </div>
</template>

<script>

import Cadastro from '../components/Cadastro.vue';
import CardBox from '../components/CardBox.vue';
import Counter from '../components/Counter.vue';
import Graph from '../components/Graph.vue';

export default {
  components: {
    'cadastro': Cadastro,
    'cardBox': CardBox,
    'counter': Counter,
    'graph': Graph
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  display: grid;
  grid-template-rows: 12rem auto;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  grid-template-areas: 
  "cadastro counter"
  "cardBox graph";
}
</style>
