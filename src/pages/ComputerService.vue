<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">Обслуживание ПК</li>
    </ol>
  </nav>
  <computer-service-form></computer-service-form>
</template>

<script>
import ComputerServiceForm from "@/components/Devices/ComputerServiceForm";
export default {
  name: "ComputerService",
  components: {ComputerServiceForm}

}
</script>

<style scoped>

</style>