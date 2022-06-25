<template>
  <div style="display: flex;align-items: center;color: #e4e7ec;margin-left: 0px!important;">
  <svg style="width:20px;height:20px;position: absolute;margin-left: 5px" viewBox="0 0 24 24">
    <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
  </svg>
  <input type="text" style="margin-left: 0rem;border-radius: 4px;border: 2px solid #e4e7ec;padding: 2px;width: 200px;padding-left: 30px!important;"
         placeholder="Поиск в таблице..."
         v-model="queryText"
         />
  </div>
</template>

<script>
export default {
  name: "itSearch",
  data(){
    return {
      queryText: ""
    }
  }

}
</script>

<style scoped>

</style>