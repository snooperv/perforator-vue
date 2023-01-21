<template>
  <div class="container">
    <h1 class="main-title">Мои результаты по прошлым периодам оценки</h1>
    <p class="description">
      Чтобы увидеть результаты предыдущих ревью, нажмите на точку на графике
    </p>
    <div class="back-statistic">
      <LineChart />
    </div>
  </div>
</template>

<script>
import LineChart from "@/pages/PreviousPeriods/LineChart.vue";

export default {
  name: "PreviousPeriods",
  components: { LineChart },
};
</script>

<style lang="scss" src="./previousPeriods.scss" scoped></style>
