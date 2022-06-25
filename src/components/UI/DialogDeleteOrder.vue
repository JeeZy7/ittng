<template>
  <div class="modal-header">
    <h5 class="modal-title">Удаление</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="btn-close" data-inventory-transfer-close=""></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0.5rem">
      <form class="forms-sample">
        <div class="mb-3">Вы действительно хотите удалить выбранные поставки ({{features.length}})?</div>
      </form>
    </div>
  </div>
  <div class="modal-footer">

    <button @click="deleteOrders" type="button" class="btn btn-primary">Да</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" data-inventory-transfer-close="0" style="display: block;">Нет</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DialogDeleteOrder",
  props: {
    features: {
      type: Array,
      required: true
    },
  },
  methods: {
    deleteOrders(){
      axios
          .post("http://ittng.ru/server/delete_order.php", {
            features:this.features
          })
          .then(response => {
            this.$emit('update',response)
          })
          .catch(function(e){
            this.error = e;
          });
    }
  }
}
</script>

<style scoped>

</style>