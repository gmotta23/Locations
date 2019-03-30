<template>
  <div class="counter">
    <div class="media">
      Média de estabelecimentos por estado: {{this.$store.getters.getMedia}}<br>
    </div>
    <!-- <label>Meta:</label><input/> -->
    <div class="total">Total de estabelecimentos: {{$store.getters.getSum}}</div>
    <div class="contagens">
      <div v-for="(item, index) in this.$store.getters.getEstados" :key="index">
        {{item.item}}:{{item.count}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      array: this.$store.getters.getData,
      estados: '',
      counts: []
    }
  },
  async beforeMount() {
    this.$store.dispatch('refreshCounter')
  }
}
</script>

<style lang="scss" scoped>
.counter {
  display: grid;  
  .media {
    font-size: 1.5rem;
  }
  .contagens {
    display: grid;
    grid-template-columns: 4rem 4rem 4rem 4rem;
    grid-auto-flow: row;
  }
}
</style>
