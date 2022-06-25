<template>
  <it-dialog-report style="width: 1200px;
  height: calc(600px + 4rem);
    position: fixed;
    background-color: white;
    top: 50px;
    left: 18%;
    z-index: 5;" v-model:show="dialogVisible" v-if="dialogVisible === 1">
    <dialog-product-list @show='dialogVisible = 0' @selectedProducts="selectedProducts"></dialog-product-list>
  </it-dialog-report>
  <div class="modal-header">
    <h5 class="modal-title">
      Новый документ</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3" >
          <label class="form-label">Дата</label>
          <it-data-picker
              v-bind:value="block.order_date"
              @input="block.order_date = $event.target.value">
          </it-data-picker>
        </div>

        <div class="mb-3" >
          <label class="form-label">Номер документа</label>
          <it-input
              v-bind:value="block.order_index"
              @input="block.order_index = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите номер поставки"
          ></it-input>
        </div>
        <div class="mb-3" >
          <label class="form-label">Поставщик</label>
          <it-input
              v-bind:value="block.order_provider"
              @input="block.order_provider = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите компанию поставщика"
          ></it-input>
        </div>
        <div class="mb-3" >
          <label class="form-label">Получатель</label>
          <it-dropdown-organization @organization_id="getOrganizationId"
              v-bind:value="block.order_company"
              @input="block.order_company = $event.target.value"
          >
          </it-dropdown-organization>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button v-if="this.block.order_date && this.block.order_index && this.block.order_company && this.block.order_provider" @click="saveOrder" type="button" class="btn btn-primary">Сохранить документ</button>
    <button v-else @click="saveOrder" type="button" class="btn btn-secondary">Сохранить документ</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogNewOrder",
  components: {},
  data(){
    return {

      item_count: '',
      selectedFile: null,
      checker: false,
      dialogVisible: 0,
      selected_products: [],
      block: {
        products: [],
        order_index: "",
        order_provider: "",
        order_company: "",
        order_sklad: "",
        order_date: "",
        order_file: null,
      },

    }
  },
  methods: {
    selectedProducts(data){
      this.selected_products = data
    },
    ProductList(){
      this.dialogVisible = 1
    },
    hideDialog(){
      this.$emit('show', false)
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0]
    },
    onUpload(){
      const fd = new FormData()
      fd.append('file', this.selectedFile, this.selectedFile.name)
      axios
          .post("http://ittng.ru/server/file_uploading.php", fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            console.log(response.data)
            this.block.order_file = this.selectedFile.name
          })
          .catch(function(e){
            this.error = e;
          });
    },
    saveOrder(){
        this.checker = true
        axios
            .post("http://ittng.ru/server/add_order.php", {
              order_info: this.block
            })
            .then(response => {
              this.$emit('update',response)
              this.$emit('show', false)


            })
            .catch(function(e){
              this.error = e;
            });

    },
    getSkladId(data){
      this.block.order_sklad = data
    },

    getProduct(data){
      this.block.products.push({'id': data.id, 'title': data.type+' '+data.company+' '+data.name, 'count': 1})
    },
    getOrganizationId(data){
      this.block.order_company = data
    }
  }

}
</script>

<style scoped>
.el-input{
  width: 100px;
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border: 1px solid #e9ecef;
  appearance: none;
  border-radius: 0.25rem;
}
.el-input-btn{
  width: 30px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.el-input-btn:first-child{
  border-right: 1px solid #e9ecef;
}
.el-input-btn:last-child{
  border-left: 1px solid #e9ecef;
}
.el-input-place input{
  width: 100%;
  height: 100%;
  border: 0;
  text-align: center;
}
</style>