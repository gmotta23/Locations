<template>
  <div class="cadastro">
    <div class="title">Cadastro</div>
    <form class="form-container">
      <label>Estabelecimento</label>
      <input type="text" placeholder="Estabelecimento" v-model="establishment"/>
      <label>Endereço</label>
      <vue-google-autocomplete
        id="map"
        ref="address"
        classname="input"
        placeholder="Endereço"
        v-on:placechanged="getAddressData"
        country="br"
        types="(regions)"
        class="address"
      >
      </vue-google-autocomplete>
      <button class="btn" @click.prevent="addData(establishment, address)">Adicionar</button>
    </form>
  
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  components: {
    VueGoogleAutocomplete
  },
  data () {
    return {
      establishment: '',
      address: {}
    }
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
  },
  methods: {
        /**
    * When the location found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    * @param {String} id Input container ID
    */
    getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
    },
    async addData(establishment, address, addressData) {
      if (address.country) {
        let data = {establishment, address}
        await this.$store.dispatch('addData', data)
        this.establishment = ''
        //reseta o input
        document.getElementById("map").value = ''
        address = {}
      } else {
        alert('Endereço inválido')
      }
      this.$store.dispatch('refreshCounter')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.cadastro {
  text-align: left;
  padding: 1rem 0 1rem 1rem;
}

.title {
  font-size: 2rem;
}

.form-container {
  display: grid;
  width: 35rem;
  input {
    border-radius: 0.2rem;
    border-width: 0.2rem;
    border-style:groove;
    height: 1rem;
    color: black;
    &:hover{
      border-width: 0.2rem;
      border-color:rgb(151, 182, 229);
      color: black;
    }
  }
}

.btn {
  margin-top: 1rem;
  color: #fff;
  text-transform: uppercase;
  background: blue;
  height: 2rem;
  border-radius: 0.2rem;
  border: none;
  &:hover{
    cursor: pointer;
    background: rgba(12, 9, 51, 0.57);
    letter-spacing: 1px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0,0,0,0.57);
    box-shadow: 5px 40px -10px rgba(0,0,0,0.57);
    transition: all 0.4s ease 0s;
    }
}

</style>
