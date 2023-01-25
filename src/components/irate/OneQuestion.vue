<template>
  <h3 class="dropdownTitle">{{ title }}</h3>

  <p class="description">
    {{ description }}
  </p>
  <div class="question">
    <div class="user-text-input">
      <textarea
        :name="name"
        cols="40"
        rows="4"
        maxlength="512"
        class="ta"
        id="goals"
        :disabled="!isRate"
        v-model="comment"
        required
      ></textarea>
      <div class="char-count" v-if="isRate">
        <span id="imp-zones-chars" class="chars">{{ comment.length }}</span>
        <span id="plan-max" class="max">/ 512 символов</span>
      </div>
    </div>

    <div class="rating" v-if="isRate">
      <label
        v-for="(index, reverse) in [4, 3, 2, 1]"
        :for="`radio-${peerId}-${reverse + 1}-${indexQuestion}`"
      >
        <input
          type="radio"
          :name="`rates_${name}`"
          :value="index"
          :class="`radio-${peerId}-${indexQuestion}`"
          :id="`radio-${peerId}-${reverse + 1}-${indexQuestion}`"
        />
        <img src="@/assets/img/rating2.png" alt="" />
      </label>

      <p class="text_rate">Ваша оценка:</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OneQuestion",

  data() {
    return {
      isRate: this.$route.path.includes("i-rate"),
    };
  },

  props: {
    peerId: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: false,
    },

    indexQuestion: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./dropdownContent.scss" scoped></style>
