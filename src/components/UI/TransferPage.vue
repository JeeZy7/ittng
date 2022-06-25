<template>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 3">
    <dialog-view-transfer @update="fetchProducts" v-bind:transfer_id="currentProduct"></dialog-view-transfer>
  </it-dialog>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Перемещения</li>
    </ol>
  </nav>
  <div class="row">

    <div class="col-lg-12 col-xl-12 stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-start align-items-center mb-4" style="margin-bottom: 1rem!important;">
            <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;"><path fill="currentColor" d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z"></path></svg>
            <h6 class="card-title mb-0" style="margin-left: 5px;margin-top: 2px;">Перемещения</h6>
          </div>
          <div class="table-responsive" id="myTable" v-if="tableShow" style="margin-top: 0rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;">
            <table class="table table-hover mb-0">
              <thead>
              <tr>
                <th class="pt-0" style="text-align: center;color: black">#</th>
                <th class="pt-0" style="text-transform: initial;color: black" data-type="text">Дата</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">Склад 1</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">Склад 2</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">Количество позиций</th>
              </tr>
              </thead>
              <tbody v-if="!isPostsLoading" >
              <tr v-for="(product, index) in filteredProduct" :key="`employee-${index}`" :product="product" style="border-style: hidden;">
                <td style="width: 0px;">
<!--                  <input-->
<!--                      type="checkbox"-->
<!--                      class="form-check-input"-->
<!--                      :value="product"-->
<!--                      v-model="features"-->
<!--                  >-->
                  {{index+1}}
                </td>
                <td @click="ProductDialog(product.id)" class="product-name" style="font-weight: 600;cursor: pointer;width: 0;padding-left: 0;">{{product.date}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="1">{{product.first_sklad}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.second_sklad}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0"><span class="badge bg-light text-dark">{{product.count}} позиций</span></td>
              </tr>
              </tbody>
              <table-preloader v-else></table-preloader>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TransferPage",
  components: {},

  data: function () {
    return {
      posts: [],
      searchQuery:'',
      isPostsLoading: false,
      dialogVisible: 0,
      features: [],
      currentProduct: [],
      tableShow: true,
      filterVisible: false,
    }
  },
  computed: {
    filteredProduct() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.posts
      }
      return this.posts.filter((company) => {
        return Object.values(company).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {
    showFilterDialog(){
      this.filterShow = true

    },
    transferDialog(){
      this.dialogVisible = 4
    },
    ProductDialog(value){
      this.currentProduct = value
      this.dialogVisible = 3
    },
    deleteDialog(){
      this.dialogVisible = 2
    },
    async fetchProducts() {
      try {
        this.isPostsLoading = true
        const response = await axios.post("http://ittng.ru/server/get_transfer.php")
        this.posts = response.data
      } catch (e) {
        alert("Ошибка загрузки")
      } finally {
        this.isPostsLoading = false
        this.features = []
      }
    },
    showDialog(){
      this.dialogVisible = 1
    }

  },
  async mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>

</style>