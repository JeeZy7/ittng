<template>
  <div @click="isVisible = !isVisible" class="ui floating dropdown labeled icon button" style="width: 100%;padding-left: 0.8rem !important;padding-top: .469rem;padding-bottom: .469rem;display: block;font-size: 0.875rem;font-weight: 400;line-height: 1.5;color: rgb(0, 0, 0);background-color: rgb(255, 255, 255);background-clip: padding-box;border: 1px solid rgb(233, 236, 239);appearance: none;border-radius: 0.25rem;transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;">
    <span v-if="selectedItem" class="text">{{ selectedItem.type }} {{ selectedItem.company }} {{ selectedItem.name }}
      <svg v-if="!isVisible" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;color: #c0c2c5;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;color: #c0c2c5;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <span v-else class="text">Выберите товары из списка
      <svg v-if="!isVisible" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;color: #c0c2c5;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;color: #c0c2c5;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <div class="menu" v-if="isVisible" style="display: block" @click.stop>
      <div class="ui icon search input" @click.stop>
<!--        <i class="icon" style="display: flex;align-items: center;justify-content: center;">-->
<!--          <svg style="width:24px;height:24px" viewBox="0 0 24 24">-->
<!--            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />-->
<!--          </svg>-->
<!--        </i>-->
        <input v-model="searchQuery" type="text" placeholder="Поиск..." style="border: 1px solid #e9ecef;">
        <it-button @click="saveProducts" style="margin-left: 1rem;margin-right: 0rem;">
          <svg style="width:20px;height:20px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
          </svg>
        </it-button>
      </div>
      <div class="scrolling menu" style="display: block">
        <div class="item" style="display: flex; align-items: center;height: 50px;" v-for="(product, index) in filteredProducts" :key="`product-${index}`">
<!--          <input-->
<!--              type="checkbox"-->
<!--              class="form-check-input"-->
<!--              style="margin-right: 1rem;"-->
<!--              :value="product.id"-->
<!--              v-model="features"-->
<!--          >-->
          {{ product.type }} {{ product.company }} {{ product.name }}
          <input type="number" class="dd-input"
                 @input="addProduct($event.target.value, product.id)"
          ><span style="font-size: 13px;">шт.</span>
        </div>
        <div v-if="filteredProducts.length === 0" class="item">
          Не найдено совпадений
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "itDdProducts",
  components: {},

  data(){
    return {
      searchQuery: "",
      selectedItem: null,
      isVisible: false,
      ProductsArray: [],
      features: [],
    }
  },
  props: {
    product_id : {
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
    }
  },
  methods: {
    addProduct(data, id){
      this.features.push({'product_id': id, 'count': data})
      const resArr = [];
      this.features.filter(function(item){
        const i = resArr.findIndex(x => (x.product_id == item.product_id));
        if(i <= -1){
          resArr.push(item);
        }
        return null;
      });
      console.log(resArr)
    },
    saveProducts(){
      this.isVisible = false
    },
    getProducts(){
      axios
          .post("http://ittng.ru/server/get_products.php")
          .then(response => {
            this.ProductsArray = response.data
          })
          .catch(function(e){
            this.error = e;
          });

    },
    selectItem(product) {
      this.selectedItem = product
      this.$emit('product_id', this.selectedItem.id)
      this.$emit('product', this.selectedItem)
      const product_name = this.selectedItem.type + this.selectedItem.company + this.selectedItem.name
      this.$emit('product_name', product_name)
    }
  },
  async mounted() {
    this.getProducts()
  },
}
</script>

<style scoped>
  .dd-input{
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
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
</style>