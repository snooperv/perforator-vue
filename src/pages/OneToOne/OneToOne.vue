<template>
  <div class="container">
    <h1 class="main-title">1-on-1</h1>
    <div class="double-links" id="dl">
      <router-link class="d-link dactive" to="/1to1/current">
        текущие
      </router-link>
      <router-link class="d-link second-link" to="/1to1/previous">
        прошлые периоды
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "OneToOne",

  mounted() {
    this.$route.path === "/1to1" && this.$router.push("/1to1/current");
  },
};
</script>

<style lang="scss" src="./oneToOne.scss" scoped></style>