<template>
  <transition name="loader" v-if="isLoading">
    <div class="preloader">
      <div class="preloader__row" :style="`left: calc(${left}vw + 50%);`">
        <div class="preloader__item"></div>
        <div class="preloader__item"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Preloader",

  props: ["isLoading", "left"],
};
</script>

<style lang="scss" scoped>
.loader-leave-active {
  transition: 0.5s all ease-out;
}

.loader-leave-to {
  opacity: 0;
}

.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99;
}

.preloader__row {
  position: relative;
  top: 50%;
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;
  text-align: center;
  animation: preloader-rotate 2s infinite linear;
}

.preloader__item {
  position: absolute;
  display: inline-block;
  top: 0;
  background-color: #337ab7;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  animation: preloader-bounce 2s infinite ease-in-out;
}

.preloader__item:last-child {
  top: auto;
  bottom: 0;
  animation-delay: -1s;
}

@keyframes preloader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes preloader-bounce {
  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}
</style>
