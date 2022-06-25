<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Отчет № {{ report_index }}</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <div class="container-fluid d-flex justify-content-between">
        <div class="col-lg-3 ps-0">
          <a href="#" class="noble-ui-logo d-block mt-3">it<span>TNG</span></a>
          <p class="mt-1 mb-1">
            <b v-if="organization === 1">ЗАО "Таманьнефтегаз"</b>
            <b v-if="organization === 2">ООО "ОТЭКО-Терминал"</b>
            <b v-if="organization === 3">ООО "ОТЭКО-Портсервис"</b>
            <b v-if="organization === 4">АО "ОТЭКО"</b>
          </p>
<!--          <p>353535, Россия, Краснодарский край,<br> Темрюкский район, п. Волна,<br>ул. Таманская, д. 8</p>-->
        </div>
        <div class="col-lg-3 pe-0">
          <h4 class="fw-bolder text-uppercase text-end mt-4 mb-2" style="font-size: 14px;">Отчет | Расход организации</h4>
          <h6 class="text-end mb-5 pb-4">№ {{ report_index }}</h6>
<!--          <h6 class="mb-0 mt-3 text-end fw-normal mb-2"><span class="text-muted">-->
<!--            Период отчета:</span> 2 квартал 2022-->
<!--          </h6>-->
        </div>
      </div>
      <div class="container-fluid mt-5 d-flex justify-content-center w-100">
        <div class="table-responsive w-100">
          <table class="table table-bordered" id="table">
            <thead>
            <tr>
              <th>#</th>
              <th>Модель устройства</th>
              <th>Наименование товара</th>
              <th class="text-end">Реализовано</th>
            </tr>
            </thead>
            <tbody v-for="(item, index, val) in report_request" :key="item.id">
              <tr v-if="item.length > 1" class="text-end">
                <td :rowspan="item.length+1" class="text-start" style="vertical-align: middle;">{{ val+1 }}</td>
                <td :rowspan="item.length+1" class="text-start" style="vertical-align: middle;">{{ index }}</td>
              </tr>

              <tr class="text-end" v-for="element in item" :key="element.id">
                <td v-if="item.length === 1" class="text-start">{{ val+1 }}</td>
                <td v-if="item.length === 1" class="text-start">{{ index }}</td>
                <td class="text-start">{{ element.product_id }}</td>
                <td>{{ element.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
  <div class="container-fluid w-100" style="padding: 0rem 2rem 2rem; display: flex; justify-content: flex-end;margin-top: 1rem;">
      <button @click="ExportToExcel" v-if="report_request.length != 0" type="button" class="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z" />
        </svg>
        Открыть в Excel
      </button>

  </div>

</template>

<script>
// import axios from "axios";
import axios from "axios";

export default {
  name: "DialogViewReportPrinters",
  props: {
    report_info: {
      type: Object,
      required: true
    },
    report_index: {
      type: String,
      required: true
    },
    organization: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      report_request: {}
    }
  },
  methods: {
      ExportToExcel(){
        axios
              .post("http://ittng.ru/server/printer_report_print.php", {
                report:this.report_request, report_index:this.report_index, organization:this.organization
              },{
                responseType: 'blob',
                headers: {

                  'Content-Type': 'application/vnd.ms-excel',
                }
              })
              .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'template.xls'); //or any other extension
                document.body.appendChild(link);
                link.click();
                console.log(response.data)
              })
              .catch(function(e){
                this.error = e;
              });
      }

  },
  async mounted() {
    this.report_request = this.report_info
    console.log(this.report_request)
  }

}
</script>

<style scoped>
  td{
    background: white;
  }
</style>