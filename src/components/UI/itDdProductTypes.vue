<template>
  <div @click="isVisible = !isVisible" id="dd_input" class="ui floating dropdown labeled icon button">
    <span v-if="selectedItem" class="text">{{ selectedItem.title }}
      <svg v-if="!isVisible" class="arrow" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else class="arrow"  style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <span v-else class="text">Выберите тип товара
      <svg v-if="!isVisible" class="arrow"  style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else class="arrow" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <transition name="fade" appear>
    <div class="menu" v-if="isVisible && show" style="display: block;transform-origin: top;">
      <div class="ui icon search input" @click.stop>
        <i class="icon" style="display: flex;align-items: center;justify-content: center;">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </i>
        <input v-model="searchQuery" type="text" placeholder="Поиск..." style="border: 1px solid #e9ecef;">

      </div>
      <div class="divider"></div>

      <div class="scrolling menu" style="display: block">
        <div @click="selectItem(type)" class="item" v-for="(type, index) in filteredProductTypes" :key="`type-${index}`">
          {{ type.title }}
        </div>
        <div v-if="filteredProductTypes.length === 0" class="item">
          Не найдено совпадений
        </div>
      </div>

    </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "itDdProductTypes",
  data(){
    return {
      show: true,
      searchQuery: "",
      selectedItem: null,
      isVisible: false,
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
  },
  props: {
    currentType: {
      type: String,
      required: true
    }
  },
  computed: {
    filteredProductTypes() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.types
      }
      return this.types.filter((type) => {
        return Object.values(type).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {

    selectItem(type) {
      this.selectedItem = type
      this.$emit('type_id', this.selectedItem.id)
    },
    checkItem(){
      const result = this.types.find((el) => el.id === parseInt(this.currentType))
      this.selectedItem = result

    }
  },
  async mounted() {
    this.checkItem()
  }
}
</script>

<style scoped>
  #dd_input:hover{
    border: 1px solid #2f73e9;
    transition: 0.4s;
  }
  #dd_input:hover .arrow{
    color: #2f73e9;
    transition: 0.4s;
  }
  #dd_input{
    width: 100%;
    padding-left: 0.8rem !important;
    padding-top: 0.469rem;
    padding-bottom: 0.469rem;
    display: block;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border: 1px solid rgb(233, 236, 239);
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  }
  .arrow{
    color: #c0c2c5;
  }

  .fade-enter-active {
    animation: fade-in ease .3s;
  }
  .fade-leave-active {
    animation: fade-in .3s reverse;
  }
  @keyframes fade-in {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }

  }

</style>