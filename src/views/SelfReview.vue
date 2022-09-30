<template>
  <div class="main">
    <div class="content">
      <div class="self-review">
        <div class="instruction">
          <h3 class="instr-title">Инструкция</h3>
          <p class="instr-p">
            В данной форме вам нужно будет провести самоанализ по проделанной работе за последние полгода.
            <br>Это поможет вам найти сильные и слабые стороны в своей работе, оценить ваш профессиональный рост.
            <br>Убедительная просьба отвечать на вопросы честно, а не "для галочки", так как это инструмент,
            направленный в первую очередь на улучшение ваших профессиональных навыков.
          </p>

        </div>
        <h2 class="title">Self Review</h2>
        <div class="form">
          <div class="container">
            <form id="self-review">
              <!--сюда вставляются все контейнеры с вопросами self-review-->
              <div id="id47" class="introduction">
                <h4 id="theme47">Вводная часть</h4>
                <p class="description">Напишите два-три предложения об общем впечатлении от работы за последнее
                  время</p>

                <p class="question">Что вам нравится в вашей текущей работе, задачах, отношениях с коллегами, процессах
                  в
                  компании и т.д.?</p>
                <textarea id="imp-zones" maxlength="512" name="plans" rows="5" field="yes" class="ta"
                          category_id="1"> </textarea>
                <div class="char-count">
                  <span id="imp-zones-chars" class="chars">1</span>
                  <span id="plan-max" class="max">/ 512 символов</span>
                </div>
                <p class="question">Что не нравится, что можно улучшить/ исправить?</p><textarea id="imp-zones"
                                                                                                 maxlength="512"
                                                                                                 name="plans" rows="5"
                                                                                                 field="yes" class="ta"
                                                                                                 category_id="2"> </textarea>
                <div class="char-count"><span id="imp-zones-chars" class="chars">1</span>
                  <span id="plan-max" class="max">/ 512 символов</span></div>
              </div>
              <div id="id49" class="introduction">
                <h4 id="theme49">Успехи и неудачи</h4>
                <p class="description">Расскажите, что было сделано за этот период. Выделите те проекты, которыми
                  особенно
                  гордитесь. Чтобы у руководителя была полная картина ваших достижений, укажите название проекта и
                  продолжительность работы над ним</p>

                <p class="question">Какие у вас были успехи?</p>
                <textarea id="imp-zones" maxlength="512" name="plans" rows="5" field="yes" class="ta"
                          category_id="3"> </textarea>
                <div class="char-count">
                  <span id="imp-zones-chars" class="chars">1</span>
                  <span id="plan-max" class="max">/ 512 символов</span>
                </div>
                <p class="question">Какие у вас были неудачи?</p><textarea id="imp-zones" maxlength="512" name="plans"
                                                                           rows="5" field="yes" class="ta"
                                                                           category_id="4"> </textarea>
                <div class="char-count"><span id="imp-zones-chars" class="chars">1</span>
                  <span id="plan-max" class="max">/ 512 символов</span></div>
              </div>
              <div id="id51" class="introduction">
                <h4 id="theme51">Зоны роста</h4>
                <p class="description">Определите, какие навыки вам важно развивать в ближайшее время и что для этого вы
                  планируете делать. Если вы не можете вспомнить проблемы с задачами, подумайте, какие компетенции стоит
                  развивать, чтобы выполнять работу эффективнее. Например, ваша работа страдает из-за того, что сложно
                  вести
                  переговоры. Значит, это ваша зона роста.</p>

                <textarea id="imp-zones" maxlength="512" name="plans" rows="5" field="yes" class="ta"
                          category_id="5"> </textarea>
                <div class="char-count">
                  <span id="imp-zones-chars" class="chars">1</span>
                  <span id="plan-max" class="max">/ 512 символов</span>
                </div>
              </div>
              <div id="id52" class="introduction">
                <h4 id="theme52">Планы на будущее</h4>
                <p class="description">Напишите долгосрочные планы — к чему хотите прийти в течение следующих нескольких
                  месяцев, и свои пожелания. Подумайте, что вы хотели бы видеть в вашем следующем селф-ревью.</p>

                <textarea id="imp-zones" maxlength="512" name="plans" rows="5" field="yes" class="ta"
                          category_id="6"> </textarea>
                <div class="char-count">
                  <span id="imp-zones-chars" class="chars">1</span>
                  <span id="plan-max" class="max">/ 512 символов</span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <h2 class="title">Оценивающие</h2>
        <div class="peers">
          <p>
            <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
            <span>Пиры</span> Люди, с которыми вы взаимодействуете по рабочим вопросам. Рекомендуем выбирать
            3-7 человек
          </p>
          <div id="my_peers" v-for="peer in user.peers">
            <div class="peer-sel" :id="'my-peer-' + peer.user_id">
              <div class="peers-pic">
                <img class="avatar" :src="peer.photo" alt="Фото сотрудника" />
              </div>
              <div class="peer-info">
                {{ peer.username }}
              </div>
              <a class="close" id="close" onclick="">
                <i class="close-icon fas fa-times"></i>
              </a>
            </div>
          </div> <!--Сюда добавляются выбранные пиры-->
          <!--<a href="#peers">-->
          <button type="button" class="add-peer" onclick="add_peers()">
            <i class="icon-plus fas fa-plus" aria-hidden="true"></i>
            Добавить пира
          </button>
          <!--</a>-->
        </div>
        <div class="wrapper-submit">
          <button class="send" onclick="save_self_review(false)">
            Отправить
          </button>
          <button class="save" onclick="save_self_review(true)">
            Сохранить черновик
          </button>
          <p id="draft" class="initial_draft">*Черновик сохранен<br>после дедлайна, сохраненный черновик автоматически
            отправляется</p>
        </div>

        <div class="feedback">
          <h3>Итоговая обратная связь</h3>
          <p>Здесь будут результаты вашего ревью!</p>
        </div>
      </div>

      <div class="selection" id="peers" style="visibility: hidden; opacity: 0;">
        <a class="close" id="btn_close1" onclick="close_peers1()">
          <i class="fas fa-times" aria-hidden="true"></i>
        </a>
        <h3>Выберите оценивающего</h3>
        <input type="text" class="peers-text">
        <div id="list_peers"></div> <!--Сюда добавляются все пиры, которых можно выбрать-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SelfReview",

  computed: {
    ...mapState(["user"]),
  },

  mounted() {
    this.$store.dispatch("getMyPeers");
  },
}
</script>

