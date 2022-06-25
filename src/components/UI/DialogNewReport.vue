<template>
  <it-dialog-report v-model:show="dialogVisible" v-if="dialogVisible === 3">
    <dialog-view-report-printers :report_info="report_info" :organization="organization"></dialog-view-report-printers>
  </it-dialog-report>
  <it-dialog-report v-model:show="dialogVisible" v-if="dialogVisible === 2">
    <dialog-view-report :report_info="report_info" :organization="organization"></dialog-view-report>
  </it-dialog-report>
  <div class="modal-header">
    <h5 class="modal-title">
      Формирование отчета</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
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
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <button @click="createReport" type="button" class="btn btn-primary">Сформировать отчет</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogNewReport",
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      block: {
        period: "",
        organization: "",
        type: "",
      },
      organization: "",
      report_info: [],
      dialogVisible: 0,
    }
  },
  methods: {
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