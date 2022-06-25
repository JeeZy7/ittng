<template>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 1">
    <dialog-new-order @update="fetchOrders" @show='dialogVisible = 0'></dialog-new-order>
  </it-dialog>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 2">
    <dialog-delete-order @update="fetchOrders" :features="features" @show='dialogVisible = 0'></dialog-delete-order>
  </it-dialog>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 3">
    <dialog-view-order @update="fetchOrders" v-bind:document_id="currentDocument" @show='dialogVisible = 0'></dialog-view-order>
  </it-dialog>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Поставки</li>
    </ol>
  </nav>
  <div class="row" style="margin-bottom: 1rem;">
    <div class="col-lg-12 col-xl-12 stretch-card" style="width: max-content;">
      <div class="card">
        <div class="card-body" style="padding: 1rem;display: flex">
          <it-button @click="showDialog">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path id="add_product_modal" fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
            </svg>
          </it-button>
          <it-button v-if="features.length > 0" @click="deleteOrder" style="margin-right: 1rem;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path data-delete-product="" fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"></path>
            </svg>
          </it-button>
          <it-button class="btn-inverse-secondary" v-else style="margin-right: 1rem;">
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
          <div class="d-flex justify-content-start align-items-center mb-4" style="margin-bottom: 1rem!important;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <h6 class="card-title mb-0" style="margin-left: 5px;margin-top: 2px;">Поставки</h6>
          </div>

          <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
            <table class="table table-hover mb-0">
              <thead>
              <tr>
                <th class="pt-0" style="text-align: center;color: black">#</th>
                <th class="pt-0" style="text-transform: initial;color: black" data-type="text">Номер счета</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Статус</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Дата поставки</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Получатель</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Поставщик</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black"></th>
              </tr>
              </thead>
              <tbody v-if="!isOrdersLoading">
              <tr v-for="document in filteredDocuments" :key="document.id" :document="document" style="border-style: hidden;cursor: pointer;" >
                <td style="width: 0px;">
                  <input
                      type="checkbox"
                      class="form-check-input"
                      :value="document.id"
                      v-model="features"
                  >
                </td>
                <td @click="OrderDialog(document.id)" class="product-name" style="font-weight: 600;cursor: pointer;width: 0;padding-right: 10rem;">{{document.doc_index}}</td>
                <td style="padding-left: 0;">
                  <span v-if="document.status === 1" class="badge bg-light text-dark">Сформирован</span>
                  <span v-if="document.status === 2" class="badge bg-success" style="background-color: #59e55f!important;color: black;">Проверен</span>
                  <span v-if="document.status === 0" class="badge bg-light text-dark">Формируемый</span>
                </td>
                <td style="padding-left: 0;">{{document.date}}</td>
                <td style="padding-left: 0;">{{document.company}}</td>
                <td style="padding-left: 0;">{{document.provider}}</td>
                <td style="padding-left: 0px;">
                  <svg style="width:24px;height:24px;float: right;" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z" />
                  </svg>
                </td>
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
  name: "OrdersPage",
  components: {},

  data: function () {
    return {
      documents: [],
      searchQuery:'',
      isOrdersLoading: false,
      dialogVisible: 0,
      features: [],
      currentDocument: []
    }
  },
  computed: {
    filteredDocuments() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.documents
      }
      return this.documents.filter((company) => {
        return Object.values(company).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {
    OrderDialog(value){
      this.currentDocument = value
      this.dialogVisible = 3
    },
    deleteOrder(){
      this.dialogVisible = 2
    },
    showDialog(){
      this.dialogVisible = 1
    },
    async fetchOrders() {
      try {
        this.isOrdersLoading = true
        const response = await axios.post("http://ittng.ru/server/get_documents.php")
        this.documents = response.data
      } catch (e) {
        alert("Ошибка загрузки")
      } finally {
        this.isOrdersLoading = false
        this.features = []
      }
    },

  },
  async mounted() {
    this.fetchOrders()
  }
}
</script>

<style scoped>

</style>