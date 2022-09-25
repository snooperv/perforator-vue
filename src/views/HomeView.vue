<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <input type="button" value="Выход" @click="userLogout" />
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

  methods: {
    userLogout() {
      this.$store.dispatch("userLogout");
    },
  },

  mounted() {
    this.$store.dispatch("getMyPeers");
  },
};
</script>
