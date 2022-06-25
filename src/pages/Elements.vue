<template>
  <it-select-products @selectedProducts="SelectProducts"></it-select-products>
  <div class="table-responsive" style="margin-top: 0rem;padding: 1rem!important;padding-top: 0px!important;background-color: #e4e7ec57;border-radius: 6px;" id="myTable">
    <table class="table table-hover mb-0">
      <thead>
      <tr style="border-bottom: 1px solid #e9ecef;">
        <th style="text-align: center;color: black">#</th>
        <th style="vertical-align: baseline;text-transform: initial;color: black">Наименование товара</th>
        <th style="padding: 0px; vertical-align: baseline; text-transform: initial; color: black;text-align: end;padding-right: 1rem;">Количество</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in Products" :key="item.id" :item="item" style="border-style: hidden;">
        <td style="vertical-align: middle;text-align: center;">{{ index+1}}</td>
        <td style="vertical-align: middle;">{{ item.name }}</td>
        <td style="text-align: center;display: flex;justify-content: flex-end;border-bottom: 0;">
          <div class="el-input" style="float: right">
            <div v-if="item.count > 1" @click="item.count = item.count-1" class="el-input-btn">
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
              <input type="number" v-model="item.count" :min="1" :max="200">
            </div>
            <div @click="item.count = item.count+1" class="el-input-btn">
              <svg style="width:20px;height:20px;color: #a9aeb5;" viewBox="0 0 24 24"><path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "ElementsPage",
  components: {

  },
  data(){
    return{
      FirstArray: [
      {id: 1, name: "Жесткий диск Samsung 950 EVO", count: 0},
      {id: 2, name: "Узел проявки Kyocera DV-5280M", count: 0},
      {id: 3, name: "Оперативная память Kingston KVR26S19S6/4", count: 0},
      {id: 4, name: "Тормозная площадка Kyocera отделения автоподатчика", count: 0},
      {id: 1, name: "Жесткий диск Samsung 950 EVO", count: 0},
      {id: 2, name: "Узел проявки Kyocera DV-5280M", count: 0},
        {id: 6, name: "Тонер-картридж Epson C13T673t", count: 0},
    ],
      SecondArray: [
        {id: 1, name: "Жесткий диск Samsung 950 EVO", count: 0},
        {id: 2, name: "Узел проявки Kyocera DV-5280M", count: 0},
        {id: 5, name: "Тонер-картридж Epson C13T67354A", count: 0},
        {id: 6, name: "Тонер-картридж Epson C13T673t", count: 0},
        {id: 7, name: "Тонер-картридж Epson C13T673t", count: 0},
      ]
    }
  },
  methods: {
    SelectProducts(data){
      console.log(data)
      this.FirstArray.push({id: 8, name: "Жесткий диск Samsung 990 EVO", count: 0})
    },

  },
  computed: {
    Products(){
      if(this.FirstArray.length){
        const arr = this.FirstArray
        const result = []
        const dublicatesIncludes = []
        arr.forEach((current, index) => {
          if(dublicatesIncludes.includes(index)) return

          result.push(current)

          for(let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++){
            const comparison = arr[comparisonIndex]
            const currentKey = Object.keys(current)
            const comparisonKeys = Object.keys(comparison)

            if(currentKey.length !== comparisonKeys.length) continue

            const currentKeysString = currentKey.sort().join("").toLowerCase()
            const comparisonKeysString = currentKey.sort().join("").toLowerCase()
            if(currentKeysString !== comparisonKeysString) continue

            let valuesEqual = true
            for(let i = 0; i<currentKey.length; i++){
              const key = currentKey[i]
              if(current[key] !== comparison[key]){
                valuesEqual = false
                break
              }

            }
            if(valuesEqual) dublicatesIncludes.push(comparisonIndex)
          }
        })
        console.log(result)
        return result
      }else {
        return this.FirstArray
      }
      }

  },
  async mounted(){

  }

}
</script>

<style scoped>
.button {
  border: none;
  color: #FFF;
  background: #42b983;
  appearance: none;
  font: inherit;
  font-size: 1.8rem;
  padding: .5em 1em;
  border-radius: .3em;
  cursor: pointer;
}

.modal {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  max-width: 22em;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #FFF;
  z-index: 999;
  transform: none;
}
.modal h1 {
  margin: 0 0 1rem;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }

}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>