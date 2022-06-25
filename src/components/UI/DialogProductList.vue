<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Список товаров</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <input v-model="searchQuery" type="text" placeholder="Поиск..." style="margin-bottom: 1rem;
    margin-right: 1rem;
    margin-left: 0.7rem;
    display: block;
    width: 300px;
    padding: 0.25rem 0.6rem;
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #e9ecef;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;">
      <div class="container-fluid mt-4 d-flex justify-content-center w-100">

        <div class="table-responsive w-100" style="height: 461px">

          <table class="table table-bordered" id="table">
            <thead>
            <tr>
              <th style="width: 42px;text-align: center;">#</th>
              <th>Наименование товара</th>
              <th style="width:200px;text-align: center;">Количество в накладной</th>

            </tr>
            </thead>
            <tbody >
            <tr v-for="(item, index) in filteredProducts" :key="item.id">
              <td style="width: 42px;text-align: center;vertical-align: middle;">{{ index+1 }}</td>
              <td class="text-start" style="vertical-align: middle;">{{ item.type }} {{ item.company }} {{ item.name }}</td>
              <td>
                <input
                    style="margin-left: 25%;"
                    :data-title="item.type+' '+item.company+' '+item.name"
                    :data-value="item.id"
                    type="number"
                    class="dd-input">
                <span style="font-size: 13px;">шт.</span>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
  <div class="container-fluid w-100" style="padding: 0rem 2rem 2rem; display: flex; justify-content: flex-end;margin-top: 1rem;">
      <button @click="saveProducts" type="button" class="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
        Добавить в поставку
      </button>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "DialogProductList",
  props: {

  },
  data(){
    return {
      searchQuery: "",
      ProductsArray: [],
      count: 0,
      features: [],
      array: []
    }
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.ProductsArray
      }
      return this.ProductsArray.filter((organization) => {
        return Object.values(organization).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {
    hideDialog(){
      this.$emit('show', false)
    },
    saveProducts(){
      this.features = []
      var rows = document.getElementById('table').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length;
      for(let i = 0; i < rows; i++){
        let elem = document.getElementById('table').getElementsByTagName('tbody')[0].getElementsByTagName('tr').item(i).children.item(2).children.item(0)
        // let elem2 = document.getElementById('table').getElementsByTagName('tbody')[0].getElementsByTagName('tr').item(i).children.item(3).children.item(0)
        if(elem.value != ""){
          this.features.push({'id': elem.getAttribute("data-value"), 'name': elem.getAttribute("data-title"), 'count': elem.value, 'count2': elem.value})
        }
      }
      console.log(this.features)
      this.$emit('selectedProducts', this.features)
      this.$emit('show', false)


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

  },
  async mounted() {
    this.getProducts()

  }

}
</script>

<style scoped>
  td{
    background: white;
  }
  .dd-input{
    float: left;
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