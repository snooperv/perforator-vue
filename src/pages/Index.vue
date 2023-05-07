<template>
  <Header />
  <SideBar v-if="!isMobile" />
  <div class="main">
    <transition name="loader">
      <div class="preloader" v-if="isLoadingPage">
        <div class="preloader__row">
          <div class="preloader__item"></div>
          <div class="preloader__item"></div>
        </div>
      </div>
    </transition>
    <div class="content">
      <router-view />
    </div>
  </div>
  <Footer v-if="isMobile" />
</template>

<script>
import Header from "@/components/layouts/Header/Header.vue";
import SideBar from "@/components/layouts/SideBar";
import { mapState } from "vuex";
import Footer from "@/components/layouts/Footer/Footer.vue";

export default {
  name: "Index",
  components: { Footer, SideBar, Header },

  computed: {
    ...mapState(["isMobile", "isLoading"]),

    isLoadingPage() {
      return Object.entries(this.isLoading)
        .map((loading) => loading[1])
        .some((loading) => loading);
    },
  },

  mounted() {
    this.$route.path === "/" && this.$router.push("/self-review");
    this.$store.dispatch("getMyProfile");
    window.addEventListener("resize", this.updateIsMobile);
  },

  methods: {
    updateIsMobile() {
      this.$store.state.isMobile = window.innerWidth <= 800;
    },
  },

  unmounted() {
    window.removeEventListener("resize", this.updateIsMobile);
  },
};
</script>

<style lang="scss">
body {
  overflow-x: hidden;
  background-color: #f8f8fa;
}

.main {
  display: grid;
  grid-template-columns: 20vw auto;
  grid-template-rows: 75px auto;
  background-color: #f8f8fa;
}

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
  left: 50%;
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

.content {
  background-color: #f8f8fa;
  grid-column-start: 2;
  grid-row-start: 2;
}

@media (max-width: 800px) {
  .main {
    /*grid: unset;*/
    display: block;
  }

  .content {
    margin-top: 75px;
  }

  .menu {
    display: none;
  }
}
</style>
