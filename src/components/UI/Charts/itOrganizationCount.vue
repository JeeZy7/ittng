<template>
  <div id="OrganizationsBar"></div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  name: "itOrganizationCount",
  props: {
    organizations:{
      type: Array,
      required: true
    }
  },
  methods: {
    loadChart() {
      const dates = this.organizations.map(d => d.count).reverse()
      const names = this.organizations.map(d => d.id).reverse()
      var options = {
        series: [{
          data: dates
        }],
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: names,
        }
      }

      var chart = new ApexCharts(document.querySelector("#OrganizationsBar"), options);
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