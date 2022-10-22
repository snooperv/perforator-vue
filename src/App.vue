<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  mounted() {
    const cookieToken = this.$store.getters.cookieToken;

    if (!cookieToken) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">
@import url("@/assets/font/gothamPro/gothamPro.css");
@import url("@/assets/font/gothamProLight/gothamProLight.css");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

html {
  background-color: #f8f8fa;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  font-family: "Gotham Pro", sans-serif;
}
</style>
