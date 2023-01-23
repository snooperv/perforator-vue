<template>
  <div class="block-container">
    <button
      @click="prBegin"
      v-if="prStatus?.pr_status < 0 || prStatus?.status === 'no pr'"
    >
      Начать цикл Review
    </button>

    <div
      class="next-stage"
      v-if="prStatus?.pr_status >= 0 && prStatus?.pr_status < 4"
    >
      <span>Дата окончания {{ getStage }}:</span>
      <Datepicker
        v-model="date"
        :enable-time-picker="false"
        placeholder="Дата"
        locale="ru"
        cancelText="Отмена"
        selectText="Выбрать"
        :preview-format="format"
        :clearable="false"
        format="dd/MM/yyyy"
      />
      <span>Время окончания {{ getStage }}:</span>
      <Datepicker
        v-model="time"
        time-picker
        placeholder="Время"
        locale="ru"
        cancelText="Отмена"
        selectText="Выбрать"
        :clearable="false"
      />
      <button @click="prNext">Перейти к этапу {{ getStage }}</button>
    </div>

    <button @click="prClose" v-if="prStatus?.pr_status === 4">
      Завершить цикл Review
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "ControlReview",

  components: { Datepicker },

  data() {
    const date = ref(new Date());

    const time = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    const format = (date) => {
      const day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (month < 10) {
        month = "0" + month;
      }

      return `${day}/${month}/${year}`;
    };

    return {
      date,
      time,
      format,
    };
  },

  computed: {
    ...mapState(["prStatus"]),
    getStage() {
      switch (this.prStatus.pr_status) {
        case 0:
          return '"Self-Review"';
        case 1:
          return '"Утверждение пиров"';
        case 2:
          return '"Взаимное оценивание"';
        case 3:
          return '"One to One"';
      }
    },
  },

  methods: {
    prBegin() {
      this.$store.dispatch("beginPerformanceReview");
    },

    prNext() {
      let month = this.date.getMonth() + 1,
        hours = this.time.hours,
        minutes = this.time.minutes;
      if (month < 10) month = "0" + month;
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;

      const deadline = `${this.date.getFullYear()}-${month}-${this.date.getDate()}T${hours}:${minutes}`;
      console.log(deadline);
      this.$store.dispatch("nextStagePerformanceReview", deadline);
    },

    prClose() {
      this.$store.dispatch("closePerformanceReview");
    },
  },
};
</script>

<style lang="scss" src="./controlReview.scss" scoped></style>
