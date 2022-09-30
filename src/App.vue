<template>
  <router-view/>
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
@import url("http://fonts.cdnfonts.com/css/gotham-pro");
@import url(//db.onlinewebfonts.com/c/323b7229abd327d428021a6d49a7413d?family=Gotham+Pro+Light);

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
  /* font-family: 'Gotham Pro light', sans-serif; */
}
</style>
