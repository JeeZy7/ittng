<template>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 1">
    <dialog-new-computer></dialog-new-computer>
  </it-dialog>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 2">
    <dialog-delete-printer @update="fetchPrinters" :features="features"></dialog-delete-printer>
  </it-dialog>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">ПК и комплектующие</li>
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
          <it-button v-if="features.length > 0" @click="deleteDialog">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path data-delete-product="" fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path>
            </svg>
          </it-button>
          <it-button class="btn-inverse-secondary" v-else>
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path data-delete-product="" fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path>
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
          <div class="d-flex justify-content-start align-items-center mb-4" style="margin-bottom: 1.5rem!important;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z" />
            </svg>
            <h6 class="card-title mb-0" style="margin-left: 5px;margin-top: 2px;">ПК и комплектующие</h6>

          </div>
          <div class="table-responsive" style="margin-top: 1rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
            <table class="table table-hover mb-0">
              <thead>
              <tr>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;">#</th>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;" data-type="text">Модель устройства</th>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;">Серийный номер</th>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;">Инвентарный номер</th>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;">Организация</th>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;">Ответственный</th>
                <th class="pt-0" style="text-transform: initial; color: black;text-align: center;">Статус</th>
              </tr>
              </thead>
              <tbody v-if="!isPostsLoading">
                <tr v-for="(computer, index) in posts" :key="`employee-${index}`" :computer="computer" style="border-style: hidden;">
                  <td style="width: 0px;">
                    <input
                        type="checkbox"
                        class="form-check-input"
                        :value="computer.id"
                        v-model="features"
                    >
                  </td>
                  <td class="product-name" style="font-weight: 600;cursor: pointer;width: 0;">{{computer.name}}</td>
                  <td class="pt-0"  value="0" style="vertical-align: middle;padding: 0;text-align: center;">{{computer.sn}}</td>
                  <td class="pt-0"  value="0" style="vertical-align: middle;padding: 0;text-align: center;">{{computer.inv}}</td>
                  <td class="pt-0"  value="0" style="vertical-align: middle;padding: 0;text-align: center;">{{computer.organization}}</td>
                  <td class="pt-0"  value="0" style="vertical-align: middle;padding: 0;text-align: center;">{{computer.owner}}</td>
                  <td class="pt-0"  value="0" style="vertical-align: middle;padding: 0;text-align: center;"><span class="badge bg-success">{{computer.status}}</span></td>
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
import axios from "axios";

export default {
  name: "ComputersPage",
  components: {},

  data: function () {
    return {
      posts: [],
      isPostsLoading: false,
      dialogVisible: 0,
      features: [],
      currentProduct: []
    }
  },
  methods: {
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
        const response = await axios.post("http://ittng.ru/server/get_computers.php")
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