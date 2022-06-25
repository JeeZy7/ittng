<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Информация о товаре</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body" v-for="product in product_info" :key="product.id">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3">
          <label class="form-label" style="font-weight: 500;">Наименование товара</label>
          <it-input
              :value="product.name"
              @input="new_product_info.name = $event.target.value"
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
          <it-dd-product-types
              @type_id="getTypeId"
            :currentType="product.type">
          </it-dd-product-types>
          <it-dd-product-company
              @company_id="getCompanyId"
             :currentCompany="product.company">

          </it-dd-product-company>
        </div>
        <div v-if="product.type > 0 && product.type < 4" class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Цвет товара</label>
          <label class="form-label" style="font-weight: 500;">Ресурс товара</label>
          <it-dd-product-color
              @color_id="getColorId"
             :currentColor="product.color">
          </it-dd-product-color>
          <it-input
              v-bind:value="product.resource"
              @input="new_product_info.resource = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите ресурс товара">

          </it-input>
        </div>
        <div v-if="product.type === '11'" class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Вид памяти</label>
          <label class="form-label" style="font-weight: 500;">Форм фактор памяти</label>
          <it-dd-product-memory-variation
              @memory_variation_id="getMemoryVariationId"
              :currentMemoryVariation="product.memory_variation">

          </it-dd-product-memory-variation>
          <it-dd-product-memory-form
              @memory_form_id="getMemoryFormId"
              :currentMemoryForm="product.memory_form">

          </it-dd-product-memory-form>
        </div>
        <div v-if="product.type === '11'" class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Частота памяти</label>
          <label class="form-label" style="font-weight: 500;">Объем памяти</label>
          <it-dd-product-memory-type
              @memory_type_id="getMemoryTypeId"
              :currentMemoryType="product.memory_type">

          </it-dd-product-memory-type>
          <it-dd-product-memory-size
              @memory_size_id="getMemorySizeId"
              :currentMemorySize="product.memory_size">

          </it-dd-product-memory-size>
        </div>
        <div v-if="product.type === '13'" class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label" style="font-weight: 500;">Тип жесткого диска</label>
          <label class="form-label" style="font-weight: 500;">Объем жесткого диска</label>
          <it-dd-product-h-d-d-type
              @hdd_type_id="getHDDTypeId"
              :currentHDDType="product.hdd_type">
          </it-dd-product-h-d-d-type>
          <it-dd-product-h-d-d-count
              @hdd_count_id="getHDDCountId"
              :currentHDDCount="product.hdd_count">

          </it-dd-product-h-d-d-count>
        </div>
        <div class="mb-3">
          <label class="form-label" style="
                        font-weight: 500;
                    ">Совместимость</label>
          <input type="text" class="form-control" id="comp" autocomplete="off" placeholder="Укажите принтеры"
                 :value="product.comp"
                 @input="new_product_info.comp = $event.target.value">
        </div>
        <div class="mb-3">
          <div class="alert alert-primary" role="alert" id="add-product-alert" style="display: none;">

          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">

    <button  @click="updateProduct" type="button" class="btn btn-primary">Сохранить</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogViewProduct",
  props: {
    product_id: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      product_info: [],
      new_product_info: {},
    }
  },
  methods: {
    hideDialog(){
      this.$emit('show', false)
    },
    getMemoryFormId(data){
      this.product_info.product_memory_form = data.toString()
      this.new_product_info.memory_form = data.toString()
    },
    getMemoryVariationId(data){
      this.product_info.product_memory_variation = data.toString()
      this.new_product_info.memory_variation = data.toString()
    },
    getHDDTypeId(data){
      this.product_info.product_hdd_type = data.toString()
      this.new_product_info.hdd_type = data.toString()
    },
    getHDDCountId(data){
      this.product_info.product_hdd_count = data.toString()
      this.new_product_info.hdd_count = data.toString()
    },
    getMemorySizeId(data){
      this.product_info.memory_size = data.toString()
      this.new_product_info.memory_size = data.toString()
    },
    getMemoryTypeId(data){
      this.product_info.memory_type = data.toString()
      this.new_product_info.memory_type = data.toString()
    },
    getColorId(data){
      this.product_info.color = data.toString()
      this.new_product_info.color = data.toString()
    },
    getTypeId(data){
      this.product_info.type = data.toString()
      this.new_product_info.type = data.toString()
    },
    getCompanyId(data){
      this.product_info.company = data.toString()
      this.new_product_info.company = data.toString()
    },
    updateProduct(){
      axios
          .post("http://ittng.ru/server/update_product.php", {
            product:this.new_product_info, product_id:this.product_id
          })
          .then(response => {
            this.$emit('update',response)
            // this.product_info = response.data
            console.log(response.data)
          })
          .catch(function(e){
            this.error = e;
          });
    },
    fetchProduct() {
      axios
          .post("http://ittng.ru/server/get_product.php", {
            product:this.product_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.product_info = response.data
            console.log(response.data)

          })
          .catch(function(e){
            this.error = e;
          });
    }
  },
  async mounted() {
    this.fetchProduct()
  }
}
</script>

<style scoped>

</style>