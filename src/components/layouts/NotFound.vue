<template>
  <div class="not-found">
    <h1>404! Page Not Found!</h1>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  height: calc(100vh - 75px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  margin: 0;
}
</style>
