<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Новый товар</h5>
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
          <label class="form-label" style="font-weight: 500;">Наименование товара</label>
          <it-input
              v-bind:value="block.product_name"
              @input="block.product_name = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите наименование товара"
          ></it-input>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="margin-top:8px;min-height: 45px;max-height: 300px;overflow: auto;display: none;width: calc(100% - 4rem);">
          </div>
        </div>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Тип товара</label>
          <label class="form-label" style="font-weight: 500;">Производитель</label>
            <it-dd-product-types @type_id="getTypeId"
               v-bind:value="block.product_type"
               @input="block.product_type = $event.target.value">
            </it-dd-product-types>
          <it-dd-product-company @company_id="getCompanyId"
              v-bind:value="block.product_company"
              @input="block.product_company = $event.target.value">
          </it-dd-product-company>
        </div>
        <div v-if="block.product_type > 0 && block.product_type < 4" class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Цвет товара</label>
          <label class="form-label" style="font-weight: 500;">Ресурс товара</label>
          <it-dd-product-color @color_id="getColorId"
               v-bind:value="block.product_color"
               @input="block.product_color = $event.target.value">
          </it-dd-product-color>
          <it-input
              v-bind:value="block.product_resource"
              @input="block.product_resource = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите ресурс товара">

          </it-input>
        </div>
        <div v-if="block.product_type === 11 " class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Вид памяти</label>
          <label class="form-label" style="font-weight: 500;">Форм фактор памяти</label>
          <it-dd-product-memory-variation
              @memory_variation_id="getMemoryVariationId"
              v-bind:value="block.product_memory_variation"
              @input="block.product_memory_variation = $event.target.value">

          </it-dd-product-memory-variation>
          <it-dd-product-memory-form
              @memory_form_id="getMemoryFormId"
              v-bind:value="block.product_memory_form"
              @input="block.product_memory_form = $event.target.value">

          </it-dd-product-memory-form>
        </div>
        <div v-if="block.product_type === 11 " class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Частота памяти</label>
          <label class="form-label" style="font-weight: 500;">Объем памяти</label>
          <it-dd-product-memory-type
              @memory_type_id="getMemoryTypeId"
              v-bind:value="block.product_memory_type"
              @input="block.product_memory_type = $event.target.value">

          </it-dd-product-memory-type>
          <it-dd-product-memory-size
              @memory_size_id="getMemorySizeId"
              v-bind:value="block.product_memory_size"
              @input="block.product_memory_size = $event.target.value">

          </it-dd-product-memory-size>
        </div>
        <div v-if="block.product_type === 13" class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Тип жесткого диска</label>
          <label class="form-label" style="font-weight: 500;">Объем жесткого диска</label>
          <it-dd-product-h-d-d-type
              @hdd_type_id="getHDDTypeId"
              v-bind:value="block.product_hdd_type"
              @input="block.product_hdd_type = $event.target.value">
          </it-dd-product-h-d-d-type>
          <it-dd-product-h-d-d-count
              @hdd_count_id="getHDDCountId"
              v-bind:value="block.product_hdd_count"
              @input="block.product_hdd_count = $event.target.value">>

          </it-dd-product-h-d-d-count>
        </div>
        <div class="mb-3">
          <label class="form-label" style="font-weight: 500;">Совместимость</label>
          <it-input
              v-bind:value="block.product_comp"
              @input="block.product_comp = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите модели устройств совместимых с этим товаром"
          ></it-input>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="margin-top:8px;min-height: 45px;max-height: 300px;overflow: auto;display: none;width: calc(100% - 4rem);">
          </div>
        </div>
        <div class="mb-3">
          <div class="alert alert-primary" role="alert" id="add-product-alert" style="display: none;">

          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="mb-3" v-if="alertVisible === true">
    <div v-if="answer === 1" class="alert alert-danger" role="alert" style="display: block;margin: 0rem 2rem 1rem;">
      Товар с таким названием уже есть в базе!
    </div>
    <div v-if="answer === 0" class="alert alert-primary" role="alert" style="display: block;margin: 0rem 2rem 1rem;">
      Запись успешно добавлена!
    </div>
  </div>
  <div class="modal-footer">

    <button v-if="this.block.product_name && this.block.product_company && this.block.product_type" @click="submitProduct" type="button" class="btn btn-primary">Сохранить</button>
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
      block: {
        product_name: '',
        product_type: '',
        product_company: '',
        product_color: '',
        product_resource: '',
        product_memory_type: '',
        product_memory_size: '',
        product_comp: '',
        product_hdd_type: '',
        product_memory_variation: '',
        product_memory_form: '',
      },
      correctName: '',
      alertVisible: false,
      answer: 0,
    }
  },
  name: "DialogNewProduct",
  methods: {
    getMemoryFormId(data){
      this.block.product_memory_form = data
    },
    getMemoryVariationId(data){
      this.block.product_memory_variation = data
    },
    getMemoryTypeId(data){
      this.block.product_memory_type = data
    },
    getMemorySizeId(data){
      this.block.product_memory_size = data
    },
    getHDDCountId(data){
      this.block.product_hdd_count = data
    },
    getHDDTypeId(data){
      this.block.product_hdd_type = data
    },
    getColorId(data){
      this.block.product_color = data
    },
    getTypeId(data){
      this.block.product_type = data
    },
    getCompanyId(data){
      this.block.product_company = data
    },
    hideDialog(){
      this.$emit('show', false)
    },
    submitProduct(){
      axios
          .post("http://ittng.ru/server/add_product.php", {
            block:this.block
          })
          .then(response => {
            this.alertVisible = true
            this.$emit('update',response)
            console.log(response.data)
            const newData = response.data.map(d => d.answer).reverse()
            if(newData == 0){
              this.alertVisible = true
              this.answer = 0
            }else{
              this.alertVisible = true
              this.answer = 1
            }

          })
          .catch(function(e){
            this.error = e;
          });

    },


  },

}
</script>

<style>
  .modal-enter-active, .modal-leave-active {
    transition: opacity 2s;
  }

  .modal-enter, .modal-leave-to {
    opacity: 0;
  }
</style>