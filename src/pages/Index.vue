<template>
  <Header />
  <SideBar />
  <div class="main">
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/SideBar";

export default {
  name: "Index",
  components: { SideBar, Header },

  mounted() {
    this.$route.path === "/" && this.$router.push("/self-review");
    this.$store.dispatch("getMyProfile");
  },
};
</script>

<style>
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
