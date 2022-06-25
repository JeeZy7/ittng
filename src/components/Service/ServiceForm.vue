<template>
  <div class="row" style="justify-content: center;">

    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title" style="margin-bottom: 1rem;"><svg style="width:20px;height:20px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18,1.83C17.5,1.83 17,2 16.59,2.41C13.72,5.28 8,11 8,11L9.5,12.5L6,16H4L2,20L4,22L8,20V18L11.5,14.5L13,16C13,16 18.72,10.28 21.59,7.41C22.21,6.5 22.37,5.37 21.59,4.59L19.41,2.41C19,2 18.5,1.83 18,1.83M18,4L20,6L13,13L11,11L18,4Z"></path>
          </svg>
            Обслуживание принтера</h6>
          <form class="forms-sample" @submit.prevent>
            <div class="mb-3">
              <label class="form-label">Выберите устройство</label>

              <it-dd-printer-p @printer_id="getPrinterId"
                  v-bind:value="block.printer_id"
                  @input="block.printer_id = $event.target.value"
              >
              </it-dd-printer-p>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 300px; overflow: auto; display: none;"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Склад списания</label>
              <it-dd-sklads @sklad_id="getSkladId" @sklad_name="getSkladName"
                  v-bind:value="block.sklad"
                  @input="block.sklad = $event.target.value"
              >
              </it-dd-sklads>
            </div>
            <div class="mb-3">
              <label class="form-label">Выберите товар</label>
              <it-dd-products @product_id="getProductId" @product_name="getProductName"
                  v-bind:value="block.product_id"
                  @input="block.product_id = $event.target.value"
              >
              </it-dd-products>
              <div class="dropdown-menu" id="printers_dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 300px; overflow: auto; display: none;"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Тип операции</label>

              <select name="" id="color" style="
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
                  v-bind:value="block.type"
                  @input="block.type = $event.target.value">
                <option value="0">Выберите тип операции</option>
                <option value="1">Установка</option>
                <option value="2">Перезаправка</option>
                <option value="3">Ремонт</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Укажите пробег устройства</label>
              <it-input
                  v-bind:value="block.mileare"
                  @input="block.mileare = $event.target.value"
                  type="text"
                  autocomplete="off"
                  placeholder="Введите пробег устройства"
              ></it-input>
            </div>
            <div class="mb-3">
              <label class="form-label">Добавьте комментарий</label>
              <it-input
                  v-bind:value="block.comment"
                  @input="block.comment = $event.target.value"
                  type="text"
                  autocomplete="off"
                  placeholder="..."
              ></it-input>
            </div>

            <div class="mb-3" v-if="alertVisible === true">
              <div v-if="answer === 1" class="alert alert-danger" role="alert" style="display: block;">
                Выбранный товар <strong>{{productName}}</strong> отсутствует на складе <strong>{{skladName}}</strong>
              </div>
              <div v-if="answer === 0" class="alert alert-primary" role="alert" style="display: block;">
                Запись успешно добавлена!
              </div>
            </div>
            <div class="mb-3">
              <button
                  v-if="this.block.product_id && this.block.printer_id && this.block.sklad && this.block.type"
                  @click="submitBlock"
                  type="submit"
                  class="btn btn-primary me-2"
                  style="float: right;margin-top: 20px;margin-right: 0rem!important;"
              >Выполнить
              </button>
              <button
                  v-else
                  type="submit"
                  class="btn btn-secondary me-2"
                  style="float: right;margin-top: 20px;margin-right: 0rem!important;"
              >Выполнить
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import components from "@/components/UI"

export default {
  components: {components},

  data(){
    return {
      block: {
        product_id: '',
        printer_id: '',
        sklad: '',
        comment: '',
        type: '1',
        mileare: ''
      },
      alertVisible: false,
      answer: 0,
      skladName: '',
      productName: ''
    }
  },
  name: "ServiceForm",
  methods: {
    getPrinterId(data){
      this.block.printer_id = data
    },
    getProductId(data){
      this.block.product_id = data
    },
    getProductName(data){
      this.productName = data
    },
    getSkladId(data){
      this.block.sklad = data
    },
    getSkladName(data){
      this.skladName = data
    },
    submitBlock(){

      axios
          .post("http://ittng.ru/server/printer_action_manager.php", {service:this.block})
          .then(response => {
            // this.products = response.data;
            const newData = response.data.map(d => d.answer).reverse()
            console.log(response.data)
            if(newData == 0){
              this.alertVisible = true
              this.answer = 1
            }else{
              this.alertVisible = true
              this.answer = 0
            }

          })
          .catch(function(e){
            this.error = e;
          });
    }
  },

}
</script>

<style scoped>

</style>