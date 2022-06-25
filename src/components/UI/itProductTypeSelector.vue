<template>
  <select name="" id="" style="
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
    <option disabled selected value="0">Выберите тип товара</option>
    <option v-for="type in types" :key="type.id" :value="type.id">{{ type.title }}</option>
  </select>
</template>

<script>
export default {
  name: "itProductTypeSelector",
  data(){
    return {
      types: [
        {id: 1, title: "Тонер-картидж"},
        {id: 2, title: "Узел проявки"},
        {id: 3, title: "Фотобарабан"},
        {id: 4, title: "Узел закрепления"},
        {id: 5, title: "Ролик"},
        {id: 6, title: "Контейнер с чернилами"},
        {id: 7, title: "Узел переноса изображения"},
        {id: 8, title: "Блок лазера"},
        {id: 9, title: "Рем. комплект"},
        {id: 10, title: "Тормозная площадка"},
        {id: 11, title: "Оперативная память"},
        {id: 12, title: "Процессор"},
        {id: 13, title: "Жесткий диск"},
        {id: 14, title: "SATA SSD"},
        {id: 15, title: "SATA M2"},
        {id: 16, title: "Аккумуляторная батарея"},
        {id: 17, title: "Блок питания"},
      ]
    }
  }
}
</script>

<style scoped>

</style>