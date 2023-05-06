<template>
  <div class="introduction" v-for="item in selfReview?.grades">
    <h4>{{ item.name }}</h4>

    <p class="description">
      {{ item.description }}
    </p>

    <textarea
      maxlength="512"
      :name="item.id"
      v-model="item.text"
      rows="5"
      class="ta"
      :disabled="!selfReview.is_draft || prId"
    >
    </textarea>

    <div class="char-count">
      <span class="chars">{{ item.text.length }}</span>
      <span class="max">/ 512 символов</span>
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
};
</script>

<style lang="scss" src="./selfReview.scss" scoped></style>
