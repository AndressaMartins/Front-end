<template>
 <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Carrinho de Compras</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="beer in beers">
            <v-list-tile :key="beer.id" avatar ripple>
              <v-list-tile-content>
                <v-list-tile-title>{{ beer.name }}</v-list-tile-title>
                <v-list-tile-sub-title>Preço: {{ formatTotal(beer.price) }}</v-list-tile-sub-title>
                <v-list-tile-action-text>Quantidade: {{ beer.quantity }}</v-list-tile-action-text>
              </v-list-tile-content>

              <v-list-tile-action>
                <div>
                  <v-btn flat icon color="indigo" v-on:click="incrementoBeer(beer)">
                    <v-icon dark>add</v-icon>
                  </v-btn>

                  <v-btn v-if="beer.quantity > 1" 
                    flat icon color="red lighten-3" v-on:click="delincrementoBeer(beer)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                  <v-btn v-else 
                    flat icon color="red" @click="dialog = true">
                    <v-icon dark>remove</v-icon>
                  </v-btn>

                  <v-btn flat icon @click="dialog = true">
                    <v-icon dark>delete</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialog" max-width="350">
                    <v-card>
                      <v-card-title class="headline">
                        Corfimação
                      </v-card-title>

                      <v-card-text>
                        Você deseja deletar o produto?
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat="flat" @click="dialog = false">
                          Não
                        </v-btn>
                        <v-btn color="green darken-1" flat="flat" @click="dialog = false" v-on:click="deleteBeer(beer)">
                          Sim
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </v-list-tile-action>
            </v-list-tile>
            
            <v-divider :key="beer.id"></v-divider>
          </template>

          <v-list-tile>
            <v-list-tile-content></v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-sub-title>(10+ items 10% de Desconto)</v-list-tile-sub-title>
              <v-list-tile-sub-title>Quantidade: {{ beersQuantity }}</v-list-tile-sub-title>

              <v-list-tile-sub-title v-if="beersQuantity < 10">
                  Total: {{ formatTotal(beersTotal) }}
              </v-list-tile-sub-title>
              <v-list-tile-sub-title v-else>
                  Total:
                  <span class="original_price">
                    {{ formatTotal(beersTotal) }}
                  </span>
                  <span class="red--text">
                    {{ formatTotal((beersTotal) - beersTotal * 0.1) }} (10%)
                  </span>
              </v-list-tile-sub-title>
            </v-list-tile-action>
          </v-list-tile>

           <v-list-tile avatar ripple>
            <v-list-tile-content></v-list-tile-content>
            <v-btn color="light-green">Finalzar Compra</v-btn>
            <v-btn color="primary" @click.native="$router.push('/')">Voltar</v-btn>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import store from "@/store/cart.js";
export default {
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    beers() {
      return store.state.beers;
    },
    beersTotal() {
      return store.state.beerTotal;
    },
    beersQuantity() {
        return store.state.beerQuant;
    }
  },
  methods: {
    incrementoBeer(beer) {
      store.commit("incrementoBeer", beer);
    },
    delincrementoBeer(beer) {
      store.commit("delincrementoBeer", beer);
    },
    deleteBeer(beer) {
      store.commit("deleteBeer", beer);
    },
    formatTotal(value) {
      var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
      });
      return formatter.format(value);
    }
  }
};
</script>

<style>
.original_price {
    text-decoration: line-through;
}
</style>



