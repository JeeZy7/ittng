<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Информация о закреплении</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body" v-for="printer in printer_info" :key="printer.id">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Модель устройства</label>
          <label class="form-label">Сетевое имя принтера</label>
          <it-dropdown-search-selector style="
      display: block;
      pointer-events: none;
      background-color: #e9ecef;
  " @printer_id="getPrinterId"
             :value="printer.printer_id"
             @input="new_printer_info.printer_id = $event.target.value"
             :currentPrinter="printer.printer_id"
          >
          </it-dropdown-search-selector>
          <it-input
              :value="printer.webname"
              @input="new_printer_info.webname = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите сетевое имя принтера"
          ></it-input>
        </div>

        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">IP адресс</label>
          <label class="form-label">Серийный номер</label>
          <it-input
              :value="printer.ip"
              @input="new_printer_info.ip = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите IP адресс принтера"
          ></it-input>
          <it-input
              :value="printer.sn"
              @input="new_printer_info.sn = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите cерийный номер принтера"
          ></it-input>
        </div>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Инв. номер</label>
          <label class="form-label">Организация</label>
          <it-input
              :value="printer.inv"
              @input="new_printer_info.inv = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите инвентарныый номер принтера"
          ></it-input>
          <it-dropdown-organization
              @organization_id="getOrganizationId"
              :currentOrganization="printer.organization"
          >
          </it-dropdown-organization>
        </div>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Ответственный</label>
          <label class="form-label">Пробег</label>
          <it-input
              :value="printer.owner"
              @input="new_printer_info.owner = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Укажите ответственного"
          ></it-input>
          <it-input
              :value="printer.mileare"
              @input="new_printer_info.mileare = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Укажите пробег устройства"
          ></it-input>
        </div>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Статус</label>
          <label class="form-label">Тип подключения</label>
          <select name="" style="
                                            display: block;
                                            width: 100%;
                                            padding: 0.469rem 0.8rem;
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
                                        "
                  v-bind:value="printer.status"
                  @input="new_printer_info.status = $event.target.value">
            <option value="0">Эксплуатация</option>
            <option value="1">Перемещение</option>
            <option value="2">Списан</option>
          </select>
          <select name="" style="
                                            display: block;
                                            width: 100%;
                                            padding: 0.469rem 0.8rem;
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
                                        "
                  v-bind:value="printer.connection"
                  @input="new_printer_info.connection = $event.target.value">
            <option value="0">Сетевой</option>
            <option value="1">USB</option>
          </select>
        </div>
        <div class="mb-3">
          <label @click="printerHistory" class="form-label">История операций</label>
          <svg v-if="!isVisible" style="width: 24px; height: 24px;color: #c0c2c5;">
            <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
          </svg>
          <svg v-else style="width: 24px; height: 24px;color: #c0c2c5;">
            <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
          </svg>
          <div v-if="isVisible" class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
            <table v-if="printer_history.length != 0" class="table table-hover mb-0">
              <thead>
              <tr>
                <th style="text-align: center;color: black">#</th>
                <th style="vertical-align: baseline;text-transform: initial;color: black">Дата</th>
                <th style="padding: 0px 1rem 0px 0px; vertical-align: baseline; text-transform: initial; color: black; text-align: start;">Наименование товара</th>
                <th style="padding: 0px 1rem 0px 0px; vertical-align: baseline; text-transform: initial; color: black; text-align: start;">Организация</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(product, index) in printer_history" :key="product.id" :product="product" style="border-style: hidden;">
                <td style="vertical-align: middle;text-align: center;">{{index+1}}</td>
                <td style="vertical-align: middle;">{{ product.date }}</td>
                <td style="vertical-align: middle;padding-left: 0;">{{ product.name }}</td>
                <td style="vertical-align: middle;padding-left: 0;">{{ product.organization }}</td>
              </tr>
              </tbody>
            </table>
            <div v-else style="margin-top: 1rem;">Список пуст.</div>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button  @click="updatePrinter" type="button" class="btn btn-primary">Сохранить</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogViewPrinter",
  props: {
    printer_id: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      isVisible: false,
      printer_info: [],
      new_printer_info: {},
      printer_history: [],

    }
  },
  methods: {
    hideDialog(){
      this.$emit('show', false)
    },
    printerHistory(){
      this.isVisible = !this.isVisible
    },
    getOrganizationId(data){
      this.printer_info.organization = data
      this.new_printer_info.organization = data
      console.log(this.new_printer_info.organization)
    },
    getPrinterId(data){
      this.printer_info.printer_id = data
    },
    updatePrinter() {
      axios
          .post("http://ittng.ru/server/update_printer_pinner.php", {
            printer: this.new_printer_info, printer_id: this.printer_id
          })
          .then(response => {
            this.$emit('update', response)
          })
          .catch(function (e) {
            this.error = e;
          });
    },
    fetchPrinter() {
      axios
          .post("http://ittng.ru/server/get_printer.php", {
            printer: this.printer_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.printer_info = response.data

          })
          .catch(function (e) {
            this.error = e;
          });
      axios
          .post("http://ittng.ru/server/get_printer_history.php", {
            printer: this.printer_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.printer_history = response.data

          })
          .catch(function (e) {
            this.error = e;
          });
    },

  },
  async mounted() {
    this.fetchPrinter()
  }
}
</script>

<style scoped>

</style>