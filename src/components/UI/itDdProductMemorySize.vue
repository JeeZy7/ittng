<template>
  <div @click="isVisible = !isVisible" id="dd_input" class="ui floating dropdown labeled icon button" >
    <span v-if="selectedItem" class="text">{{ selectedItem.title }}
      <svg v-if="!isVisible" class="arrow" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else class="arrow"  style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <span v-else class="text">Выберите объем памяти
      <svg v-if="!isVisible" class="arrow"  style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else class="arrow" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <div class="menu" v-if="isVisible" style="display: block">
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
        <div @click="selectItem(size)" class="item" v-for="(size, index) in filteredProductMemorySize" :key="`company-${index}`">
          {{ size.title }}
        </div>
        <div v-if="filteredProductMemorySize.length === 0" class="item">
          Не найдено совпадений
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "itDdProductMemorySize",
  data(){
    return {
      searchQuery: "",
      selectedItem: null,
      isVisible: false,
      memory_size: [
        {id: 1, title: "2GB"},
        {id: 2, title: "4GB"},
        {id: 3, title: "8GB"},
        {id: 4, title: "16GB"},
      ]
    }
  },
  props: {
    currentMemorySize: {
      type: String,
      required: true
    }
  },
  computed: {
    filteredProductMemorySize() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.memory_size
      }
      return this.memory_size.filter((size) => {
        return Object.values(size).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {

    selectItem(size) {
      this.selectedItem = size
      this.$emit('memory_size_id', this.selectedItem.id)
    },
    checkItem(){
      const result = this.memory_size.find((el) => el.id === parseInt(this.currentMemorySize))
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
</style>