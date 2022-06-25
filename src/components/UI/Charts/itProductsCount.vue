<template>
  <div id="ProductsBar"></div>
</template>

<script>
import ApexCharts from 'apexcharts'
export default {
  name: "itProductsCount",
  props: {
    products:{
      type: Array,
      required: true
    }
  },
  methods: {
    loadChart() {
      const dates = this.products.map(d => d.count).reverse()
      const names = this.products.map(d => d.id).reverse()
      var options = {
        chart: {
          type: 'bar',
          height: 320,
        },


        grid: {
          show: false,
          borderColor: undefined,
          strokeDashArray: 0,
          position: 'back',
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          },
          row: {
            colors: undefined,
            opacity: 0.2
          },
          column: {
            colors: undefined,
            opacity: 0.2
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
        },
        series: [{
          name: 'Количество',
          data: dates,
        }],
        xaxis: {
          categories: names
        }
      }

      var chart = new ApexCharts(document.querySelector("#ProductsBar"), options);

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