<template>
  <div class="manager">
    <div class="double-links" id="dl">
      <router-link class="d-link" to="/i-manager/approval">
        утверждение пиров
      </router-link>
      <router-link class="d-link second-link" to="/i-manager/my-team">
        моя команда
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "IManager",

  mounted() {
    this.$route.path === "/i-manager" &&
      this.$router.push("/i-manager/approval");
  },
};
</script>

<style scoped>
.manager {
  margin-left: 50px;
}

.double-links {
  display: inline-block;
  margin-top: 25px;
  padding: 10px 0;
  background-color: #fff;
  border-radius: 25px;
  border: 1px solid #edbd31;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.25);
}

.d-link {
  background-color: transparent;
  border-radius: 20px;
  padding: 12px 30px 11px 30px;
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
  margin-left: -15px;
}

.peers span {
  font-size: 22px;
  color: #222222;
}

.peers p {
  font-weight: 1000;
  text-align: left;
  font-size: 14px;
  margin-left: 30px;
  color: #414141;
}

input[type="submit"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
</style>
