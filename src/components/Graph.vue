<template>
  <div class="container">
    <div class="graphContainer" v-if="this.$store.getters.getGraphData.length>0">
    <GChart
      class="graph"
      type="BarChart"
      :data="this.$store.getters.getGraphData"
      :options="chartOptions"
    />
    </div>
  </div>
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: this.$store.getters.getGraphData,
      chartOptions: {
        title: 'Quantidade de estabelecimentos por estado',
        vAxis: {title: 'Estado'},
        hAxis: {title: 'Estabelecimentos'},
        trendlines: {1: {}},
        chart: {
          title: 'Graph',
          subtitle: 'Estabelecimentos',
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
  width: auto;
  .graphContainer {
    background-color: blue;
    .graph {
      background-color: red;
    }
  }
}
</style>
