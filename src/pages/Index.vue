<template>
  <Header />
  <SideBar v-if="!isMobile" />
  <div class="main">
    <div class="content">
      <Preloader :isLoading="isLoadingPage" :left="12" />
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
import Preloader from "@/components/preloader/Preloader.vue";

export default {
  name: "Index",
  components: { Preloader, Footer, SideBar, Header },

  computed: {
    ...mapState(["isMobile", "isLoading"]),

    isLoadingPage() {
      return (
        this.isLoading &&
        Object.entries(this.isLoading)
          .map((loading) => loading[1])
          .some((loading) => loading)
      );
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
