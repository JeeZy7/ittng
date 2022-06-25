<template>
  <div @click="isVisible = !isVisible" class="ui floating dropdown labeled icon button" style="width: 100%;padding-left: 0.8rem !important;padding-top: .469rem;padding-bottom: .469rem;display: block;font-size: 0.875rem;font-weight: 400;line-height: 1.5;color: rgb(0, 0, 0);background-color: rgb(255, 255, 255);background-clip: padding-box;border: 1px solid rgb(233, 236, 239);appearance: none;border-radius: 0.25rem;transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;">
    <span v-if="selectedItem" class="text">{{ selectedItem.title }}
      <svg v-if="!isVisible" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;color: #c0c2c5;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;color: #c0c2c5;">
        <path fill="currentColor" d="M7,15L12,10L17,15H7Z" />
      </svg>
    </span>
    <span v-else class="text">Выберите товар
      <svg v-if="!isVisible" style="width: 24px; height: 24px;position: absolute;right: 5px;top: 5px;color: #c0c2c5;">
          <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
      </svg>
      <svg v-else style="width: 24px; height: 24px;position: absolute;right: 5px;top: 4px;color: #c0c2c5;">
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
        <div @click="selectItem(product)" class="item" v-for="(product, index) in filteredOrganizations" :key="`product-${index}`">
          {{ product.title }}
        </div>
        <div v-if="filteredOrganizations.length === 0" class="item">
          Не найдено совпадений
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "itDdProduct",
  data(){
    return {
      searchQuery: "",
      selectedItem: null,
      isVisible: false,
      products: [
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
  },
  computed: {
    filteredOrganizations() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery === "") {
        return this.products
      }
      return this.products.filter((organization) => {
        return Object.values(organization).some((word) =>
            String(word).toLowerCase().includes(query)
        )
      })
    }
  },
  methods: {

    selectItem(organization) {
      this.selectedItem = organization
      this.$emit('organization_id', this.selectedItem.id)
    }
  }
}
</script>

<style scoped>

</style>