<template>
  <div class="cardBox">
    <div class="card" v-for="(item, index) in $store.getters.getData" :key="index">
      <div v-if="!editing[index]" class="estabelecimento">Estabelecimento: {{item.establishment}}  
        <button class="btn" @click.prevent="enableEdit(index)">Editar</button>
      </div>
      <div v-if="editing[index]" class="estabelecimento"><input v-model="item.establishment"/>
        <button class="btn" @click.prevent="saveEdit(item.establishment, index)">Salvar</button>
        <button class="btn" @click.prevent="disableEdit()">Fechar</button>
      </div>
      País: {{item.address.pais}}
      <br>
      Estado: {{item.address.estado}}
      <br>
      Cidade: {{item.address.cidade}}  
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: {},
      editing: []
    }
  },
  methods: {
    enableEdit (index) {
      this.editing = []
      this.editing[index] = true
    },
    disableEdit () {
      this.editing = []
    },
    async saveEdit(newItem, index) {
      let items = await JSON.parse(localStorage.getItem('itemsArray'))
      items[index].establishment = newItem
      localStorage.setItem('itemsArray', JSON.stringify(items));
      this.editing = []
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
    padding: 0.2rem 0 0 1rem;
    border-radius: 0.2rem;
    display: grid;
    height: 6rem;
    margin: 1rem 1rem 1rem 1rem;
    overflow: auto;
    background-color: gainsboro;
    border: black solid 0.1rem;
    .btn {
      background: white;
      border-radius: 0.1rem;
      border-style: ridge;
      &:hover{cursor: pointer;
      border-color: white;}
    }
  }
}

</style>
