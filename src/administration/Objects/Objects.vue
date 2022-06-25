<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Сущности и объекты</li>
    </ol>
  </nav>
  <div class="row" style="">

    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title" style="margin-bottom: 1rem;"><svg style="width:20px;height:20px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18,1.83C17.5,1.83 17,2 16.59,2.41C13.72,5.28 8,11 8,11L9.5,12.5L6,16H4L2,20L4,22L8,20V18L11.5,14.5L13,16C13,16 18.72,10.28 21.59,7.41C22.21,6.5 22.37,5.37 21.59,4.59L19.41,2.41C19,2 18.5,1.83 18,1.83M18,4L20,6L13,13L11,11L18,4Z"></path>
          </svg>
            Типы товаров</h6>
          <form class="forms-sample" @submit.prevent>
            <div class="container-fluid mt-5 d-flex justify-content-center w-100">
              <div class="table-responsive w-100">
                <table class="table table-bordered" id="table">
                  <thead>
                  <tr>
                    <th>Наименование</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr class="text-end">
                    <td class="text-start" style="vertical-align: middle;">
                      <div class="container-fluid w-100" style="padding: 0;">
                        <button type="button" class="btn btn-outline-primary btn-icon-text me-2 mb-2 mb-md-0">
                          Добавить новый тип
                        </button>

                      </div>
                    </td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start" style="display: flex;align-items: center;justify-content: space-between;">Тонер-картридж
                      <button class="btn btn-inverse-primary btn-inverse-secondary" style="padding: 0px 5px; font-weight: 500; float: right;">
                        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start" style="display: flex;align-items: center;justify-content: space-between;">Узел проявки
                      <button class="btn btn-inverse-primary btn-inverse-secondary" style="padding: 0px 5px; font-weight: 500; float: right;">
                        <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Фотобарабан</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Узел закрепления</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Ролик</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Контейнер с чернилами</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Узел переноса изображения</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Блок лазера</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Рем. комплект</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Тормозная площадка</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Оперативная память</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Процессор</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Жесткий диск</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">SATA SSD</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">SATA M2</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Аккумуляторная батарея</td>
                  </tr>
                  <tr class="text-end" >
                    <td class="text-start">Блок питания</td>
                  </tr>

                  </tbody>
<!--                  <tbody v-for="(item, index, val) in report_request" :key="item.id">-->
<!--                  <tr v-if="item.length > 1" class="text-end">-->
<!--                    <td :rowspan="item.length+1" class="text-start" style="vertical-align: middle;">{{ val+1 }}</td>-->
<!--                    <td :rowspan="item.length+1" class="text-start" style="vertical-align: middle;">{{ index }}</td>-->
<!--                  </tr>-->

<!--                  <tr class="text-end" v-for="element in item" :key="element.id">-->
<!--                    <td v-if="item.length === 1" class="text-start">{{ val+1 }}</td>-->
<!--                    <td v-if="item.length === 1" class="text-start">{{ index }}</td>-->
<!--                    <td class="text-start">{{ element.product_id }}</td>-->
<!--                    <td>{{ element.count }}</td>-->
<!--                  </tr>-->
<!--                  </tbody>-->
                </table>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="col-md-6 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h6 class="card-title" style="margin-bottom: 1rem;"><svg style="width:20px;height:20px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18,1.83C17.5,1.83 17,2 16.59,2.41C13.72,5.28 8,11 8,11L9.5,12.5L6,16H4L2,20L4,22L8,20V18L11.5,14.5L13,16C13,16 18.72,10.28 21.59,7.41C22.21,6.5 22.37,5.37 21.59,4.59L19.41,2.41C19,2 18.5,1.83 18,1.83M18,4L20,6L13,13L11,11L18,4Z"></path>
          </svg>
            Обслуживание принтера</h6>
          <form class="forms-sample" @submit.prevent>
            <div class="mb-3">
              <label class="form-label">Выберите устройство</label>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 300px; overflow: auto; display: none;"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Склад списания</label>
            </div>
            <div class="mb-3">
              <label class="form-label">Выберите товар</label>
              <div class="dropdown-menu" id="printers_dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 300px; overflow: auto; display: none;"></div>
            </div>
            <div class="mb-3">
              <label class="form-label">Тип операции</label>

            </div>
            <div class="mb-3">
              <label class="form-label">Укажите пробег устройства</label>

            </div>
            <div class="mb-3">
              <label class="form-label">Добавьте комментарий</label>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ObjectsPage",
  components: {

  },
  data(){
    return{
      value: 1,
      products: [],
      showModal: false
      // selectedItem: null

    }
  },
  methods: {
    // getProduct(data){
    //   this.selectedItem.push({'id': data.id, 'title': data.type+' '+data.company+' '+data.name, 'count': 1})
    // },

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