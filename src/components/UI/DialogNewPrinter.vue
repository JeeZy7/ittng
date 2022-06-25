<template>
  <div class="modal-header">
    <h5 class="modal-title" >
      Новое закрепление</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3">
          <label class="form-label">Модель устройства</label>
          <it-dropdown-search-selector style="
    display: block;
" @printer_id="getPrinterId"></it-dropdown-search-selector>
        </div>
        <div class="mb-3">
          <label class="form-label">Сетевое имя принтера</label>
          <it-input
              v-bind:value="block.printer_webname"
              @input="block.printer_webname = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите сетевое имя принтера"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">IP адресс</label>
          <it-input
              v-bind:value="block.printer_ip"
              @input="block.printer_ip = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите IP адресс принтера"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Серийный номер</label>
          <it-input
              v-bind:value="block.printer_sn"
              @input="block.printer_sn = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите cерийный номер принтера"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Инв. номер</label>
          <it-input
              v-bind:value="block.printer_inv"
              @input="block.printer_inv = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите инвентарныый номер принтера"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Организация</label>
          <it-dropdown-organization @organization_id="getOrganizationId"
              v-bind:value="block.printer_organization"
              @input="block.printer_organization = $event.target.value"
          >
          </it-dropdown-organization>
        </div>
        <div class="mb-3">
          <label class="form-label">Ответственный</label>
          <it-input
              v-bind:value="block.printer_owner"
              @input="block.printer_owner = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Укажите ответственного"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Пробег</label>
          <it-input
              v-bind:value="block.printer_mileare"
              @input="block.printer_mileare = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Укажите пробег устройства"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Статус</label>

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
                  v-bind:value="block.printer_status"
                  @input="block.printer_status = $event.target.value">
            <option value="0">Эксплуатация</option>
            <option value="1">Перемещение</option>
            <option value="2">Списан</option>
          </select>
        </div>
        <div class="mb-3">
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
                  v-bind:value="block.printer_connection"
                  @input="block.printer_connection = $event.target.value">
            <option value="0">Сетевой</option>
            <option value="1">USB</option>
          </select>
        </div>

      </form>
    </div>
  </div>
  <div class="modal-footer">

    <button v-if="this.block.printer_model_id && this.block.printer_sn && this.block.printer_organization && this.block.printer_owner && this.block.printer_status" @click="submitPrinter" type="button" class="btn btn-primary">Сохранить</button>
    <button v-else type="button" class="btn btn-secondary">Сохранить</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      isVisible: false,
      block: {
        printer_model_id: '',
        printer_webname: '',
        printer_ip: '',
        printer_sn: '',
        printer_inv: '',
        printer_organization: '',
        printer_owner: '',
        printer_mileare: '',
        printer_connection: '',
        printer_status: '',
      },
    }
  },
  name: "DialogNewPrinter",

  methods: {
    printerHistory(){
      this.isVisible = !this.isVisible
      console.log(this.isVisible)
    },
    getPrinterId(data){
      this.block.printer_model_id = data
    },
    getOrganizationId(data){
      this.block.printer_organization = data
    },
    hideDialog(){
      this.$emit('show', false)
    },
    submitPrinter(){
      axios
          .post("http://ittng.ru/server/add_new_printer_pinner.php", {
            printer_info: this.block
          })
          .then(response => {
            this.$emit('update',response)
            this.block.printer_model_id= ''
            this.block.printer_webname= ''
            this.block.printer_ip= ''
            this.block.printer_sn= ''
            this.block.printer_inv= ''
            this.block.printer_organization= ''
            this.block.printer_owner= ''
            this.block.printer_mileare= ''
            this.block.printer_connection= ''
            this.block.printer_status= ''

          })
          .catch(function(e){
            this.error = e;
          });

    },


  }
}
</script>

<style scoped>

</style>