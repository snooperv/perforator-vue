<template>
  <div class="me-estimate">
    <div class="instruction" v-if="!isMobile">
      <h2 class="main-title">Система баллов:</h2>
      <div class="number">1</div>
      <p>
        <span>Значительно ниже моих ожиданий</span> <br />
        человек не до конца понимает, что от него ждут в данной компетенции,
        например он не правильно рассчитал время на выполнение задачи и закрыл
        ее немного позже срока
      </p>
      <div class="number">2</div>
      <p>
        <span>Немного ниже моих ожиданий</span>
        <br />человек слегка не удовлетворяет ваши ожидания в данной
        компетенции, например вы работаете в команде и Вася хорошо справляется
        со своими обязанностями, но не всегда обращается к коллегам за помощью в
        решении возникающих у него рабочих проблем
      </p>
      <div class="number">3</div>
      <p>
        <span>Немного выше моих ожиданий</span>
        <br />человек проявил себя в данной компетенции сильнее, чем вы ожидали,
        но не сделал ничего супер крутого
      </p>
      <div class="number">4</div>
      <p>
        <span>Значительно выше моих ожиданий</span>
        <br />человек сильно превысил ваши ожидания по данной компетенции,
        например вы ожидали, что он в одиночку не сможет написать этот метод, а
        он не только написал его, но и сделал его полностью рабочим
      </p>
    </div>

    <Instruction v-if="isMobile" />

    <div
      class="wait"
      v-if="prStatus?.status !== 'no pr' && prStatus?.pr_status > 2"
    >
      <h2>Ожидают моей оценки</h2>
      <div class="peers">
        <div class="one-peer" v-for="(peer, index) in user.peersIRate">
          <button
            @click="() => (peer.isOpen = !peer.isOpen)"
            class="peer dropbtn"
            :class="{ opened: peer.isOpen }"
          >
            <span class="peers-pic">
              <img
                :src="API_URL() + peer.photo"
                alt="Фото сотрудника"
                class="avatar"
              />
            </span>
            <span class="name"> {{ peer.name }} </span>
            <a href="#" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
          <DropdownContent
            :open="peer.isOpen"
            :peer-id="peer.id"
            :key="index"
          />
        </div>
      </div>
    </div>

    <div class="stage-closed" v-else>
      <h3>Данный этап сейчас закрыт</h3>
      <p>
        Вы сможете оценить других сотрудников после того как менеджер запустит
        этап "Взаимное оценивание"
      </p>
    </div>
  </div>
</template>

<script>
import DropdownContent from "@/components/irate/DropdownContent";
import { mapState } from "vuex";
import { API_URL } from "@/helpers/api";
import Instruction from "@/components/modals/IRate/Instruction.vue";

export default {
  name: "IRate",

  components: {
    Instruction,
    DropdownContent,
  },

  computed: {
    ...mapState(["user", "isMobile", "prStatus"]),
  },

  mounted() {
    this.getListPeersRate();
  },

  data() {
    return {};
  },

  methods: {
    API_URL() {
      return API_URL;
    },

    getListPeersRate() {
      if (this.prStatus?.status !== "no pr" && this.prStatus?.pr_status > 2)
        this.$store.dispatch("getPeersRatedMe");
    },
  },

  watch: {
    prStatus: {
      handler() {
        this.getListPeersRate();
      },
    },
  },
};
</script>

<style lang="scss" src="./iRate.scss" scoped></style>
