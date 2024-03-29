<template>
  <div id="myDropdown" class="dropdown-content" :class="{ show: open }">
    <div class="dropdown-container">
      <form name="formRate" v-if="isLoaded">
        <OneQuestion
          v-for="(qst, index) in questionsList"
          :name="String(qst.id)"
          :title="qst.name"
          :index-question="index + 1"
          :description="qst.description"
          :peer-id="peerId"
          :comment="qst.text"
        />

        <input
          type="submit"
          value="Отправить отзыв"
          @click="postForm"
          v-if="isRate"
        />
        <p class="errorForm" v-if="!isNotError">{{ ErrorText }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import OneQuestion from "@/components/irate/OneQuestion.vue";
import { mapState } from "vuex";

export default {
  name: "DropdownContent",
  components: { OneQuestion },

  data() {
    return {
      isNotError: true,
      btnSubmit: null,
      isRate: this.$route.path.includes("i-rate"),
      isLoaded: false,
      ErrorText: "",
      questionsList: [],
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
    open: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    ...mapState(["rateComment", "listReviews", "user"]),
  },

  async mounted() {
    await this.loadContent();

    this.isLoaded = true;
  },

  methods: {
    isErrorFalse() {
      this.isNotError = true;
    },

    postForm(event) {
      event.preventDefault();
      this.btnSubmit = event.target.parentElement;
      const form = new FormData(this.btnSubmit);
      const rating = this.btnSubmit.querySelectorAll(".rating");
      const ratesFromMe = [];

      Array.from(rating).map((elem) => {
        let checked = false;
        const rates = elem.querySelectorAll("input");
        Array.from(rates).map((rate) => {
          if (rate.checked) {
            checked = true;
            const id = rate.name.split("_")[1];
            let findRate = ratesFromMe.find((mark) => mark.id === id);
            if (!findRate) ratesFromMe.push({ id, mark: rate.value });
          }
        });
        if (!checked) {
          this.isNotError = false;
          this.ErrorText = "Одна или несколько оценок не были выставлены";
        }
      });

      for (let pair of form.entries()) {
        if (!pair[1]) {
          this.isNotError = false;
          this.ErrorText = "Один или несколько комментариев не были заполнены";
          break;
        } else {
          let findComment = ratesFromMe.find(
            (comment) => comment.id === pair[0]
          );
          if (findComment) findComment.text = pair[1];
        }
      }

      if (this.isNotError) {
        this.$store.dispatch("postPeersRatedMe", {
          profile: this.peerId,
          grades: ratesFromMe,
        });
        event.target.closest(".one-peer").style.display = "none";
      } else {
        this.btnSubmit.addEventListener("focusin", this.isErrorFalse);
      }
    },

    async loadContent() {
      if (!this.isRate) {
        if (!this.prId && this.listReviews.length === 0)
          await this.$store.dispatch("getListPerformanceReview");

        if (this.user.myId)
          await this.$store.dispatch("getReviewEmployee", {
            evaluatedPerson: this.peerId,
            prId:
              this.prId || this.listReviews[this.listReviews.length - 1].pr_id,
          });
        else return;

        this.questionsList = [];
        for (let comment of this.rateComment.grades) {
          const question = {};
          for (let key in comment) {
            question[key] = comment[key];
          }
          this.questionsList.push(question);
        }
      } else {
        if (!this.user.myId) await this.$store.dispatch("getMyProfile");
        this.questionsList = await this.$store.dispatch("getRateQuestions", {
          appraising_person: this.user.myId,
          evaluated_person: this.peerId,
        });
        this.questionsList.map((question) => (question.comment = ""));
      }
    },
  },

  watch: {
    prId: {
      handler() {
        this.loadContent();
      },
    },

    "user.myId": {
      handler() {
        this.loadContent();
      },
    },
  },

  beforeUnmount() {
    this.btnSubmit &&
      this.btnSubmit.removeEventListener("focusin", this.isErrorFalse);
  },
};
</script>

<style lang="scss" src="./dropdownContent.scss" scoped></style>
