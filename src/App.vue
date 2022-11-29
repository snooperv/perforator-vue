<template>
  <router-view />
  <widget-container-modal />
</template>

<script>
import { container } from "jenesius-vue-modal";

export default {
  components: { WidgetContainerModal: container },
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
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

.modal-container {
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
}
</style>
