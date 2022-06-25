<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Перемещение товара между складами</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;margin-bottom: 2rem!important;">
          <label class="form-label">Склад 1</label>
          <label class="form-label">Склад 2</label>
          <it-dd-sklads
              @sklad_id="getSklad1Id"
              v-bind:value="block.sklad1"
              @input="block.sklad1 = $event.target.value"
          ></it-dd-sklads>
          <it-dd-sklads
              @sklad_id="getSklad2Id"
              v-bind:value="block.sklad2"
              @input="block.sklad2 = $event.target.value"
          ></it-dd-sklads>

        </div>
        <div class="table-responsive" style="margin-top: 1rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
          <table class="table table-hover mb-0">
            <thead>
            <tr>
              <th style="text-align: center;color: black">#</th>
              <th style="vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>
              <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">Количество</th>
            </tr>
            </thead>
            <tbody v-for="(product, index) in features" :key="product.id">
            <tr style="border-style: hidden;">
              <td style="vertical-align: middle;text-align: center;">{{index+1}}</td>
              <td style="vertical-align: middle;">{{product.product_name}}</td>
              <td style="text-align: center; display: flex; justify-content: flex-end; border-bottom: 0px;">
                <div class="el-input">
                  <div v-if="product.count > 1" @click="product.count = product.count-1" class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                    </svg>
                  </div>
                  <div v-else class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H5V11H19V13Z" />
                    </svg>
                  </div>
                  <div class="el-input-place">
                    <input type="number" v-model="product.count" :min="1" :max="200">
                  </div>
                  <div @click="product.count = product.count+1" class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button v-if="this.block.sklad1 && this.block.sklad2 && this.block.sklad2 != this.block.sklad1" @click="saveData" type="button" class="btn btn-primary">Сохранить</button>
    <button v-else type="button" class="btn btn-secondary">Сохранить</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogTransferProducts",
  components: {},
  data(){
    return{
      block:{
        sklad1: '',
        sklad2: '',
      }

    }
  },
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  methods: {
    hideDialog(){
      this.$emit('show', false)
    },
    getSklad1Id(data){
      this.block.sklad1 = data
    },
    getSklad2Id(data){
      this.block.sklad2 = data
    },
    saveData(){
      axios
          .post("http://ittng.ru/server/add_transfer.php", {
            transfer: this.block,
            items: this.features
          })
          .then(response => {
            this.$emit('update',response)
            // console.log(response.data)

          })
          .catch(function(e){
            this.error = e;
          });
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