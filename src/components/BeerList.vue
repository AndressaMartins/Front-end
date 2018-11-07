<template>
  <div>
     <v-layout justify-center>
    <v-flex xs6>
      <v-select
        :items="categorias"
        v-model="selectedValue"
        item-text="text"
        item-value="id"
        menu-props="auto"
        label="Selecione o filtro de pesquisa"
        hide-details
        prepend-icon="search"
        single-line>
      </v-select>
    </v-flex>
  </v-layout>

    <v-container grid-list-md>
      <v-layout row wrap>
        <!-- Laço com os dados de cervejas -->
        <!-- Notem que usamos a id devido ao object observer -->
        <v-flex v-for="beer in beers" :key="beer.id" xs4>
          <!-- Passamos a prop com a nossa cerveja específica para ser renderizada no card. -->
          <BeerCard :beer="beer" />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
// Como padrão, importamos nosso componente de card.
import BeerCard from "../components/BeerCard.vue";

export default {
  mounted() {
    axios
      .get("https://api.punkapi.com/v2/beers?brewed_before=11-2012&abv_gt=6")
      .then(response => (this.beers = response.data, this.beersOriginal = response.data));
  },
  data() {
    return {
      beersOriginal: [],
      beers: [],
      selectedValue: null,
      categorias: [
        {
          id:"0",
          text: "Mostrar Todas"
        },
        {
          id:"1",
          text: "Porter	(18-50)",
          Val1:18,
          Val2:50
        },

        {
          id:"2",
          text: "American lager	(8-26)",
          Val1:8,
          Val2:26
         },
        {
          id:"3",
          text: "Barleywine	(34-120)",
          Val1:34,
          Val2:120
         }

      ]
    };
     
    
  },
  
  watch: {
    selectedValue(newValue) {
      if(newValue == "0") {
        this.beers = this.beersOriginal;
      } else {
        axios
          .get("https://api.punkapi.com/v2/beers?ibu_gt=" + this.categorias[newValue].Val1 + "&ibu_lt=" + 
          this.categorias[newValue].Val2).then(response => (this.beers = response.data));
      }
    }
  },
  components: {
    
    BeerCard
  }
};
</script>
