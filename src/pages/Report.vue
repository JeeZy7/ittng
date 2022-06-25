<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Отчеты</li>
    </ol>
  </nav>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="container-fluid d-flex justify-content-between">
            <div class="col-lg-3 ps-0">
              <a href="#" class="noble-ui-logo d-block mt-3">it<span>TNG</span></a>
              <p class="mt-1 mb-1"><b>ЗАО «Таманьнефтегаз»</b></p>
              <p>353535, Россия, Краснодарский край,<br> Темрюкский район, п. Волна,<br>ул. Таманская, д. 8</p>
            </div>
            <div class="col-lg-3 pe-0">
              <h4 class="fw-bolder text-uppercase text-end mt-4 mb-2">Отчет</h4>
              <h6 class="text-end mb-5 pb-4"># INV-002308</h6>
              <h6 class="mb-0 mt-3 text-end fw-normal mb-2"><span class="text-muted">Период отчета:</span> 2 квартал 2022</h6>
            </div>
          </div>
          <div class="container-fluid mt-5 d-flex justify-content-center w-100">
            <div class="table-responsive w-100">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Наименование товара</th>
                  <th class="text-end">Реализовано</th>
                  <th class="text-end">Остаток</th>
                  <th class="text-end">C/З</th>
                  <th class="text-end">Закупить</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-end">
                  <td class="text-start">1</td>
                  <td class="text-start">Узел проявки Kyocera DV-5280M Черный</td>
                  <td>8</td>
                  <td>7</td>
                  <td>4</td>
                  <td style="background-color: #21ba2147">5</td>
                </tr>

                </tbody>
              </table>
            </div>
          </div>
          <div class="container-fluid mt-5 w-100">
            <div class="row">
              <div class="col-md-6 ms-auto">
                <div class="table-responsive">
                  <table class="table">
                    <tbody>
                    <tr>
                      <td>Общее число позиций</td>
                      <td class="text-end">3 поз.</td>
                    </tr>
                    <tr>
                      <td>Общее число закупки</td>
                      <td class="text-end">69 шт.</td>
                    </tr>
                    <tr>
                      <td class="text-bold-800">Общее число реализованных товаров</td>
                      <td class="text-bold-800 text-end"> 37 шт.</td>
                    </tr>
                    <tr class="bg-light">
                      <td class="text-bold-800">Общий остаток товаров</td>
                      <td class="text-bold-800 text-end">32 шт.</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="container-fluid w-100">
            <a href="javascript:;" class="btn btn-primary float-end mt-4 ms-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send me-3 icon-md"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>Сохранить</a>
            <a href="javascript:;" class="btn btn-outline-primary float-end mt-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer me-2 icon-md"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>Распечатать</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportPage"
}
</script>

<style scoped>

</style>