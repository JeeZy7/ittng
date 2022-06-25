<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item active" aria-current="page">Главная</li>

    </ol>
  </nav>
  <div class="row">
    <div class="col-xl-8 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Выдача расходных материалов за квартал</h6>
          <div id="apexBar" style="min-height: 320px;">
            <div id="apexchartsmbx2eep" class="apexcharts-canvas apexchartsmbx2eep apexcharts-theme-light" style="height: 320px;">
              <it-products-count v-bind:products="productsData" style="height: 320px;"></it-products-count>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-4 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Принтеры</h6>
          <div id="apexDonut" style="min-height: 301.7px;">
            <div id="apexchartsosbzbzrt" class="apexcharts-canvas apexchartsosbzbzrt apexcharts-theme-light" style="height: 320px;">
              <it-printers-count v-bind:printers="printersData" style="height: 320px;"></it-printers-count>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xl-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Выдача расходных материалов по организациям за месяц</h6>
          <div style="min-height: 320px;">
            <div class="apexcharts-canvas apexchartsmbx2eep apexcharts-theme-light" style="height: 320px;">
              <it-organization-count v-bind:organizations="organizationsData" style="height: 320px;"></it-organization-count>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "StatisticPage",
  components: {},
  data(){
    return{
      productsData: [],
      printersData: [],
      organizationsData: [],
    }
  },
  methods:{
    getProducts(){
      axios
          .post("http://ittng.ru/server/get_printers_chart.php")
          .then(response => {
            this.productsData = response.data;
          })
          .catch(function(e){
            this.error = e;
          });

    },
    getPrinters(){
      axios
          .post("http://ittng.ru/server/get_products_chart.php")
          .then(response => {
            this.printersData = response.data;
          })
          .catch(function(e){
            this.error = e;
          });

    },
    getOrganizations(){
      axios
          .post("http://ittng.ru/server/get_companies_chart.php")
          .then(response => {
            this.organizationsData = response.data;
          })
          .catch(function(e){
            this.error = e;
          });

    },



  },
  async mounted() {
    this.getProducts(),
    this.getPrinters(),
    this.getOrganizations()
  },

}
</script>

<style scoped>

</style>