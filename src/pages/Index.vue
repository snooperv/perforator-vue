<template>
  <Header />
  <SideBar />
  <router-view />
</template>

<script>
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default {
  name: "Index",
  components: { SideBar, Header },
};
</script>

<style>
body {
  overflow-x: hidden;
  background-color: #f8f8fa;
}

.main {
  display: grid;
  grid-template-columns: 20vw auto;
  grid-template-rows: 75px auto;
  background-color: #f8f8fa;
}

.header {
}

.content {
  background-color: #f8f8fa;
  grid-column-start: 2;
  grid-row-start: 2;
}

@media (max-width: 800px) {
  .main {
    grid: unset;
  }

  .menu {
    display: none;
  }
}
</style>
