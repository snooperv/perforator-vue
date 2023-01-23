<template>
  <div id="myDropdown" class="dropdown-content show">
    <div class="dropdown-container">
      <form name="formRate">
        <OneQuestion
          v-for="(qst, index) in questions()"
          :title="qst.title"
          :index-question="index + 1"
          :name="qst.name"
          :peer-id="peerId"
        />

        <input type="hidden" name="profile" :value="peerId" />
        <input type="submit" value="Отправить отзыв" @click="postForm" />
        <p class="errorForm" v-if="isError">Заполнены не все данные</p>
      </form>
    </div>
  </div>
</template>

<script>
import OneQuestion from "@/components/irate/OneQuestion.vue";
import questions from "@/components/irate/helpers/questions";

export default {
  name: "DropdownContent",
  components: { OneQuestion },

  data() {
    return {
      isError: false,
      btnSubmit: null,
    };
  },

  props: {
    peerId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    questions() {
      return questions;
    },

    isErrorFalse() {
      this.isError = false;
    },

    async postForm(event) {
      event.preventDefault();
      this.btnSubmit = event.target.parentElement;
      const form = new FormData(this.btnSubmit);
      const rating = this.btnSubmit.querySelectorAll(".rating");

      Array.from(rating).map((elem) => {
        let checked = false;
        const rates = elem.querySelectorAll("input");
        Array.from(rates).map((rate) => {
          if (rate.checked) checked = true;
        });
        if (!checked) this.isError = true;
      });

      for (let pair of form.entries()) {
        if (pair[0] !== "profile" && !pair[1]) {
          this.isError = true;
        }
      }

      if (!this.isError) {
        await this.$store.dispatch("postPeersRatedMe", form);
        await this.$store.dispatch("getPeersRatedMe");
      } else {
        this.btnSubmit.addEventListener("focusin", this.isErrorFalse);
      }
    },
  },

  beforeUnmount() {
    this.btnSubmit &&
      this.btnSubmit.removeEventListener("focusin", this.isErrorFalse);
  },
};
</script>

<style lang="scss" src="./dropdownContent.scss" scoped></style>
