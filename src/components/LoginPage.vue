<template>
  <div class="modal" style="background-color: #f4f4f4;justify-content: center;">
    <div @click.stop class="modal-dialog" style="min-width: 700px;margin: auto auto;">
      <div class="modal-content" style="">
        <div class="row w-100 mx-0 auth-page">
          <div class="col-md-8 col-xl-12 mx-auto" style="padding: 0;">
            <div class="card">
              <div class="row">
                <div class="col-md-4 pe-md-0">
                  <div class="auth-side-wrapper">

                  </div>
                </div>
                <div class="col-md-8 ps-md-0">
                  <div class="auth-form-wrapper px-4 py-5">
                    <a href="#" class="noble-ui-logo d-block mb-2">it<span>TNG</span></a>
                    <h5 class="text-muted fw-normal mb-4">Система учета расходных материалов отдела связи и ИТ</h5>
                    <form class="forms-sample">
                      <div class="mb-3">
                        <label for="userEmail" class="form-label">Логин</label>
                        <input type="email" class="form-control" id="userEmail" placeholder="Введите логин"
                               :value="block.login"
                               @input="block.login = $event.target.value">
                      </div>
                      <div class="mb-3">
                        <label for="userPassword" class="form-label">Пароль</label>
                        <input type="password" class="form-control" id="userPassword" autocomplete="current-password" placeholder="Введите пароль"
                               :value="block.password"
                               @input="block.password = $event.target.value">
                      </div>

                      <div>
                        <button @click="checkUser" type="button" class="btn btn-primary me-2 mb-2 mb-md-0 text-white">Войти</button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
            <div class="alert alert-primary" role="alert" style="display: none;margin-top: 28px;width: 100%;">

            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import axios from "axios";
export default {
  name: "LoginPage",
  data(){
    return {
      block: {
        login: '',
        password: ''
      },
      response: ''
    }
  },
  methods: {
    checkUser(){
      axios
          .post("http://ittng.ru/server/autorization.php",{block:this.block})
          .then(response => {
            // this.$emit('update',response)
            // this.product_info = response.data
            // this.response = response.data('action')
            if(response.data == 0){
              console.log("Данные введены не верно!")
            }else{
              router.push('statistic')
              console.log("Данные введены верно!")
            }

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