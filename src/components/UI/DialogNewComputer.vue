<template>
  <div class="modal-header">
    <h5 class="modal-title">
      Новое устройство</h5>
    <button
        @click="hideDialog"
        type="button"
        class="btn-close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="card-body" style="padding: 0rem 1rem;">
      <form class="forms-sample" @submit.prevent>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Тип устройства</label>
          <label class="form-label">Производитель</label>
          <it-dd-computer-type></it-dd-computer-type>
          <it-dd-computer-company></it-dd-computer-company>
        </div>

        <div class="mb-3">
          <label class="form-label">Модель</label>
          <it-dd-computer-model></it-dd-computer-model>
        </div>
        <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
          <label class="form-label">Инвентарный номер</label>
          <label class="form-label">Серийный номер</label>
          <it-input
              type="text"
              autocomplete="off"
              placeholder="Введите инвентарный номер"
          ></it-input>
          <it-input
              type="text"
              autocomplete="off"
              placeholder="Введите серийный номер"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Ответственный</label>
          <it-input
              type="text"
              autocomplete="off"
              placeholder="Введите тип устройства"
          ></it-input>
        </div>
        <div class="mb-3">
          <label class="form-label">Статус</label>
          <it-input
              type="text"
              autocomplete="off"
              placeholder="Введите тип устройства"
          ></it-input>
        </div>

      </form>
    </div>
  </div>
  <div class="modal-footer">

    <button  type="button" class="btn btn-primary">Сохранить</button>
    <button type="button" class="btn btn-secondary" value="" data-submit="" style="display: none;">Отмена</button>
  </div>
</template>

<script>
export default {
  name: "DialogNewComputer",
  components: {}

}
</script>

<style scoped>

</style>