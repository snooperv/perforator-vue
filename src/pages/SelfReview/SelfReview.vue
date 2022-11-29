<template>
  <div class="self-review">
    <div class="instruction">
      <h3 class="instr-title">Инструкция</h3>
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
    <h2 class="title">Self Review</h2>
    <div class="form">
      <div class="container">
        <form id="self-review">
          <!--сюда вставляются все контейнеры с вопросами self-review-->
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
                :disabled="!selfReview.is_draft"
              >
              </textarea>

              <div class="char-count">
                <span class="chars">{{ question.comment.length }}</span>
                <span class="max">/ 512 символов</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <h2 class="title">Оценивающие</h2>
    <div class="peers">
      <p>
        <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
        <span>Пиры</span> Люди, с которыми вы взаимодействуете по рабочим
        вопросам. Рекомендуем выбирать 3-7 человек
      </p>
      <div id="my_peers" v-for="peer in user.peers">
        <div class="peer-sel" :id="'my-peer-' + peer.profile_id">
          <div class="peers-pic">
            <img
              class="avatar"
              src="@/assets/img/pic.png"
              alt="Фото сотрудника"
            />
          </div>
          <div class="peer-info">
            {{ peer.username }}
          </div>
          <a
            class="close"
            id="close"
            @click="removePeer(peer.profile_id)"
            v-if="selfReview.is_draft"
          >
            <i class="close-icon fas fa-times"></i>
          </a>
        </div>
      </div>
      <!--Сюда добавляются выбранные пиры-->
      <!--<a href="#peers">-->
      <button
        type="button"
        class="add-peer"
        @click="openModalPeers"
        v-if="selfReview.is_draft"
      >
        <i class="icon-plus fas fa-plus" aria-hidden="true"></i>
        Добавить пира
      </button>
      <!--</a>-->
    </div>

    <div class="wrapper-submit" v-if="selfReview.is_draft">
      <button
        class="send"
        @click="(e) => saveReview(e, false)"
        :disabled="isSendDisabled"
        :style="isSendDisabled ? 'background-color: #8e8e8e' : ''"
      >
        Отправить
      </button>
      <button class="save" @click="(e) => saveReview(e, true)">
        Сохранить черновик
      </button>
      <p class="initial_draft">
        *Черновик сохранен<br />после дедлайна, сохраненный черновик
        автоматически отправляется
      </p>
    </div>

    <div class="wrapper-submit" v-if="!selfReview.is_draft">
      <p class="check_img">
        <img src="@/assets/img/check.svg" alt="Форма успешно отправлена" />
      </p>
      <h4>Форма отправлена!</h4>
    </div>

    <div class="feedback">
      <h3>Итоговая обратная связь</h3>
      <p>Здесь будут результаты вашего ревью!</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { openModal } from "jenesius-vue-modal";
import PeersList from "@/components/modals/PeersList";

