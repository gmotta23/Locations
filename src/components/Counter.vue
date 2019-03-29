<template>
  <div class="counter">
    <div v-for="(item, index) in this.$store.getters.getEstados" :key="index">
      {{item.item}}:{{item.count}}
    </div>
    Média de estabelecimentos por estado: {{this.$store.getters.getMedia}}<br>
    <label>Meta:</label><input/>
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
  //grid-auto-flow: column;
}
</style>
