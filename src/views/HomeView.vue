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
    this.$store.dispatch("getMyPeers");

    console.log(this.user);
  },
};
</script>
