<template>
  <div class="main-wrapper">
    <nav class="sidebar" style="z-index: 1">
      <div class="sidebar-header">
        <router-link to="/statistic">
        <a href="#" class="sidebar-brand">
          it<span>TNG</span>
        </a>
        </router-link>
      </div>
      <div class="sidebar-body">
        <ul class="nav">
          <li class="nav-item nav-category">Основное</li>
          <router-link to="/statistic">
          <li class="nav-item" style="margin-bottom: 10px;">
            <div class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
              <span class="link-title" style="margin-left: 10px;">Статистика</span>
            </div>
          </li>
          </router-link>
          <router-link to="/reports">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6M6,4H13V9H18V20H6V4M8,12V14H16V12H8M8,16V18H13V16H8Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">Отчеты</span>
              </div>
            </li>
          </router-link>
          <router-link to="/service">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:20px;height:20px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18,1.83C17.5,1.83 17,2 16.59,2.41C13.72,5.28 8,11 8,11L9.5,12.5L6,16H4L2,20L4,22L8,20V18L11.5,14.5L13,16C13,16 18.72,10.28 21.59,7.41C22.21,6.5 22.37,5.37 21.59,4.59L19.41,2.41C19,2 18.5,1.83 18,1.83M18,4L20,6L13,13L11,11L18,4Z"></path>
                </svg>
                <span class="link-title" style="margin-left: 10px;">Обслуживание принтера</span>
              </div>
            </li>
          </router-link>
<!--          <router-link to="/computerservice">-->
<!--            <li class="nav-item" style="margin-bottom: 10px;">-->
<!--              <div class="nav-link">-->
<!--                <svg style="width:20px;height:20px" viewBox="0 0 24 24">-->
<!--                  <path fill="currentColor" d="M18,1.83C17.5,1.83 17,2 16.59,2.41C13.72,5.28 8,11 8,11L9.5,12.5L6,16H4L2,20L4,22L8,20V18L11.5,14.5L13,16C13,16 18.72,10.28 21.59,7.41C22.21,6.5 22.37,5.37 21.59,4.59L19.41,2.41C19,2 18.5,1.83 18,1.83M18,4L20,6L13,13L11,11L18,4Z"></path>-->
<!--                </svg>-->
<!--                <span class="link-title" style="margin-left: 10px;">Обслуживание ПК</span>-->
<!--              </div>-->
<!--            </li>-->
<!--          </router-link>-->
          <router-link to="/history">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="link-title" style="margin-left: 10px;">История</span>
              </div>
            </li>
          </router-link>
          <li class="nav-item nav-category">ПОСТУПЛЕНИЯ</li>
          <router-link to="/orders">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                <span class="link-title" style="margin-left: 10px;">Поставки</span>
              </div>
            </li>
          </router-link>
          <router-link to="/transfers">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg viewBox="0 0 24 24" style="width: 24px; height: 24px;"><path fill="currentColor" d="M21,9L17,5V8H10V10H17V13M7,11L3,15L7,19V16H14V14H7V11Z"></path></svg>
                <span class="link-title" style="margin-left: 10px;">Перемещения</span>
              </div>
            </li>
          </router-link>
          <li class="nav-item nav-category">МЕСТА ХРАНЕНИЯ</li>
          <router-link to="/products">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-package"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                <span class="link-title" style="margin-left: 10px;">Склады</span>
              </div>
            </li>
          </router-link>
          <li class="nav-item nav-category">УЧЕТ ОБОРУДОВАНИЯ</li>
          <router-link to="/printers">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 8C20.66 8 22 9.34 22 11V17H18V21H6V17H2V11C2 9.34 3.34 8 5 8H6V3H18V8H19M8 5V8H16V5H8M16 19V15H8V19H16M18 15H20V11C20 10.45 19.55 10 19 10H5C4.45 10 4 10.45 4 11V15H6V13H18V15M19 11.5C19 12.05 18.55 12.5 18 12.5C17.45 12.5 17 12.05 17 11.5C17 10.95 17.45 10.5 18 10.5C18.55 10.5 19 10.95 19 11.5Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">Принтеры и МФУ</span>
              </div>
            </li>
          </router-link>
