<template>
  <div class="manager">
    <div class="double-links" id="dl">
      <router-link class="d-link" to="/i-manager/approval">
        утверждение пиров
      </router-link>
      <router-link class="d-link second-link" to="/i-manager/my-team">
        моя команда
      </router-link>
      <router-link class="d-link second-link" to="/i-manager/control-review">
        управление Review
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "IManager",

  computed: {
    ...mapState(["user"]),
  },

  updated() {
    if (this.$route.path === "/i-manager")
      this.$router.push("/i-manager/approval");
  },

  mounted() {
    if (this.$route.path === "/i-manager")
      this.$router.push("/i-manager/approval");

    if (localStorage.getItem("isManager") !== "true") {
      this.$router.push("/self-review");
      return;
    }
  },
};
</script>

<style lang="scss" src="./iManager.scss" scoped></style>
