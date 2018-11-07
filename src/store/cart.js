import Vue from 'vue'
import Vuex from 'vuex'

import {
  findIndex
} from 'lodash-es'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    beers: [],
    beerTotal: 0,
    beerQuant: 0
  },
  mutations: {
    addToCart(state, beer) {

      let index = findIndex(state.beers, (o) => o.id == beer.id)

      if (index === -1) {
        state.beers.push({
          id: beer.id,
          name: beer.name,
          price: 2.5,
          quantity: 0,
          image_url: beer.image_url
        })
      } 

    },
    incrementoBeer(state, beer){
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      state.beerTotal += state.beers[index].price;
      state.beers[index].quantity++;
    state.beerQuant++;
    
    },
    delincrementoBeer(state, beer){
      let index = findIndex(state.beers, (o) => o.id == beer.id)
      state.beerTotal -= state.beers[index].price;

      state.beers[index].quantity--;
      state.beerQuant--;
     
      if(state.beers[index].quantity ==0){
      state.beers.splice(state.beers.indexOf(beer),1);
        }

      },
      deleteBeer(state, beer) {
        let index = findIndex(state.beers, (o) => o.id == beer.id)
        state.beerTotal -= state.beers[index].price * state.beers[index].quantity;
        state.beerQuant -= state.beers[index].quantity;


        state.beers.splice(state.beers.indexOf(beer),1);
      }
    },
  actions: {

  }
})
