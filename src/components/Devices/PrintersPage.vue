<template>
  <it-dialog v-if="modalVisible && dialogVisible === 1" @closePopup="closePopup">
    <dialog-new-printer @update="fetchPrinters" @show='dialogVisible = 0'></dialog-new-printer>
  </it-dialog>
  <it-dialog v-if="modalVisible && dialogVisible === 2" @closePopup="closePopup">
    <dialog-delete-printer @update="fetchPrinters" :features="features" @show='dialogVisible = 0'></dialog-delete-printer>
  </it-dialog>
  <it-dialog v-if="modalVisible && dialogVisible === 3" @closePopup="closePopup">
    <dialog-view-printer @update="fetchPrinters" v-bind:printer_id="currentPrinter" @show='dialogVisible = 0'></dialog-view-printer>
  </it-dialog>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Принтеры и МФУ</li>
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
          <div class="d-flex justify-content-start align-items-center mb-4" style="margin-bottom: 1rem!important;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 8C20.66 8 22 9.34 22 11V17H18V21H6V17H2V11C2 9.34 3.34 8 5 8H6V3H18V8H19M8 5V8H16V5H8M16 19V15H8V19H16M18 15H20V11C20 10.45 19.55 10 19 10H5C4.45 10 4 10.45 4 11V15H6V13H18V15M19 11.5C19 12.05 18.55 12.5 18 12.5C17.45 12.5 17 12.05 17 11.5C17 10.95 17.45 10.5 18 10.5C18.55 10.5 19 10.95 19 11.5Z" />
            </svg>
            <h6 class="card-title mb-0" style="margin-left: 5px;margin-top: 2px;">Принтеры и МФУ</h6>
          </div>

          <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
            <table class="table table-hover mb-0">
              <thead>
              <tr >
                <th class="pt-0" style="text-align: center;color: black">#</th>
                <th class="pt-0" style="text-transform: initial;color: black" data-type="text">Наименование</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Сетевое имя</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">IP адрес</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Серийный номер</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Инвентарный номер</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Организация</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Ответственный</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Тип подключения</th>
                <th class="pt-0" style="padding: 0;vertical-align: baseline;text-transform: initial;color: black">Статус</th>
              </tr>
              </thead>
              <tbody v-if="!isPrintersLoading">
              <tr v-for="(printer, index) in filteredPrinter" :key="`employee-${index}`" :printer="printer" style="border-style: hidden;">
                <td style="width: 0px;">
                  <input
                      type="checkbox"
                      class="form-check-input"
                      :value="printer.id"
                      v-model="features"
                  >
                </td>
                <td @click="PrinterDialog(printer.id)" class="product-name" style="font-weight: 600;cursor: pointer;width: 0;">{{printer.name}}</td>
                <td class="tnt"  value="1" style="padding-left: 0;">{{printer.webname}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;">{{printer.ip}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;">{{printer.sn}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;">{{printer.inv}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;">{{printer.organization}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;">{{printer.owner}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;">{{printer.type_connection}}</td>
                <td class="tnt"  value="0" style="padding-left: 0;"><span class="badge bg-success">{{printer.status}}</span></td>
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
import DialogViewPrinter from "@/components/UI/DialogViewPrinter";
export default {
  components: {DialogViewPrinter},

  data: function () {
    return {
      printers: [],
      searchQuery:'',
      isPrintersLoading: false,
      dialogVisible: 0,
      features: [],
      currentPrinter: [],
      modalVisible: false,
    }
  },
  computed: {
    filteredPrinter() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.printers
      }
      return this.printers.filter((company) => {
        return Object.values(company).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  name: "PrintersPage",
  methods: {
    closePopup(){
      this.modalVisible = false
      this.dialogVisible = 0
    },
    PrinterDialog(value){
      this.currentPrinter = value
      this.dialogVisible = 3
      this.modalVisible = true
    },
    deleteDialog(){
      this.dialogVisible = 2
      this.modalVisible = true
    },
    showDialog(){
      this.dialogVisible = 1
      this.modalVisible = true
    },
    async fetchPrinters() {
      try {
        this.isPrintersLoading = true
        const response = await axios.post("http://ittng.ru/server/get_printers.php")
        this.printers = response.data
      } catch (e) {
        alert("Ошибка загрузки")
      } finally {
        this.isPrintersLoading = false
        this.features = []
      }
    },

  },
  async mounted() {
    this.fetchPrinters()
  }
}
</script>

<style scoped>

</style>