<template>
  <div class="peers">
    <div class="date">
      <h2>Q1</h2>
      <span class="period"> 01.01.2020 - 14.01.2020</span>
    </div>
    <button @click="toggleForm" class="peer dropbtn">
      <span class="peers-pic">
        <img src="@/assets/img/pic.png" class="avatar" alt="Аватар" />
      </span>
      <span class="name">Коновалов Илья</span>
      <span class="position" v-if="!isMobile"> Мой руководитель</span>
      <a href="#" id="chev2" class="chevron rotate">
        <i class="fas fa-chevron-right" aria-hidden="true"></i>
      </a>
    </button>
    <DropdownForm v-if="isOpen" />
  </div>
</template>

<script>
import DropdownForm from "@/components/OneToOne/DropdownForm";
import { mapState } from "vuex";

export default {
  name: "Previous",
  components: { DropdownForm },
  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    ...mapState(["isMobile"]),
  },

  methods: {
    toggleForm() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" src="./previous.scss" scoped></style>