export default {
  name: "SelfReview",

  data() {
    return {
      reviewContent: [],
    };
  },

  computed: {
    ...mapState(["user", "selfReview"]),

    openModalPeers() {
      openModal(PeersList);
    },

    isSendDisabled() {
      const isFillText = this.selfReview.grades.filter(
        (grade) => grade.comment !== ""
      );
      return !(
        isFillText.length === this.selfReview.grades.length &&
        this.user.peers.length > 0
      );
    },
  },

  methods: {
    saveReview(e, isDraft) {
      this.selfReview.is_draft = isDraft;
      this.$store.dispatch("saveSelfReview", this.selfReview);

      if (isDraft) {
        const warningText =
          e.target.parentNode.querySelector(".initial_draft").classList;
        console.log(warningText);
        if (warningText.contains("active_draft")) {
          warningText.remove("active_draft");
          warningText.add("hidden_draft");
          setTimeout(() => {
            warningText.remove("hidden_draft");
            warningText.add("active_draft");
          }, 300);
        } else {
          warningText.add("active_draft");
        }
      }
    },

    removePeer(id) {
      this.$store.dispatch("removeMyPeer", id);
    },
  },

  mounted() {
    this.$store.dispatch("getSelfReview");
    this.$store.dispatch("getMyPeers");
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

<style src="./peers.css" scoped></style>
<style scoped>
h2,
h3,
h4 {
  color: #222222;
  margin-top: 15px;
  font-size: 24px;
}

p {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  color: #222222;
  margin: 0;
}

.self-review {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  font-size: 20px;
  color: rgb(167, 167, 167);
  font-weight: 600;
}

.instr-title {
  text-align: center;
  margin-bottom: 10px;
}

.instr-p {
  margin: 0 10px;
}

.instruction {
  width: 85%;
  background: #ffffff;
  border-radius: 30px;
  margin-top: 20px;
  padding: 0 15px 20px 15px;
  line-height: 1.25;
  font-size: 18px;
}

.instruction p {
  color: #5c5c5c;
}

.title {
  margin-top: 30px;
  font-size: 38px;
  align-self: start;
  margin-left: 100px;
}

.form {
  padding-top: 10px;
  width: 90%;
  background: #ffffff;
  text-align: left;
  border-radius: 30px;
}

.container {
  width: 90%;
  display: inline-block;
  margin: 0 30px;
}

.description {
  margin-top: -25px;
  font-size: 14px;
  margin-bottom: 20px;
}

.question {
  margin: 15px 0;
  font-family: "Gotham Pro", sans-serif;
  font-weight: 400;
  font-size: 20px;
}

.peers {
  width: 90%;
  background: #ffffff;
  padding: 20px 0;
  border-radius: 30px;
}

.peers span {
  font-size: 20px;
  color: #222222;
}

.peers p {
  font-weight: 1000;
  text-align: left;
  font-size: 14px;
  margin-left: 30px;
  color: #414141;
}

.peer-info {
  color: #331969;
}

.avatar {
  width: 100%;
}

.close-icon {
  font-size: 28px;
}

.icon-circle {
  font-size: 9px !important;
  margin: 0;
  color: #edbd31;
  position: relative;
  top: -3px;
}

.icon-plus {
  font-size: 12px !important;
}

.introduction {
  background: #f4f4fa;
  border-radius: 15px;
  padding: 10px 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

input[type="submit"],
.send {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #a5a4f5;
  border: none;
  color: white;
  padding: 20px 7px;
  width: 25%;
  text-align: center;
  display: inline-block;
  font-size: 22px;
  cursor: pointer;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  margin: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

input[type="submit"]:active,
.send:active {
  transition: all 0.3s ease-in-out;
  transform: scale(0.95);
}

.ta {
  border-radius: 15px;
  border: 1px solid #222222;
  width: 90%;
  padding: 20px;
  font-size: 16px;
  resize: none;
}

.add-peer {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  font-size: 15px;
  letter-spacing: 1px;
  border: none;
  background-color: #a5a4f5;
  color: white;
  padding: 20px 0;
  width: 200px;
  cursor: pointer;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  margin: 20px 50px 20px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  float: left;
}

.add-peer:active {
  transition: all 0.3s ease-in-out;
  transform: scale(0.95);
}

.wrapper-submit {
  margin: 20px 0;
  width: 85%;
}

.save {
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 1000;
  font-size: 16px;
  letter-spacing: 1px;
  border: 1px solid #edbd31;
  background-color: transparent;
  color: #222222;
  display: inline-block;
  padding: 7px 5px;
  width: 20%;
  cursor: pointer;
  -webkit-border-radius: 15px;
  border-radius: 30px;
  margin: 20px 10px;
}

.feedback {
  width: 90%;
  background-color: #ffffff;
  border-radius: 30px;
  margin-bottom: 50px;
}

.feedback h3 {
  margin-top: 20px;
  text-align: left;
  margin-left: 30px;
}

.feedback p {
  font-size: 18px;
  color: #686868;
  text-align: left;
  margin: 5px 0 20px 30px;
}

@media (max-width: 1580px) {
}

@media (max-width: 1450px) {
}

@media (max-width: 1325px) {
}

.initial_draft {
  opacity: 0;
  visibility: hidden;
  font-size: 14px;
  margin-left: 32%;
  margin-top: -20px;
}

.check_img {
  text-align: center;
}

.check_img img {
  width: 150px;
  height: 150px;
}

.wrapper-submit h4 {
  text-align: center;
}

.char-count {
  text-align: right;
  font-size: 14px;
  position: relative;
  top: -30px;
  right: 10%;
}

.chars,
.max {
  position: relative;
  display: inline-block;
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 400;
  color: #979797;
}

.active_draft {
  color: red;
  font-size: 14px;
  margin-left: 32%;
  margin-top: -20px;
  /*display: none;*/
  visibility: visible;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
.hidden_draft {
  color: red;
  font-size: 14px;
  margin-left: 32%;
  margin-top: -20px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.35s ease-in-out;
}
</style>
