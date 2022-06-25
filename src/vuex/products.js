import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex);

let products = new Vuex.Products({
    state: {
        products: []
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        }
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios("http://ittng.ru/server/get_products.php", {
                method: "GET"
            })
                .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products);
                console.log(products)
            })
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        }
    }
});
export default products;