<template>
  <div class="row" style="justify-content: center;">

    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title" style="margin-bottom: 1rem;"><svg style="width:20px;height:20px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18,1.83C17.5,1.83 17,2 16.59,2.41C13.72,5.28 8,11 8,11L9.5,12.5L6,16H4L2,20L4,22L8,20V18L11.5,14.5L13,16C13,16 18.72,10.28 21.59,7.41C22.21,6.5 22.37,5.37 21.59,4.59L19.41,2.41C19,2 18.5,1.83 18,1.83M18,4L20,6L13,13L11,11L18,4Z"></path>
          </svg>
            Обслуживание ПК</h6>
          <form class="forms-sample" @submit.prevent>
            <div class="mb-3">
              <label class="form-label">Выберите устройство</label>
              <it-dd-computer></it-dd-computer>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 300px; overflow: auto; display: none;"></div>
            </div>
            <div class="mb-3" style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 0px 20px;">
              <label class="form-label">Выберите товар</label>
              <label class="form-label">Выберите склад списания</label>
              <it-dd-product></it-dd-product>
              <it-dd-sklads></it-dd-sklads>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 300px; overflow: auto; display: none;"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Тип операции</label>
              <it-dd-operation-type></it-dd-operation-type>
            </div>
            <div class="mb-3">
              <label class="form-label">Добавьте комментарий</label>
              <input type="text" class="form-control" autocomplete="off" placeholder="..." value="">
            </div>
            <div class="mb-3">
              <button
                  @click="submitBlock"
                  type="submit"
                  class="btn btn-primary me-2"
                  style="float: right;margin-top: 20px;margin-right: 0rem!important;"
              >Выполнить
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import components from "@/components/UI"
export default {
  components: {components},
  name: "ComputerServiceForm"
}
</script>

<style scoped>

</style>