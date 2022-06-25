<template>
  <it-dialog-report v-model:show="dialogVisible" v-if="dialogVisible === 2">
    <dialog-view-report :report_info="report_info" :report_index="report_index" :organization="block.organization"></dialog-view-report>
  </it-dialog-report>
  <it-dialog-report v-model:show="dialogVisible" v-if="dialogVisible === 3">
    <dialog-view-report-printers :report_info="report_info" :report_index="report_index" :organization="block.organization"></dialog-view-report-printers>
  </it-dialog-report>
<!--  <it-dialog v-model:show="dialogVisible" v-if="dialogVisible === 1">-->
<!--    <dialog-new-report @show='dialogVisible = 0'></dialog-new-report>-->
<!--  </it-dialog>-->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Отчеты</li>
    </ol>
  </nav>


  <div class="row" style="justify-content: center;">

    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title" style="margin-bottom: 1rem;">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
            </svg>
            Формирование отчета</h6>
          <form class="forms-sample" @submit.prevent>
            <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
              <label class="form-label">Организация</label>
              <label class="form-label">Период</label>
              <it-dropdown-organization
                  @organization_id="getOrganizationId"
                  v-bind:value="block.period"
                  @input="block.period = $event.target.value"
              >
              </it-dropdown-organization>
              <it-dd-report-period
                  @period_id="getPeriodId"
                  v-bind:value="block.organization"
                  @input="block.organization = $event.target.value">

              </it-dd-report-period>
            </div>
            <div class="mb-3">
              <label class="form-label">Тип отчета</label>
              <it-dd-report-type
                  @report_type_id="getReportTypeId"
                  v-bind:value="block.type"
                  @input="block.type = $event.target.value">
                >

              </it-dd-report-type>
            </div>
            <div class="mb-3">
              <button
                  v-if="this.block.organization && this.block.period && this.block.type"
                  @click="createReport"
                  type="submit"
                  class="btn btn-primary me-2"
                  style="float: right;margin-top: 20px;margin-right: 0rem!important;"
              >Сформировать отчет
              </button>
              <button
                  v-else
                  type="submit"
                  class="btn btn-secondary me-2"
                  style="float: right;margin-top: 20px;margin-right: 0rem!important;"
              >Сформировать отчет
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
import ItDialogReport from "@/components/UI/itDialogReport";
import DialogViewReportPrinters from "@/components/UI/DialogViewReportPrinters";

export default {
  name: "ReportsPage",
  components: {DialogViewReportPrinters, ItDialogReport},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      block: {
        period: "",
        organization: "",
        type: "",
      },
      report_info: [],
      report_index: '',
      dialogVisible: 0,
    }
  },

  methods: {
    generateIndex(){
      let rand = 100 - 0.5 + Math.random() * (1000 - 100 + 1)
      this.report_index = Math.round(rand);
    },
    showDialog(){
      this.dialogVisible = 1
    },
    hideDialog(){
      this.$emit('show', false)
    },

    createReport(){
      if(this.block.type === 1){

        axios
            .post("http://ittng.ru/server/printers_report.php", {
              report:this.block
            })
            .then(response => {

              this.generateIndex()
              this.report_info = response.data
              this.dialogVisible = 3
            })
            .catch(function(e){
              this.error = e;
            });
      }
      if(this.block.type === 2){

        axios
            .post("http://ittng.ru/server/products_report.php", {
              report:this.block
            })
            .then(response => {
              this.generateIndex()
              this.report_info = response.data
              this.dialogVisible = 2
            })
            .catch(function(e){
              this.error = e;
            });
      }
    },
    getReportTypeId(data){
      this.block.type = data
    },
    getOrganizationId(data){
      this.block.organization = data
    },
    getPeriodId(data){
      this.block.period = data
    }

  }

}
</script>

<style scoped>

</style>