<!--          <router-link to="/computers">-->
<!--            <li class="nav-item" style="margin-bottom: 10px;">-->
<!--              <div class="nav-link">-->
<!--                <svg style="width:24px;height:24px" viewBox="0 0 24 24">-->
<!--                  <path fill="currentColor" d="M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z" />-->
<!--                </svg>-->
<!--                <span class="link-title" style="margin-left: 10px;">ПК и комплектующие</span>-->
<!--              </div>-->
<!--            </li>-->
<!--          </router-link>-->
          <router-link to="/elements">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6,2C4.89,2 4,2.89 4,4V12C4,13.11 4.89,14 6,14H18C19.11,14 20,13.11 20,12V4C20,2.89 19.11,2 18,2H6M6,4H18V12H6V4M4,15C2.89,15 2,15.89 2,17V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V17C22,15.89 21.11,15 20,15H4M8,17H20V20H8V17M9,17.75V19.25H13V17.75H9M15,17.75V19.25H19V17.75H15Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">Элементы</span>
              </div>
            </li>
          </router-link>
          <li class="nav-item nav-category">Администрирование</li>
          <router-link to="/objects">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2,3H19A2,2 0 0,1 21,5V9H19V5H2V19H19V15H21V19A2,2 0 0,1 19,21H2A2,2 0 0,1 0,19V5A2,2 0 0,1 2,3M17,15V13H24V11H17V9L13,12L17,15M4,13H11V11H4V13M4,9H11V7H4V9M4,17H8V15H4V17Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">Сущности и объекты</span>
              </div>
            </li>
          </router-link>
          <router-link to="/elements">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.11 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.11 18 23 17.11 23 16V4C23 2.9 22.11 2 21 2M21 16H3V4H21V16M15.84 8.2L14.83 9.21L12.76 7.18L13.77 6.16C13.97 5.95 14.31 5.94 14.55 6.16L15.84 7.41C16.05 7.62 16.06 7.96 15.84 8.2M8 11.91L12.17 7.72L14.24 9.8L10.08 14H8V11.91Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">Страницы и компоненты</span>
              </div>
            </li>
          </router-link>
          <router-link to="/elements">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M8,9A2,2 0 0,1 10,11A2,2 0 0,1 8,13A2,2 0 0,1 6,11A2,2 0 0,1 8,9M12,17H4V16C4,14.67 6.67,14 8,14C9.33,14 12,14.67 12,16V17M20,8H14V10H20V8M20,12H14V14H20V12M20,16H14V18H20V16M22,4H14V6H22V20H2V6H10V4H2A2,2 0 0,0 0,6V20A2,2 0 0,0 2,22H22A2,2 0 0,0 24,20V6A2,2 0 0,0 22,4M13,6H11V2H13V6Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">Пользователи</span>
              </div>
            </li>
          </router-link>
          <router-link to="/elements">
            <li class="nav-item" style="margin-bottom: 10px;">
              <div class="nav-link">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 16C12.8 16 13.57 15.93 14.31 15.82L17.22 12.91C15.89 13.59 14 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11S16.53 10.47 18 9.64V12.13L19.39 10.74C19.57 10.56 19.78 10.42 20 10.3V7C20 4.79 16.42 3 12 3S4 4.79 4 7V17C4 19.04 7.06 20.72 11 20.97V19.13L11.17 18.96C7.84 18.76 6 17.46 6 17V14.77C7.61 15.55 9.72 16 12 16M12 5C15.87 5 18 6.5 18 7S15.87 9 12 9 6 7.5 6 7 8.13 5 12 5M19.13 13.83L21.17 15.87L15.04 22H13V19.96L19.13 13.83M22.85 14.19L21.87 15.17L19.83 13.13L20.81 12.15C21 11.95 21.33 11.95 21.53 12.15L22.85 13.47C23.05 13.67 23.05 14 22.85 14.19Z" />
                </svg>
                <span class="link-title" style="margin-left: 10px;">База данных</span>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </nav>
    <div class="page-wrapper">

      <nav class="navbar" style="z-index: 1">
        <a href="#" class="sidebar-toggler" id="sidebar-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </a>
        <div class="navbar-content">
          <form class="search-form">
            <div class="input-group">
              <div class="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
              <input type="text" class="form-control" id="navbarForm" placeholder="Поиск...">
            </div>
          </form>
          <ul class="navbar-nav">

          </ul>
        </div>
      </nav>
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<!--<ToDoList v-bind:todos="todos"></ToDoList>-->
<script>

import axios from "axios";
export default {
  name: 'app',
  data () {
    return {
      products: [],
      error: '',

    }
  },
  components: {

  },
  mounted: function() {
    axios
        .post("http://ittng.ru/server/get_products.php")
        .then(response => {
          this.products = response.data;
        })
        .catch(function(e){
          this.error = e;
        });
  }

}
</script>

<style>

</style>
