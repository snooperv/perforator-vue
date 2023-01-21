<template>
  <div class="instruction-container">
    <div
      class="instruction-mobile"
      :class="isInstructionOpen && 'open'"
      @click="() => (isInstructionOpen = !isInstructionOpen)"
    >
      <img
        src="@/assets/img/starIcon.png"
        class="instruction-icon"
        alt="Инструкция"
      />
      Система баллов
      <img src="@/assets/img/arrowMobile.svg" class="arrow-icon" alt="Arrow" />
    </div>
    <div class="opened-instruction" v-if="isInstructionOpen">
      <div class="number">1</div>
      <p>
        <span>Значительно ниже моих ожиданий</span> <br />
        человек не до конца понимает, что от него ждут в данной компетенции,
        например он не правильно рассчитал время на выполнение задачи и закрыл
        ее немного позже срока
      </p>
      <div class="number">2</div>
      <p>
        <span>Немного ниже моих ожиданий</span>
        <br />человек слегка не удовлетворяет ваши ожидания в данной
        компетенции, например вы работаете в команде и Вася хорошо справляется
        со своими обязанностями, но не всегда обращается к коллегам за помощью в
        решении возникающих у него рабочих проблем
      </p>
      <div class="number">3</div>
      <p>
        <span>Немного выше моих ожиданий</span>
        <br />человек проявил себя в данной компетенции сильнее, чем вы ожидали,
        но не сделал ничего супер крутого
      </p>
      <div class="number">4</div>
      <p>
        <span>Значительно выше моих ожиданий</span>
        <br />человек сильно превысил ваши ожидания по данной компетенции,
        например вы ожидали, что он в одиночку не сможет написать этот метод, а
        он не только написал его, но и сделал его полностью рабочим
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
