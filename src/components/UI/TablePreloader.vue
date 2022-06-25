<template>
  <div class="preloader">
    <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
  </div>
</template>

<script>
export default {
  name: "TablePreloader"
}
</script>

<style scoped>
.preloader{
  width: 81%;
  margin-top: 2.7rem;
  height: 300px;
  background-color: #f9fafb;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circular{
  height: 42px;
  width: 42px;
  transition: all 0.5s ease;
  animation: rotate 1s linear infinite;
}
.path{

  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 3;
  stroke: #6571ff;
  stroke-linecap: round;
}
@keyframes rotate {
  from {
    transform: rotate(-360deg);
  }
}
</style>