<style src="./peers.css" scoped></style>
<style scoped>
h2, h3, h4 {
  color: #222222;
  margin-top: 15px;
  font-size: 24px;
}

p {
  font-family: 'Gotham Pro light', serif;
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
  background: #FFFFFF;
  border-radius: 30px;
  margin-top: 20px;
  padding: 0 15px 20px 15px;
  line-height: 1.25;
  font-size: 18px;
}

.instruction p {
  color: #5C5C5C;
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
  background: #FFFFFF;
  text-align: left;
  border-radius: 30px;
}

.name, .job, .experience, .sbis-profile {
  display: inline-block;
  font-family: 'Gotham Pro', serif;
  font-weight: 400;
  color: #414141;
}

.info {
  font-family: 'Gotham Pro', serif;
  display: inline-block;
  margin: 15px 30px;
  color: #222222;
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
  font-family: 'Gotham Pro', serif;
  font-weight: 400;
  font-size: 20px;
}

.peers {
  width: 90%;
  background: #FFFFFF;
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

.close-icon {
  font-size: 28px;
}

.icon-circle {
  font-size: 9px !important;
  margin: 0;
  color: #EDBD31;
  position: relative;
  top: -3px;
}

.icon-plus {
  font-size: 12px !important;
}

.introduction, #progress, #improvement-zones, #plans {
  background: #F4F4FA;
  border-radius: 15px;
  padding: 10px 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.input-text {
  background-color: #ffffff;
  color: #0d0d0d;
  padding: 15px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  margin-bottom: 10px;
  width: 95%;
  height: 25px;
  border: 1px solid #222222;
  border-radius: 15px;
}

input[type=submit], .send {
  font-family: 'Gotham Pro light', serif;
  font-weight: 1000;
  letter-spacing: 1px;
  background-color: #A5A4F5;
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

input[type=submit]:active, .send:active {
  transition: all 0.3s ease-in-out;
  transform: scale(0.95)
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
  font-family: 'Gotham Pro light', serif;
  font-weight: 1000;
  font-size: 15px;
  letter-spacing: 1px;
  border: none;
  background-color: #A5A4F5;
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
  transform: scale(0.95)
}

.wrapper-submit {
  margin: 20px 0;
  width: 85%;
}

.save {
  font-family: 'Gotham Pro light', serif;
  font-weight: 1000;
  font-size: 16px;
  letter-spacing: 1px;
  border: 1px solid #EDBD31;
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

.chars, .max {
  position: relative;
  display: inline-block;
  font-family: 'Gotham Pro light', serif;
  font-weight: 400;
  color: #979797;
}
</style>