<template>
  <it-dialog v-if="modalVisible && dialogVisible === 1" @closePopup="closePopup">
    <dialog-new-product @update="fetchProducts" @show='dialogVisible = 0'></dialog-new-product>
  </it-dialog>
  <it-dialog v-if="modalVisible && dialogVisible === 2" @closePopup="closePopup">
    <dialog-delete-products @update="fetchProducts" :features="features" @show='dialogVisible = 0'></dialog-delete-products>
  </it-dialog>

  <it-dialog v-if="modalVisible && dialogVisible === 3" @closePopup="closePopup">
    <dialog-view-product @update="fetchProducts" v-bind:product_id="currentProduct" @show='dialogVisible = 0'></dialog-view-product>
  </it-dialog>
  <it-dialog v-if="modalVisible && dialogVisible === 4" @closePopup="closePopup">
    <dialog-transfer-products @update="fetchProducts" :features="features" @show='dialogVisible = 0'></dialog-transfer-products>
  </it-dialog>
  <it-filter-dialog v-model:show="filterVisible">
  </it-filter-dialog>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Склады</li>
    </ol>
  </nav>
  <div class="row" style="margin-bottom: 1rem;">
    <div class="col-lg-12 col-xl-12 stretch-card" style="width: max-content;">
      <div class="card">
        <div class="card-body" style="padding: 1rem;display: flex;">
          <it-button @click="showDialog">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path id="add_product_modal" fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
            </svg>
          </it-button>
