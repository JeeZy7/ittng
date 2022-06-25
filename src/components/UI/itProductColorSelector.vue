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
    <option value="0">Выберите цвет товара</option>
    <option v-for="color in colors" :key="color.id" :value="color.id">{{ color.title }}</option>
  </select>
</template>

<script>
export default {
  name: "itProductColorSelector",
  data(){
    return {
      colors: [
        {id: 1, title: "Черный"},
        {id: 2, title: "Голубой"},
        {id: 3, title: "Пурпурный"},
        {id: 4, title: "Желтый"},
        {id: 5, title: "Серый"},
        {id: 6, title: "Фото-черный"},
      ]
    }
  }
}
</script>

<style scoped>

</style>