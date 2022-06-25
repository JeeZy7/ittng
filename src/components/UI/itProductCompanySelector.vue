<template>
  <select name="" style="
                        display: block;
                        width: 100%;
                        padding: 0.469rem 0.8rem;
                        font-size: .875rem;
                        font-weight: 400;
                        line-height: 1.5;
                        color: #000;
                        background-color: #fff;
                        background-clip: padding-box;
                        border: 1px solid #e9ecef;
                        appearance: none;
                        border-radius: 0.25rem;
                        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                    ">
    <option disabled value="0">Выберите производителя</option>
    <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.title }}</option>
  </select>
</template>

<script>
export default {
  name: "itProductCompanySelector",
  data(){
    return {
      companies: [
        {id: 1, title: "Kyocera"},
        {id: 2, title: "HP"},
        {id: 3, title: "Canon"},
        {id: 4, title: "Epson"},
        {id: 5, title: "Ricoh"},
        {id: 6, title: "Kingston"},
        {id: 7, title: "Samsung"},
        {id: 8, title: "Delta"},
      ]
    }
  }
}
</script>

<style scoped>

</style>