<!--          <it-button v-if="features.length > 0" @click="transferDialog">-->
<!--            <svg style="width:24px;height:24px" viewBox="0 0 24 24">-->
<!--              <path fill="currentColor" d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />-->
<!--            </svg>-->
<!--          </it-button>-->
<!--          <it-button class="btn-inverse-secondary" v-else>-->
<!--            <svg style="width:24px;height:24px" viewBox="0 0 24 24">-->
<!--              <path fill="currentColor" d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z" />-->
<!--            </svg>-->
<!--          </it-button>-->
<!--          <it-button v-if="features.length > 0" @click="deleteDialog">-->
<!--            <svg style="width:24px;height:24px" viewBox="0 0 24 24">-->
<!--              <path data-delete-product="" fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path>-->
<!--            </svg>-->
<!--          </it-button>-->
<!--          <it-button class="btn-inverse-secondary" v-else>-->
<!--            <svg style="width:24px;height:24px" viewBox="0 0 24 24">-->
<!--              <path data-delete-product="" fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path>-->
<!--            </svg>-->
<!--          </it-button>-->


          <it-button @click="tableShow = !tableShow" style="margin-right: 1rem;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24" v-if="tableShow">
              <path fill="currentColor" d="M19 14H21V20H3V14H5V18H19V14M3 4V10H5V6H19V10H21V4H3M11 11V13H8V15L5 12L8 9V11H11M16 11V9L19 12L16 15V13H13V11H16Z"></path>
            </svg>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24" data-sklads-action="" v-else>
              <path data-sklads-action="" fill="currentColor" d="M5,10H3V4H11V6H5V10M19,18H13V20H21V14H19V18M5,18V14H3V20H11V18H5M21,4H13V6H19V10H21V4M8,13V15L11,12L8,9V11H3V13H8M16,11V9L13,12L16,15V13H21V11H16Z"></path>
            </svg>
          </it-button>
          <it-button style="margin-right: 1rem;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
            </svg>
          </it-button>

          <div style="display: flex;align-items: center;color: #e4e7ec;margin-left: 0px!important;">
            <svg style="width:20px;height:20px;position: absolute;margin-left: 5px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
            <input type="text" style="margin-left: 0rem;border-radius: 4px;border: 2px solid #e4e7ec;padding: 2px;width: 200px;padding-left: 30px!important;"
                   placeholder="Поиск в таблице..."
                   v-model="searchQuery"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">

    <div class="col-lg-12 col-xl-12 stretch-card">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-start align-items-center mb-4" style="margin-bottom: 1rem!important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <h6 class="card-title mb-0" style="margin-left: 5px;margin-top: 2px;">Склады</h6>
          </div>
          <div class="table-responsive" id="myTable" v-if="tableShow" style="margin-top: 0rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;">
            <table class="table table-hover mb-0">
              <thead>
              <tr>
                <th class="pt-0" style="text-align: center;color: black">#</th>
                <th class="pt-0" style="text-transform: initial;color: black" data-type="text">Наименование</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ТТНГ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">БГ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ПБ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ТНТ</th>
              </tr>
              </thead>
              <tbody v-if="!isPostsLoading" >
                <tr v-for="(product, index) in filteredProduct" :key="`employee-${index}`" :product="product" style="border-style: hidden;">
                  <td style="width: 0px;">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        :value="product"
                        v-model="features"
                    >
                  </td>
                  <td @click="ProductDialog(product.product_id)" class="product-name" style="font-weight: 600;cursor: pointer;width: 0;padding-left: 0;">{{product.product_name}}</td>
                  <td class="tnt" style="padding-left: 0;text-align: center" value="1">{{product.abk_all}}</td>
                  <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.ttnt_all}}</td>
                  <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.bg_all}}</td>
                  <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.pb_all}}</td>
                  <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.tnt_all}}</td>
                </tr>
              </tbody>
              <table-preloader v-else></table-preloader>
            </table>
          </div>

          <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;" v-else>
            <table class="table table-hover mb-0">
              <thead>
              <tr>
                <th class="pt-0" style="text-align: center;color: black">#</th>
                <th class="pt-0" style="text-transform: initial;color: black" data-type="text">Наименование</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ТНГ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ОПС</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ОТЭКО</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ОТ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ЗЕВС</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-БАЯРД</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ЦАСФ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">АБК-ИРИДА</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ТТНГ-ТНГ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ТТНГ-ОПС</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ТТНГ-ОТЭКО</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">БГ-ТНГ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">БГ-ОПС</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">БГ-ОТЭКО</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">БГ-ЗЕВС</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">БГ-БАЯРД</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ПБ-ТНГ</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ПБ-ОТЭКО</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;text-align: center;color: black">ТНТ</th>

              </tr>
              </thead>
              <tbody v-if="!isPostsLoading" >
              <tr v-for="(product, index) in filteredProduct" :key="`employee-${index}`" :product="product" style="border-style: hidden;">
                <td style="width: 0px;">
                  <input
                      type="checkbox"
                      class="form-check-input"
                      :value="product.id"
                      v-model="features"
                  >
                </td>
                <td @click="ProductDialog(product.product_id)" class="product-name" style="font-weight: 600;cursor: pointer;width: 0;padding-left: 0;">{{product.product_name}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="1">{{product.abk_tng}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_ops}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_o}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_ot}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_zeus}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_bayard}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_tsasf}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.abk_irida}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.ttng_tng}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.ttng_ops}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.ttng_o}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.bg_tng}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.bg_ops}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.bg_o}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.bg_zeus}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.bg_bayard}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.pb_tng}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.pb_o}}</td>
                <td class="tnt" style="padding-left: 0;text-align: center" value="0">{{product.tnt}}</td>
              </tr>
              </tbody>
              <h5 v-else>Идет загрузка...</h5>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Product from "@/components/Product";
import axios from "axios";
export default {
  data: function () {
    return {
      posts: [],
      searchQuery:'',
      isPostsLoading: false,
      dialogVisible: 0,
      modalVisible: false,
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
  name: "ProductsPage",
  components: {
    // Product,
  },
  methods: {
    closePopup(){
      this.modalVisible = false
      this.dialogVisible = 0
    },
    showFilterDialog(){
      this.filterShow = true

    },
    transferDialog(){
      this.dialogVisible = 4
    },
    ProductDialog(value){
      this.currentProduct = value
      this.dialogVisible = 3
      this.modalVisible = true
    },
    deleteDialog(){
      this.dialogVisible = 2
    },
    async fetchProducts() {
      try {
        this.isPostsLoading = true
        const response = await axios.post("http://ittng.ru/server/get_inventory.php")
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
      this.modalVisible = true
    }

  },
  async mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>

</style>