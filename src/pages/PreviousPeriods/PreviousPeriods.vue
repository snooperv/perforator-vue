<template>
  <div class="container previous-periods">
    <h1 class="main-title">Мои результаты по прошлым периодам оценки</h1>
    <p class="description">
      Чтобы увидеть результаты предыдущих ревью, нажмите на точку на графике
    </p>
    <div class="back-statistic">
      <LineChart />
    </div>

    <router-view />
  </div>
</template>

<script>
import LineChart from "@/pages/PreviousPeriods/LineChart.vue";
import { mapState } from "vuex";
import { types } from "@/types";

export default {
  name: "PreviousPeriods",
  components: { LineChart },
  computed: {
    ...mapState(["data"]),
  },
  beforeUnmount() {
    this.$store.commit(types.CLEAR_DATA);
  },
};
</script>

<style lang="scss" src="./previousPeriods.scss" scoped></style>
