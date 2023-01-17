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

<style lang="scss" scoped>
h2 {
  display: inline-block;
  color: #222;
  font-size: 32px;
}

.main-title {
  text-align: left;
  color: #222;
  margin-top: 30px;
  font-size: 36px;
  margin-bottom: 0;
}

.description {
  font-size: 24px;
  font-weight: 400;
  color: #222222;
  margin-top: 5px;
  margin-bottom: 25px;
}

.container {
  width: calc(100% - 100px);
  margin-left: 50px;
}

.back-statistic {
  padding: 35px 60px;
  height: 400px;
  background: #ffffff;
  border-radius: 31px;
}
</style>
