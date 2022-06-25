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
    <option disabled selected value="0">Выберите организацию</option>
    <option v-for="organization in organizations" :key="organization.id" :value="organization.id">{{ organization.title }}</option>
  </select>
</template>

<script>
export default {
  name: "itOrganizationSelector",
  data(){
    return {
      organizations: [
        {id: 1, title: "Таманьнефтегаз"},
        {id: 2, title: "ОТЭКО-Терминал"},
        {id: 3, title: "ОТЭКО-Портсервис"},
        {id: 4, title: "ОТЭКО"},
        {id: 5, title: "ЧОП ЗЕВС"},
        {id: 5, title: "ОТЭКО-ЦАСФ"},
        {id: 5, title: "Баярд"},
        {id: 5, title: "Ирида"},
      ]
    }
  }
}
</script>

<style scoped>

</style>