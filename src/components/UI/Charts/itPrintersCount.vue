<template>
  <div id="PrintersDonut"></div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  name: "itPrintersCount",
  props: {
    printers: {
      type: Array,
      required: true
    }
  },
  methods: {
    loadChart() {
      const newData = this.printers.map(d => d.count).reverse()
      const newDataLabels = this.printers.map(d => d.name).reverse()
      var options = {
        series: newData,
        labels: newDataLabels,

        plotOptions: {
          pie: {
            customScale: 1,
            donut: {
              size: '70%',
            },

          },
          stroke: {
            colors: undefined
          }
        },
        chart: {
          type: 'donut',
          height: 320,
        },
        legend: {
          show: false
        },
      };
      var chart = new ApexCharts(document.querySelector("#PrintersDonut"), options);
      chart.render();
    },

  },
  updated() {
    this.loadChart()
  }
}
</script>

<style scoped>

</style>