<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Обслуживание принтеров</li>
    </ol>
  </nav>
  <service-form></service-form>
</template>

<script>
import ServiceForm from "@/components/Service/ServiceForm";

export default {
  name: "ServicePage",
  components: {
    ServiceForm
  }
}
</script>

<style scoped>

</style>