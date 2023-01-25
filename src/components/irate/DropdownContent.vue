<template>
  <div id="myDropdown" class="dropdown-content show">
    <div class="dropdown-container">
      <form name="formRate" v-if="isLoaded">
        <OneQuestion
          v-for="(qst, index) in questions()"
          :title="qst.title"
          :index-question="index + 1"
          :name="qst.name"
          :peer-id="peerId"
          :comment="qst.comment"
        />

        <input type="hidden" name="profile" :value="peerId" />
        <input
          type="submit"
          value="Отправить отзыв"
          @click="postForm"
          v-if="isRate"
        />
        <p class="errorForm" v-if="isError">Заполнены не все данные</p>
      </form>
    </div>
  </div>
</template>

<script>
import OneQuestion from "@/components/irate/OneQuestion.vue";
import questions from "@/components/irate/helpers/questions";
import { mapState } from "vuex";

export default {
  name: "DropdownContent",
  components: { OneQuestion },

  data() {
    return {
      isError: false,
      btnSubmit: null,
      isRate: this.$route.path.includes("i-rate"),
      isLoaded: false,
    };
  },

  props: {
    peerId: {
      type: Number,
      required: true,
    },
    prId: {
      required: false,
    },
  },

  computed: {
    ...mapState(["rateComment", "listReviews"]),
  },

  async mounted() {
    if (!this.isRate) {
      if (!this.prId && this.listReviews.length === 0)
        await this.$store.dispatch("getListPerformanceReview");

      await this.$store.dispatch("getReviewEmployee", {
        evaluatedPerson: this.peerId,
        prId: this.prId || this.listReviews[this.listReviews.length - 1].pr_id,
      });

      questions.map((question) => {
        for (let comment in this.rateComment) {
          if (question.name === comment)
            question.comment = this.rateComment[comment];
        }
      });
    }

    this.isLoaded = true;
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
