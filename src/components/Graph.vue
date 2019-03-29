<template>
  <div class="container">
    <GChart
      type="BarChart"
      :data="this.$store.getters.getGraphData"
      :options="chartOptions"
    />
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
}
</style>
