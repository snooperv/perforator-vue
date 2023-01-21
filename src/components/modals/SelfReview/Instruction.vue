<template>
  <div class="instruction-container">
    <div
      class="instruction-mobile"
      :class="isInstructionOpen && 'open'"
      @click="() => (isInstructionOpen = !isInstructionOpen)"
    >
      <img
        src="@/assets/img/Instruction.svg"
        class="instruction-icon"
        alt="Инструкция"
      />
      Инструкция
      <img src="@/assets/img/arrowMobile.svg" class="arrow-icon" alt="Arrow" />
    </div>
    <div class="opened-instruction" v-if="isInstructionOpen">
      <p class="instr-p">
        В данной форме вам нужно будет провести самоанализ по проделанной работе
        за последние полгода.
        <br />Это поможет вам найти сильные и слабые стороны в своей работе,
        оценить ваш профессиональный рост. <br />Убедительная просьба отвечать
        на вопросы честно, а не "для галочки", так как это инструмент,
        направленный в первую очередь на улучшение ваших профессиональных
        навыков.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Instruction",

  data() {
    return {
      isInstructionOpen: false,
    };
  },
};
</script>

<style lang="scss" src="./instruction.scss" scoped></style>
