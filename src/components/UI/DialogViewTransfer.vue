<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Информация о перемещении</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body" v-for="transfer in transfer_info" :key="transfer.id">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3">
          <label class="form-label">Дата перемещения</label>
          <it-input
              :value="transfer.date"
              @input="transfer.date = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите дату перемещения"
          ></it-input>
        </div>

        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;margin-top: 1rem !important;margin-bottom: 0rem !important;padding-bottom: 1.5rem;">
          <label class="form-label">Склад 1</label>
          <label class="form-label">Склад 2</label>
          <it-dd-sklads
              @sklad_id="getSklad1Id"
              v-bind:value="transfer.first_sklad"
              @input="transfer.first_sklad = $event.target.value"
              :currentSklad="transfer.first_sklad"
          ></it-dd-sklads>
          <it-dd-sklads
              @sklad_id="getSklad2Id"
              v-bind:value="transfer.second_sklad"
              @input="transfer.second_sklad = $event.target.value"
              :currentSklad="transfer.second_sklad"
          ></it-dd-sklads>
        </div>
        <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
          <table class="table table-hover mb-0">
            <thead>
            <tr style="border-bottom: 1px solid #e9ecef;">
              <th style="text-align: center;color: black">#</th>
              <th style="vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>
              <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">Количество</th>
            </tr>
            </thead>
            <tbody v-if="transfer_items">
            <tr v-for="(transfer, index) in transfer_items" :key="transfer.id" :transfer="transfer" style="border-style: hidden;">
              <td style="vertical-align: middle;text-align: center;">{{ index+1}}</td>
              <td style="vertical-align: middle;">{{ transfer.product_id }}</td>
              <td style="text-align: center; display: flex; justify-content: flex-end; border-bottom: 0px;">
                <div class="el-input">
                  <div v-if="transfer.count > 1" @click="transfer.count = transfer.count-1" class="el-input-btn">
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
                    <input type="number" v-model="transfer.count" :min="1" :max="200">
                  </div>
                  <div @click="transfer.count = transfer.count+1" class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
            <h5 v-else>Загрузка товаров...</h5>
          </table>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary">Сохранить</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogViewTransfer",
  props: {
    transfer_id: {
      type: Object,
      required: true
    },
  },
  data(){
    return{
      transfer_info: [],
      transfer_items: [],

    }
  },
  methods: {
    getSklad1Id(data){
      this.transfer_info.first_sklad = data.toString()
    },
    getSklad2Id(data){
      this.transfer_info.second_sklad = data.toString()
    },
    // updateOrder(){
    //
    //   axios
    //       .post("http://ittng.ru/server/update_order.php", {
    //         order:this.order_info, company:this.order_info.company, sklad:this.order_info.sklad
    //       })
    //       .then(response => {
    //         // this.$emit('update',response)
    //         // this.product_info = response.data
    //         console.log(response.data)
    //       })
    //       .catch(function(e){
    //         this.error = e;
    //       });
    // },

    fetchOrder() {
      axios
          .post("http://ittng.ru/server/get_transfer_.php", {
            transfer:this.transfer_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.transfer_info = response.data
            console.log(response.data)

          })
          .catch(function(e){
            this.error = e;
          });
      axios
          .post("http://ittng.ru/server/get_transfer_items.php", {
            transfer_items:this.transfer_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.transfer_items = response.data
            console.log(response.data)

          })
          .catch(function(e){
            this.error = e;
          });
    },

  },
  async mounted() {
    this.fetchOrder()
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