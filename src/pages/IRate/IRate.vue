<template>
  <div class="me-estimate">
    <div class="instruction">
      <h2 class="main-title">Система баллов:</h2>
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

    <div class="wait">
      <h2>Ожидают моей оценки</h2>
      <div class="peers">
        <div class="one-peer" v-for="peer in user.peersIRate">
          <button
            @click="() => (peer.isOpen = !peer.isOpen)"
            class="peer dropbtn"
          >
            <span class="peers-pic">
              <img
                src="@/assets/img/pic.png"
                alt="Фото сотрудника"
                class="avatar"
              />
            </span>
            <span class="name"> {{ peer.name }} </span>
            <a href="#" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
          <DropdownContent v-if="peer.isOpen" :peer-id="peer.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownContent from "@/components/irate/DropdownContent";
import { mapState } from "vuex";

export default {
  name: "IRate",

  components: {
    DropdownContent,
  },

  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    this.$store.dispatch("getPeersRatedMe");
  },

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
b {
  background-color: #edbd31;
  border-radius: 50%;
  width: 10px;
}

.rating input {
  display: none;
}

.rating label {
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  filter: grayscale(1);
  margin-right: 7px;
}

.rating input:hover + label,
.rating input:checked + label {
  filter: grayscale(0);
}

.rating input:not(:checked) ~ label:hover,
.rating input:not(:checked) ~ label:hover ~ label {
  filter: grayscale(0);
}

.rating input:checked ~ label {
  filter: grayscale(0);
}

.main-title {
  color: #000;
  text-align: left;
  padding: 25px 0 0 10px;
  font-size: 26px;
  letter-spacing: -0.5px;
  margin-bottom: 0;
}

.me-estimate {
  margin-left: 50px;
}

.number {
  position: relative;
  background-color: #edbd31;
  font-size: 14px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  top: 20px;
  right: 10px;
  display: table-cell;
  vertical-align: middle;
}

.instruction {
  width: 90%;
  background: #ffffff;
  border-radius: 30px;
  margin-top: 20px;
  padding: 0 25px 20px 25px;
  text-align: left;
}

.instruction p {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  font-size: 18px;
  margin: 0 20px;
}

.instruction span {
  font-weight: 1000;
  color: #222;
  position: relative;
}

.wait {
  width: 90%;
  background: #ffffff;
  border-radius: 30px;
  margin-top: 20px;
  padding: 10px 25px 20px 30px;
}

.peers {
  margin-bottom: 20px;
}

.peers span {
  font-size: 22px;
  color: #222222;
}

.peers p {
  font-weight: 1000;
  text-align: left;
  font-size: 14px;
  margin-left: 30px;
  color: #414141;
}

.peer {
  display: block;
  width: 90%;
  background-color: #ececf2;
  border-radius: 15px;
  height: 65px;
  margin-top: 20px;
  cursor: pointer;
}

.peer .name {
  float: left;
  margin-left: 0;
  position: relative;
  top: -2px;
  color: #331969;
  font-family: "Gotham Pro", sans-serif;
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -1px;
}

.peers-pic {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: inline-block;
  float: left;
  left: -25px;
  top: -22px;
}

.avatar {
  width: 100%;
}

.chevron {
  position: relative;
  float: right;
  margin-right: 25px;
  font-size: 1.5em;
  color: #331969;
}

.dropbtn {
  background-color: #ececf2;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #ececf2;
}

input[type="submit"] {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #a5a4f5;
  border: none;
  color: white;
  padding: 10px 7px;
  width: 250px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  border-radius: 25px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  display: block;
  margin-bottom: 25px;
}

input[type="submit"]:active {
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}
</style>
