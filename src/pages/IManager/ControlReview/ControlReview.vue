<template>
  <button>Начать цикл Review</button>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ControlReview",

  computed: {
    ...mapState(["prStatus"]),
  },
};
</script>

<style scoped></style>
