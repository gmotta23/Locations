<template>
  <div class="cardBox">
    <div class="card" v-for="(item, index) in $store.getters.getData" :key="index">
      Estabelecimento: {{item.establishment}}
      <br>
      País: {{item.address.pais}}
      <br>
      Estado: {{item.address.estado}}
      <br>
      Cidade: {{item.address.cidade}}
      <br>
      Estado: {{item.address.pais}}   
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: {}
    }
  },
  async beforeCreate() {
    this.items = await this.$store.getters.getData
  }
}
</script>

<style lang="scss" scoped>

.cardBox {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 8rem;
  .card {
    display: grid;
    height: 6rem;
    margin: 1rem 1rem 1rem 1rem;
    overflow: auto;
    background-color: gainsboro;
  }
}

</style>
