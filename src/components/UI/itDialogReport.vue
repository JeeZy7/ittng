<template>
  <transition name="fade" appear>
    <div class="modal-overlay"
         @click="CloseModal"
    ></div>
  </transition>
  <transition name="bounce" appear>
    <div class="modal">
      <div class="modal-content" style="border: none;">
        <slot>

        </slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "itDialog",
  props: {

  },

  methods: {
    CloseModal(){
      this.$emit('closePopup')
    }
  },



}
</script>

<style scoped>
.modal {
  width: 600px;
  position: absolute;
  overflow: inherit;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: max-content;
  border-radius: 0.5rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #FFF;
  z-index: 2;
  transform: none;
  transform-origin: top;
}

.modal-overlay {
  content: '';
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: #2c3e506b;
  cursor: pointer;
}
.leave{
  animation: fade-in .5s reverse;
}
.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }

}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }

}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>