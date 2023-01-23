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
    postForm(event) {
      event.preventDefault();
      const form = new FormData(event.target.parentElement);
      console.log(event.target.parentElement);
      this.$store.dispatch("postPeersRatedMe", form);
    },
  },
};
</script>

<style lang="scss" src="./dropdownContent.scss" scoped></style>
