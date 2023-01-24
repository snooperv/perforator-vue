<template>
  <div class="block-container">
    <h2 class="block-title">Управление этапами Performance Review</h2>

    <button
      class="add-peer btn-begin"
      @click="prBegin"
      v-if="prStatus?.pr_status < 0 || prStatus?.status === 'no pr'"
    >
      Начать цикл Review
    </button>

    <div
      class="next-stage"
      v-if="prStatus?.pr_status >= 0 && prStatus?.pr_status < 4"
    >
      <div class="date-end">
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
      </div>

      <div class="time-end">
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
      </div>

      <button class="add-peer" @click="prNext">
        Перейти к этапу {{ getStage }}
      </button>
    </div>

    <button class="exit" @click="prClose" v-if="prStatus?.pr_status === 4">
      Завершить цикл Review
    </button>
  </div>

  <div class="block-container">
    <h2 class="block-title">Рейтинг сотрудников</h2>
    <p class="block-description">
      *кликните на сотрудника, чтобы посмотреть результаты его ревью
    </p>
    <div class="inside-wrapper rating" style="width: 95%">
      <div class="grades" v-for="worker in user.team">
        <div class="items rating-name">
          <a class="name-link">
            <div class="peers-pic-raiting">
              <img
                class="avatar"
                :src="API_URL() + worker.photo"
                alt="Аватар"
              />
            </div>
          </a>
          <a class="name-link">{{ worker.username }} </a>
          <button class="exit" @click="deleteUser(worker.profile_id)">
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="block-container">
    <h2 class="block-title">Выбор сотрудников в мою команду</h2>
    <p class="block-description">
      *здесь вы можете выбрать сотрудников, которые работают в вашей команде
    </p>
    <button class="add-peer" @click="openAllUsers">Добавить сотрудников</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { API_URL } from "@/helpers/api";
import { openModal } from "jenesius-vue-modal";
import PeersList from "@/components/modals/PeersList/PeersList.vue";
import PeersListMobile from "@/components/modals/PeersList/peersListMobile.vue";

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

  mounted() {
    if (this.user.team.length === 0) this.$store.dispatch("getMyTeam");
  },

  computed: {
    ...mapState(["prStatus", "user"]),
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
    API_URL() {
      return API_URL;
    },

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
      this.$store.dispatch("nextStagePerformanceReview", deadline);
    },

    prClose() {
      this.$store.dispatch("closePerformanceReview");
    },

    openAllUsers() {
      if (!this.isMobile)
        openModal(PeersList, { isManager: true, isAllUsers: true });
      else openModal(PeersListMobile, { isManager: true, isAllUsers: true });
    },

    deleteUser(id) {
      this.$store.dispatch("deleteUserImMyTeam", id);
    },
  },
};
</script>

<style lang="scss" src="./controlReview.scss" scoped></style>
