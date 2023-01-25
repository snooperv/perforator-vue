<template>
  <div class="introduction" v-for="item in reviewContent">
    <h4>{{ item.title }}</h4>

    <p class="description">
      {{ item.description }}
    </p>

    <div v-for="question in item.content">
      <p class="question">
        {{ question.grade_category_description }}
      </p>

      <!--@input="(e) => setCountSymbols(e, question.id)"-->

      <textarea
        maxlength="512"
        :name="question.id"
        v-model="question.comment"
        rows="5"
        class="ta"
        :disabled="!selfReview.is_draft || profileId"
      >
      </textarea>

      <div class="char-count">
        <span class="chars">{{ question.comment.length }}</span>
        <span class="max">/ 512 символов</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelfReviewContent",

  props: ["prId"],

  data() {
    return {
      reviewContent: [],
      error: false,
    };
  },

  computed: {
    ...mapState(["selfReview"]),
  },

  mounted() {
    this.$store.dispatch("getSelfReview", { id: this.prId });
  },

  watch: {
    selfReview: {
      handler() {
        let smallArr = [];
        let title = "";

        this.selfReview.grades.map((grade) => {
          if (grade.grade_category_name !== title) {
            title &&
              this.reviewContent.push({
                title: title,
                description: smallArr[0].grade_category_preview_description,
                content: smallArr,
              });
            smallArr = [];
            title = grade.grade_category_name;
          }

          smallArr.push(grade);
        });

        this.reviewContent.push({
          title: title,
          description: smallArr[0].grade_category_preview_description,
          content: smallArr,
        });
      },
    },
  },
};
</script>

<style lang="scss" src="./selfReview.scss" scoped></style>
