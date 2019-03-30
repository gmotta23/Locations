<template>
  <div class="container">
    <div class="graphContainer" v-if="this.$store.getters.getGraphData.length>0">
    <GChart
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
        height: 200,
        width: 600
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 1rem;
  width: auto;
}
</style>
