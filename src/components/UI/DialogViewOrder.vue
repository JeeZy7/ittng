<template>
  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 1">
    <dialog-view-actual-order :actual_order="order_items" @success="getActualSuccess"></dialog-view-actual-order>
  </it-dialog>

  <div class="modal-header">
    <h5 class="modal-title">
      Поставка № </h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body" v-for="order in document_info" :key="order.id">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Номер поставки</label>
          <label class="form-label">Поставщик</label>
          <it-input
              :value="order.ord_index"
              @input="new_order_info.doc_index = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите номер поставки"
          ></it-input>
          <it-input
              :value="order.provider"
              @input="new_order_info.provider = $event.target.value"
              type="text"
              autocomplete="off"
              placeholder="Введите компанию поставщика"
          ></it-input>
        </div>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Дата поставки</label>
          <label class="form-label">Получатель</label>

          <it-data-picker
              :value="order.date"
              @input="new_order_info.date = $event.target.value">
          </it-data-picker>
          <it-dropdown-organization @organization_id="getOrganizationId"
                                    :value="order.company"
                                    @input="new_order_info.organization = $event.target.value"
                                    :currentOrganization="order.company"
          >
          </it-dropdown-organization>
        </div>
        <div class="mb-3">
          <label class="form-label">Склад</label>
          <it-dd-sklads @sklad_id="getSkladId"
                        :value="order.sklad"
                        @input="new_order_info.sklad = $event.target.value"
                        :currentSklad="order.sklad"
          >
          </it-dd-sklads>
        </div>
        <div class="mb-3">
          <label class="form-label">Товары поставки</label>
          <it-select-products @selectedProducts="SelectProducts" :act_products="document_products"></it-select-products>
        </div>
        <div class="table-responsive"
             style="margin-top: 0rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;"
             id="myTable">
          <table class="table table-hover mb-0">
            <thead>
            <tr style="border-bottom: 1px solid #e9ecef;">
              <th style="text-align: center;color: black">#</th>
              <th style="vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>
              <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">
                Количество
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in document_products" :key="item.id" :item="item" style="border-style: hidden;">
              <td style="vertical-align: middle;text-align: center;">{{ index + 1 }}</td>
              <td style="vertical-align: middle;">{{ item.name }}</td>
              <td style="text-align: center;display: flex;justify-content: flex-end;border-bottom: 0;">
                <div class="el-input" style="float: right">
                  <div v-if="+item.count > 1" @click="item.count = +item.count - 1" class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H5V11H19V13Z"/>
                    </svg>
                  </div>
                  <div v-else class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H5V11H19V13Z"/>
                    </svg>
                  </div>
                  <div class="el-input-place">
                    <input type="number" v-model="item.count" :min="1" :max="200">
                  </div>
                  <div @click="item.count = +item.count + 1" class="el-input-btn">
                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--        <div v-if="document_products.length != 0" class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">-->
        <!--          <table class="table table-hover mb-0">-->
        <!--            <thead>-->
        <!--            <tr style="border-bottom: 1px solid #e9ecef;">-->
        <!--              <th style="text-align: center;color: black">#</th>-->
        <!--              <th style="vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>-->
        <!--              <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">Количество</th>-->
        <!--            </tr>-->
        <!--            </thead>-->
        <!--            <tbody>-->
        <!--            <tr v-for="(item, index) in document_products" :key="item.id" :item="item" style="border-style: hidden;">-->
        <!--              <td style="vertical-align: middle;text-align: center;">{{ index+1}}</td>-->
        <!--              <td style="vertical-align: middle;">{{ item.type }} {{ item.company }} {{ item.name }}</td>-->
        <!--              <td style="text-align: center;display: flex;justify-content: flex-end;border-bottom: 0;">-->
        <!--                <div class="el-input" style="float: right">-->
        <!--                  <div v-if="item.count > 1" @click="item.count = item.count-1" class="el-input-btn">-->
        <!--                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">-->
        <!--                      <path fill="currentColor" d="M19,13H5V11H19V13Z" />-->
        <!--                    </svg>-->
        <!--                  </div>-->
        <!--                  <div v-else class="el-input-btn">-->
        <!--                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24">-->
        <!--                      <path fill="currentColor" d="M19,13H5V11H19V13Z" />-->
        <!--                    </svg>-->
        <!--                  </div>-->
        <!--                  <div class="el-input-place">-->
        <!--                    <input type="number" v-model="item.count" :min="1" :max="200">-->
        <!--                  </div>-->
        <!--                  <div @click="item.count = item.count+1" class="el-input-btn">-->
        <!--                    <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </td>-->
        <!--            </tr>-->
        <!--            </tbody>-->
        <!--          </table>-->
        <!--        </div>-->
        <div class="mb-3" style="margin-top: 1rem;">
          <label class="form-label">Поставку проверил</label>
          <it-dd-users></it-dd-users>
        </div>
      </form>
    </div>
  </div>
  <div class="modal-footer" v-for="order in document_info" :key="order.id">
    <button v-if="order.status === 0" @click="saveOrder" type="button" class="btn btn-primary">Сформировать документ
    </button>
    <button v-if="order.status === 1" type="button" class="btn btn-primary">Провести поставку</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogViewOrder",
  components: {},

  props: {
    document_id: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      success: false,
      document_info: [],
      selectedProducts: [],
      document_products: [],
      order_file: "",
      order_items: [],
      result: [],
      dialogVisible: 0,
      new_order_info: {},
    }
  },
  computed: {
    // Products(){
    //     const arr = this.document_products
    //     const result = []
    //     const dublicatesIncludes = []
    //     arr.forEach((current, index) => {
    //       if(dublicatesIncludes.includes(index)) return
    //
    //       result.push(current)
    //
    //       for(let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++){
    //         const comparison = arr[comparisonIndex]
    //         const currentKey = Object.keys(current)
    //         const comparisonKeys = Object.keys(comparison)
    //
    //         if(currentKey.length !== comparisonKeys.length) continue
    //
    //         const currentKeysString = currentKey.sort().join("").toLowerCase()
    //         const comparisonKeysString = currentKey.sort().join("").toLowerCase()
    //         if(currentKeysString !== comparisonKeysString) continue
    //
    //         let valuesEqual = true
    //         for(let i = 0; i<currentKey.length; i++){
    //           const key = currentKey[i]
    //           if(current[key] !== comparison[key]){
    //             valuesEqual = false
    //             break
    //           }
    //
    //         }
    //         if(valuesEqual) dublicatesIncludes.push(comparisonIndex)
    //       }
    //     })
    //     console.log(result)
    //     return result
    //
    //
    // }

  },
  methods: {
    SelectProducts(item, checked) {
      console.log(item, checked)
      if (checked) {
        this.document_products.push(item)
      } else {
        console.log(checked)
        this.document_products = this.document_products.filter(i => {
          return i.product_id !== item.product_id
        })
      }
      // this.document_products = data
    },

    getActualSuccess() {
      this.success = true
    },
    actualOrder() {
      this.dialogVisible = 1
    },
    hideDialog() {
      this.$emit('show', false)
    },
    getOrganizationId(data) {
      this.new_order_info.organization = data.toString()
    },
    getSkladId(data) {
      this.new_order_info.sklad = data.toString()
    },
    saveOrder() {
      axios
          .post("http://ittng.ru/server/save_document.php", {
            document_info: this.new_order_info, document_items: this.selectedProducts, document_id: this.document_id
          })
          .then(response => {
            this.$emit('update', response)
            this.$emit('show', false)
            // this.document_info = response.data

          })
          .catch(function (e) {
            this.error = e;
          });
    },
    fetchDocument() {
      axios
          .post("http://ittng.ru/server/get_document.php", {
            document: this.document_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.document_info = response.data

          })
          .catch(function (e) {
            this.error = e;
          });
      axios
          .post("http://ittng.ru/server/get_order_items.php", {
            order_items: this.document_id
          })
          .then(response => {
            // this.$emit('update',response)
            this.document_products = response.data
            console.log(response.data)

          })
          .catch(function (e) {
            this.error = e;
          });
    },

  },
  async mounted() {
    this.fetchDocument()
  }
}
</script>

<style scoped>
.el-input {
  width: 100px;
  height: 30px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  border: 1px solid #e9ecef;
  appearance: none;
  border-radius: 0.25rem;
}

.el-input-btn {
  width: 30px;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.el-input-btn:first-child {
  border-right: 1px solid #e9ecef;
}

.el-input-btn:last-child {
  border-left: 1px solid #e9ecef;
}

.el-input-place input {
  width: 100%;
  height: 100%;
  border: 0;
  text-align: center;
}
</style>