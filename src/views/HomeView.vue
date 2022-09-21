<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <div v-for="elem in user.peers">{{ elem }}</div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },

  data() {
    return {
      data: null,
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    const cookieToken = this.$cookies.get("refresh_token");

    if (!cookieToken) this.$store.dispatch("getToken");

    if (localStorage.token) {
      this.$store.dispatch("startApp", {
        cookieToken,
      });

      this.$store.dispatch("getMyPeers");

      console.log(this.user);
    }
  },
};
</script>
