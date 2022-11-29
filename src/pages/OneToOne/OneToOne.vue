<template>
  <div class="container">
    <h1 class="main-title">1-on-1</h1>
    <div class="double-links" id="dl">
      <router-link class="d-link dactive" to="/1to1/current">
        текущие</router-link
      >
      <router-link class="d-link second-link" to="/1to1/previous">
        прошлые периоды</router-link
      >
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

<style scoped>
h2 {
  display: inline-block;
  color: #222;
  font-size: 32px;
}

.main-title {
  text-align: left;
  color: #222;
  margin-top: 30px;
  font-size: 38px;
  margin-bottom: 0;
}

.double-links {
  display: inline-block;
  margin-top: 25px;
  padding: 10px 0px;
  background-color: #fff;
  border-radius: 25px;
  border: 1px solid #edbd31;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
}

.d-link {
  background-color: transparent;
  border-radius: 20px;
  padding: 12px 50px 11px 50px;
  letter-spacing: 1px;
  font-weight: 1000;
  font-family: "Gotham Pro light", sans-serif;
  text-decoration: none;
  color: black;
}

.router-link-active {
  background: #a5a4f5;
  color: #fff;
}

.second-link {
  margin-left: -5px;
}

.container {
  margin-left: 50px;
}
</style>
