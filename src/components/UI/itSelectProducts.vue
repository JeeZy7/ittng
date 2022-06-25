<template>
  <div class="ui icon search input" @click.stop style="width: 100%;">
    <input
        @click="isVisible = !isVisible"
        v-model="searchQuery"
        type="text"
        placeholder="Выберите товары из списка или введите наименование товара"
        style="width: 100%;
    padding-left: 0.8rem !important;
    padding-top: 0.469rem;
    padding-bottom: 0.469rem;
    display: block;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border: 1px solid rgb(233, 236, 239);
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;"
    >
    <i class="icon" style="display: flex;align-items: center;justify-content: center;">
      <svg style="width:20px;height:20px" viewBox="0 0 24 24">
        <path fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
      </svg>
    </i>

  </div>

  <div style="
    position: absolute;
    z-index: 2;
    width: calc(100% - 4rem);
    background-color: white;
    margin-top: 5px;
    border: 1px solid rgb(233, 236, 239);
    max-height: 200px;
    overflow: auto;
    border-radius: 0.25rem;" v-if="isVisible">
    <div class="item" v-for="(item, index) in filteredProducts" :key="`product-${index}`"
         style="display: flex; align-items: center;height: 50px;">
      <input
          type="checkbox"
          class="form-check-input"
          style="margin-right: 1rem;margin-left: 1rem;"
          :value="item.product_id"
          v-model="features"
          v-on:change="$emit('selectedProducts', item, $event.target.checked)"
      >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "itSelectProducts",
  components: {},

  data() {
    return {

      searchQuery: '',
      isVisible: false,
      // selectedItem: null,
      // isVisible: false,
      ProductsArray: [],
      result: [],
      // new_products: [
      //   {id: 144, name: "Жесткий диск Samsung 950 EVO", count: 0},
      //   {id: 143, name: "Жесткий диск Samsung 950 EVO", count: 0},
      //   {id: 145, name: "Жесткий диск Samsung 950 EVO", count: 0},
      // ],
      features: [],
    }
  },
  props: {
    product_id: {
      type: Array,
      required: true
    },
    act_products: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.ProductsArray
      }
      return this.ProductsArray.filter((product) => {
        return Object.values(product).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    },

  },
  watch: {
    'act_products': function () {
      this.checkItems()
    }
  },
  methods: {
    // addProduct(item){
    //   this.features.push(item)
    // },
    checkedProducts() {
      console.log(this.features)
      const products = this.ProductsArray.filter(i => {
        return this.features.includes(i.product_id)
      })
      console.log(products)
      return products
    },
    checkItems() {
      this.features = this.act_products.map(i => i.product_id)
      console.log(this.features)
    },

    getProducts() {
      axios
          .post("http://ittng.ru/server/get_products.php")
          .then(response => {
            this.ProductsArray = response.data
          })
          .catch(function (e) {
            this.error = e;
          });

    },

  },

  async mounted() {
    this.getProducts()
    this.checkItems()
  },
  // updated() {
  //   console.log(this.filteredProducts.filter( i => { this.features.includes(i.product_id)  }))
  //   // this.$emit('selectedProducts', this.filteredProducts.filter( i => { this.features.includes(i.product_id)  }))
  // }
}
</script>

<style scoped>
.dd-input {
  float: right;
  text-align: center;
  margin-left: 1rem;
  margin-right: 1rem;
  display: block;
  width: 50px;
  padding: 0.25rem 0.6rem;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e9ecef;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>