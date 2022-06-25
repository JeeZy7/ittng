<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">История операций</li>
    </ol>
  </nav>
  <div class="row" style="margin-bottom: 1rem;">
    <div class="col-lg-12 col-xl-12 stretch-card" style="width: max-content;">
      <div class="card">
        <div class="card-body" style="padding: 1rem;">

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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <h6 class="card-title mb-0" style="margin-left: 5px;margin-top: 2px;">История</h6>
          </div>
          <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
            <table class="table table-hover mb-0">
              <thead>
              <tr>
                <th class="pt-0" style="text-align: center;color: black">#</th>
                <th class="pt-0" style="text-transform: initial;color: black">Дата операции</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Тип операции</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Комментарий</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Наименование устройства</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Инв. номер устройства</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Организация</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Ответственный</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Склад</th>
              </tr>
              </thead>
              <tbody v-if="!isHistoryLoading" >
              <tr v-for="(row, index) in filteredHistory" :key="row.id" :row="row" style="border-style: hidden;">
                <td style="width: 0px;">
<!--                  <input-->
<!--                      type="checkbox"-->
<!--                      class="form-check-input"-->
<!--                      :value="row.id"-->
<!--                      v-model="features"-->
<!--                  >-->
                  {{index+1}}
                </td>
                <td class="product-name" style="font-weight: 600;cursor: pointer;width: 0;padding-left: 0;">{{row.date}}</td>
                <td class="tnt" style="padding-left: 0;"><span class="badge bg-success">{{row.action}}</span></td>
                <td class="tnt" style="padding-left: 0;">{{row.comment}}</td>
                <td class="tnt" style="padding-left: 0;">{{row.product_id}}</td>
                <td class="tnt" style="padding-left: 0;">{{row.printer_name}}</td>
                <td class="tnt" style="padding-left: 0;">{{row.printer_inv}}</td>
                <td class="tnt" style="padding-left: 0;">{{row.printer_organization}}</td>
                <td class="tnt" style="padding-left: 0;">{{row.owner}}</td>
                <td class="tnt" style="padding-left: 0;">{{row.sklad}}</td>
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
  name: "HistoryPage",
  data: function () {
    return {
      history: [],
      searchQuery:'',
      isHistoryLoading: false,
      dialogVisible: 0,
      features: [],
      currentProduct: []
    }
  },
  computed: {
    filteredHistory() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.history
      }
      return this.history.filter((company) => {
        return Object.values(company).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {
    async fetchHistory() {
      try {
        this.isPostsLoading = true
        const response = await axios.post("http://ittng.ru/server/get_history.php")
        this.history = response.data
      } catch (e) {
        alert("Ошибка загрузки")
      } finally {
        this.isPostsLoading = false
        this.features = []
      }
    },

  },
  async mounted() {
    this.fetchHistory()
  }
}
</script>

<style scoped>

</style>