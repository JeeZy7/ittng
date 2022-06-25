<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="/" data-link="">Главная</a></li>
      <li class="breadcrumb-item active" aria-current="page">История операций</li>
    </ol>
  </nav>
  <history-page></history-page>
</template>

<script>
import HistoryPage from "@/components/History/HistoryPage";
export default {
  name: "HistoryPage",
  components: {
    HistoryPage
  }
}
</script>

<style scoped>

</style>