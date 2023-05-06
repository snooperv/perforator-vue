<template>
  <div class="popup">
    <a class="close" @click="closeModal(0)">
      <i class="fas fa-times" aria-hidden="true"></i>
    </a>
    <h3 class="popup-title">
      Хотите заполнить данные стандартным списком вопросов?
    </h3>
    <div class="option-list">
      <button @click="closeModal(1)" class="change">
        Заполнить без сохранения вопросов
      </button>
      <button @click="closeModal(2)" class="change">
        Добавить к списку моих вопросов
      </button>
      <button @click="closeModal(0)" class="exit">Отмена</button>
    </div>
  </div>
</template>

<script>
import { closeModal } from "jenesius-vue-modal";

export default {
  name: "Confirmation",

  props: ["rewriteQuestions", "addListQuestions"],

  methods: {
    closeModal(choose) {
      if (choose === 1) this.rewriteQuestions();
      else if (choose === 2) this.addListQuestions();
      closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 30%;
  position: fixed;
  padding: 15px 65px;
  border-radius: 2em;
  top: 50%;
  left: 50%;
  color: #000;
  transform: translate(-50%, -50%);
  background-color: #f1f1f1;
  transition: opacity 0.5s, linear 0.5s;
  z-index: 1;
  box-shadow: 0 11px 20px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  @media (max-width: 1366px) {
    width: 40%;
  }

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 80%;
    padding: 15px 45px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 15px 20px;
  }
}

.popup-title {
  font-size: 20px;
  text-align: center;
}

.option-list {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.change,
.exit {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #c1c1ec;
  border: none;
  color: white;
  padding: 15px 25px;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  cursor: pointer;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

.change:hover {
  background-color: rgba(140, 140, 245, 1);
  transition: 0.25s;
  cursor: pointer;
}

.change:active,
.exit:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

.change {
  margin-right: 25px;
}

.exit {
  background-color: #cd2525;
}

.popup .close {
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 2em;
  margin-top: 10px;
  margin-right: 10px;
  color: #f00;
}
</style>
