<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Информация о товарах поставки</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
          <table class="table table-hover mb-0">
            <thead>
            <tr style="border-bottom: 1px solid #e9ecef;">
              <th style="text-align: center;color: black">#</th>
              <th style="vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>
              <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">Указанное количество</th>
              <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">Фактическое количество</th>
            </tr>
            </thead>
            <tbody v-if="actual_order">
            <tr v-for="(order, index) in actual_order" :key="order.id" :order="order" style="border-style: hidden;">
              <td style="vertical-align: middle;text-align: center;">{{ index+1}}</td>
              <td style="vertical-align: middle;">{{ order.name }}</td>
              <td style="text-align: center;border-bottom: 0;">
                  {{order.count}}
              </td>
              <td style="text-align: center;border-bottom: 0;">
                <div class="el-input" style="float: right;">
                  <div v-if="order.actual_count > 1" @click="order.actual_count = order.actual_count-1" class="el-input-btn">
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
                    <input
                        type="number"
                        :value="order.actual_count"
                        @input="order.actual_count = $event.target.value"
                        :min="1"
                        :max="200">
                  </div>
                  <div @click="order.actual_count = order.actual_count+1" class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
                  </div>
                </div>
              </td>

            </tr>
            </tbody>
            <h5 v-else>Загрузка товаров...</h5>
          </table>
        </div>
        <div class="mb-3" style="margin-top: 1rem; width: 50%;">
          <label class="form-label">Проверил поставку</label>
          <it-dd-users
          @user_id="getUser"
          v-bind:value="order_user"
          @input="order_user = $event.target.value"
          >
          </it-dd-users>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button @click="saveActualOrder" type="button" class="btn btn-primary">Сохранить</button>
  </div>
</template>

<script>
// import axios from "axios";

import axios from "axios";

export default {
  name: "DialogViewActualOrder",
  components: {},

  props: {
   actual_order: {
      type: Object,
      required: true
    },
  },
  data(){
    return{
      order_user: "",
    }
  },

  methods: {
    getUser(data){
      this.order_user = data
    },

    hideDialog(){
      this.$emit('show', false)
    },
    saveActualOrder(){
      axios
          .post("http://ittng.ru/server/get_order_items.php", {
            order_items:this.order_id
          })
          .then(response => {
            // this.$emit('update',response)
            console.log(response.data)
            this.$emit('success', true)
            this.$emit('show', false)

          })
          .catch(function(e){
            this.error = e;
          });

    }


  },

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