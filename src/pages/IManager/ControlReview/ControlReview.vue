<template>
  <div class="block-container">
    <h2 class="block-title">Управление этапами Performance Review</h2>

    <button
      class="add-peer btn-begin"
      @click="prBegin"
      v-if="prStatus?.pr_status < 0 || prStatus?.status === 'no pr'"
    >
      Начать цикл Review
    </button>

    <div
      class="next-stage"
      v-if="prStatus?.pr_status >= 0 && prStatus?.pr_status < 4"
    >
      <div class="date-end">
        <span>Дата окончания {{ getStage }}:</span>
        <Datepicker
          v-model="date"
          :enable-time-picker="false"
          placeholder="Дата"
          locale="ru"
          cancelText="Отмена"
          selectText="Выбрать"
          :preview-format="format"
          :clearable="false"
          format="dd/MM/yyyy"
        />
      </div>

      <div class="time-end">
        <span>Время окончания {{ getStage }}:</span>
        <Datepicker
          v-model="time"
          time-picker
          placeholder="Время"
          locale="ru"
          cancelText="Отмена"
          selectText="Выбрать"
          :clearable="false"
        />
      </div>

      <button class="add-peer" @click="prNext">
        Перейти к этапу {{ getStage }}
      </button>
      <p
        v-if="
          questionsSelfReviewErrors.length > 0 || questionsRateErrors.length > 0
        "
        class="stage-error"
      >
        Ошибка перехода к следующему этапу: один или несколько вопросов
        {{ getStage }} не были заполнены до конца (поле "Вопрос" обязательно для
        заполнения)
      </p>
    </div>

    <button
      class="add-peer review-close"
      @click="prClose"
      v-if="prStatus?.pr_status === 4"
    >
      Завершить цикл Review
    </button>
  </div>

  <div v-if="prStatus?.pr_status === 0" class="block-container">
    <h2 class="block-title">Вопросы для Self Review</h2>
    <p class="block-description">
      *В данном блоке необходимо заполнить вопросы для Self Review
    </p>

    <div class="question" v-for="(question, index) in questionsSelfReview">
      <h3 class="question__number">{{ index + 1 }}. Добавление вопроса</h3>
      <p class="question__title">Вопрос:</p>
      <textarea
        rows="2"
        maxlength="512"
        name="name"
        @input="(e) => inputTitle(e, index, 'Self Review')"
        :value="question.title"
        class="question__input"
      />
      <p class="question__title">Описание вопроса:</p>
      <textarea
        rows="3"
        maxlength="512"
        name="description"
        @input="(e) => inputDescription(e, index, 'Self Review')"
        :value="question.description"
        class="question__input"
      />
    </div>

    <div class="control-buttons">
      <button class="question-add" @click="addQuestion('Self Review')">
        Добавить вопрос
      </button>
      <button class="question-delete" @click="deleteQuestion('Self Review')">
        Удалить вопрос
      </button>
      <span> или </span>
      <button
        class="question-standard"
        @click="standardQuestions('Self Review')"
      >
        Стандартные вопросы
      </button>
    </div>
    <div class="control-buttons">
      <button class="question-add" @click="saveQuestions('Self Review')">
        Сохранить вопросы
      </button>
    </div>
    <p
      :class="saveStatusSelfReview === 'ok' && 'active'"
      class="question__save-status success"
    >
      Вопросы успешно сохранены
    </p>
    <p
      :class="saveStatusSelfReview && saveStatusSelfReview !== 'ok' && 'active'"
      class="question__save-status error"
    >
      При сохранении произошла ошибка: {{ saveStatusSelfReview }}
    </p>
  </div>

  <div
    v-if="
      this.prStatus?.pr_status === 0 ||
      this.prStatus?.pr_status === 1 ||
      this.prStatus?.pr_status === 2
    "
    class="block-container"
  >
    <h2 class="block-title">Вопросы для взаимного оценивания</h2>
    <p class="block-description">
      *В данном блоке необходимо заполнить вопросы для этапа взаимного
      оценивания
    </p>
    <p
      class="block-description"
      v-if="this.prStatus?.pr_status === 0 || this.prStatus?.pr_status === 1"
    >
      *На данном этапе вопросы для взаимного оценивания заполнять необязательно,
      их можно будет заполнить на следующем этапе
    </p>

    <div class="question" v-for="(question, index) in questionsRate">
      <h3 class="question__number">{{ index + 1 }}. Добавление вопроса</h3>
      <p class="question__title">Вопрос:</p>
      <textarea
        rows="2"
        maxlength="512"
        name="name"
        @input="(e) => inputTitle(e, index, 'Rate')"
        :value="question.title"
        class="question__input"
      />
      <p class="question__title">Описание вопроса:</p>
      <textarea
        rows="3"
        maxlength="512"
        name="description"
        @input="(e) => inputDescription(e, index, 'Rate')"
        :value="question.description"
        class="question__input"
      />
    </div>

    <div class="control-buttons">
      <button class="question-add" @click="addQuestion('Rate')">
        Добавить вопрос
      </button>
      <button class="question-delete" @click="deleteQuestion('Rate')">
        Удалить вопрос
      </button>
      <span> или </span>
      <button class="question-standard" @click="standardQuestions('Rate')">
        Стандартные вопросы
      </button>
    </div>
    <div class="control-buttons">
      <button class="question-add" @click="saveQuestions('Rate')">
        Сохранить вопросы
      </button>
    </div>
    <p
      :class="saveStatusRate === 'ok' && 'active'"
      class="question__save-status success"
    >
      Вопросы успешно сохранены
    </p>
    <p
      :class="saveStatusRate && saveStatusRate !== 'ok' && 'active'"
      class="question__save-status error"
    >
      При сохранении произошла ошибка: {{ saveStatusRate }}
    </p>
  </div>

  <div class="block-container">
    <h2 class="block-title">Моя команда</h2>
    <p class="block-description">
      *Здесь отображаются сотрудники вашей команды
    </p>
    <div class="inside-wrapper rating" style="width: 95%">
      <div class="grades" v-for="worker in user.team">
        <div class="items rating-name">
          <a class="name-link">
            <div class="peers-pic-raiting">
              <img
                class="avatar"
                :src="API_URL() + worker.photo"
                alt="Аватар"
              />
            </div>
          </a>
          <a class="name-link">{{ worker.username }} </a>
          <button
            class="exit"
            @click="deleteUser(worker.profile_id)"
            v-if="prStatus?.status === 'no pr' || prStatus?.pr_status < 0"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="block-container"
    v-if="prStatus?.status === 'no pr' || prStatus?.pr_status < 0"
  >
    <h2 class="block-title">Выбор сотрудников в мою команду</h2>
    <p class="block-description">
      *здесь вы можете выбрать сотрудников, которые работают в вашей команде
    </p>
    <button class="add-peer" @click="openAllUsers">Добавить сотрудников</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { API_URL } from "@/helpers/api";
import { openModal } from "jenesius-vue-modal";
import PeersList from "@/components/modals/PeersList/PeersList.vue";
import PeersListMobile from "@/components/modals/PeersList/peersListMobile.vue";
import Confirmation from "@/components/modals/Confirmation/Confirmation.vue";
import questions from "@/constants/questions";
import questionsSelfReview from "@/constants/questionsSelfReview";

export default {
  name: "ControlReview",

  components: { Datepicker },

  data() {
    const date = ref(new Date());

    const time = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });

    const format = (date) => {
      const day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (month < 10) {
        month = "0" + month;
      }

      return `${day}/${month}/${year}`;
    };

    return {
      date,
      time,
      format,
      questionsSelfReview: [{ title: "", description: "" }],
      questionsSelfReviewErrors: [],
      questionsRate: [{ title: "", description: "" }],
      questionsRateErrors: [],
      isQuestionsSelfReviewNew: true,
      isQuestionsRateNew: true,
      saveStatusSelfReview: null,
      saveStatusRate: null,
    };
  },

  mounted() {
    if (this.user.team.length === 0) this.$store.dispatch("getMyTeam");

    if (this.prStatus) this.getQuestionsList();
  },

  computed: {
    ...mapState(["prStatus", "user", "isMobile"]),
    getStage() {
      switch (this.prStatus.pr_status) {
        case 0:
          return '"Self-Review"';
        case 1:
          return '"Утверждение пиров"';
        case 2:
          return '"Взаимное оценивание"';
        case 3:
          return '"One to One"';
      }
    },
  },

  methods: {
    API_URL() {
      return API_URL;
    },

    prBegin() {
      this.$store.dispatch("beginPerformanceReview");
    },

    prNext() {
      let month = this.date.getMonth() + 1,
        hours = this.time.hours,
        minutes = this.time.minutes;
      if (month < 10) month = "0" + month;
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      const deadline = `${this.date.getFullYear()}-${month}-${this.date.getDate()}T${hours}:${minutes}`;

      if (this.prStatus.pr_status === 0) {
        this.questionsSelfReviewErrors =
          this.questionsSelfReview.length === 0
            ? [true]
            : this.questionsSelfReview
                .map(
                  (question) =>
                    question.title.length === 0 ||
                    (question.title.length === 0 &&
                      question.description.length === 0)
                )
                .filter((error) => error === true);
      } else if (this.prStatus.pr_status === 2) {
        this.questionsRateErrors =
          this.questionsRate.length === 0
            ? [true]
            : this.questionsRate
                .map(
                  (question) =>
                    question.title.length === 0 &&
                    question.description.length === 0
                )
                .filter((error) => error === true);
      }

      if (
        this.questionsSelfReviewErrors.length === 0 &&
        this.questionsRateErrors.length === 0
      ) {
        this.saveQuestions("Self Review");
        this.saveQuestions("Rate");
        this.$store.dispatch("nextStagePerformanceReview", deadline);
      }
    },

    prClose() {
      this.$store.dispatch("closePerformanceReview");
    },

    openAllUsers() {
      if (!this.isMobile)
        openModal(PeersList, { isManager: true, isAllUsers: true });
      else openModal(PeersListMobile, { isManager: true, isAllUsers: true });
    },

    deleteUser(id) {
      this.$store.dispatch("deleteUserImMyTeam", id);
    },

    inputTitle(e, index, type) {
      if (type === "Self Review")
        this.questionsSelfReview[index].title = e.target.value;
      else if (type === "Rate")
        this.questionsRate[index].title = e.target.value;
      this.clearErrors();
    },

    inputDescription(e, index, type) {
      if (type === "Self Review")
        this.questionsSelfReview[index].description = e.target.value;
      else if (type === "Rate")
        this.questionsRate[index].description = e.target.value;
      this.clearErrors();
    },

    addQuestion(type) {
      if (type === "Self Review")
        this.questionsSelfReview.push({ title: "", description: "" });
      else if (type === "Rate")
        this.questionsRate.push({ title: "", description: "" });
      this.clearErrors();
    },

    deleteQuestion(type) {
      if (type === "Self Review") this.questionsSelfReview.pop();
      else if (type === "Rate") this.questionsRate.pop();
      this.clearErrors();
    },

    standardQuestions(type) {
      openModal(Confirmation, {
        rewriteQuestions: () => this.rewriteQuestions(type),
        addListQuestions: () => this.addListQuestions(type),
      });
    },

    rewriteQuestions(type) {
      if (type === "Self Review") this.questionsSelfReview = [];
      else if (type === "Rate") this.questionsRate = [];
      this.addListQuestions(type);
    },

    addListQuestions(type) {
      if (type === "Self Review")
        questionsSelfReview.map((question) =>
          this.questionsSelfReview.push({
            title: question.title,
            description: question.description,
          })
        );
      else if (type === "Rate")
        questions.map((question) =>
          this.questionsRate.push({
            title: question.title,
            description: question.description,
          })
        );
    },

    async saveQuestions(type) {
      const mark_system = 4;
      const isSelfReview = type === "Self Review";

      const status = await this.$store.dispatch("saveQuestions", {
        isNew: isSelfReview
          ? this.isQuestionsSelfReviewNew
          : this.isQuestionsRateNew,
        payload: {
          mark_system,
          is_self_review: isSelfReview,
          questions: isSelfReview
            ? this.questionsSelfReview.map((question) => {
                return {
                  name: question.title,
                  description: question.description,
                };
              })
            : this.questionsRate.map((question) => {
                return {
                  name: question.title,
                  description: question.description,
                };
              }),
        },
      });

      if (type === "Self Review") {
        this.saveStatusSelfReview = status;
        this.isQuestionsSelfReviewNew = false;
        setTimeout(() => (this.saveStatusSelfReview = null), 1500);
      } else if (type === "Rate") {
        this.saveStatusRate = status;
        this.isQuestionsRateNew = false;
        setTimeout(() => (this.saveStatusRate = null), 1500);
      }
    },

    clearErrors() {
      this.questionsSelfReviewErrors = [];
      this.questionsRateErrors = [];
    },

    async getQuestionsList() {
      if (this.prStatus.pr_status === 0) {
        const questions = await this.$store.dispatch("getQuestions", {
          is_self_review: true,
        });
        if (questions) {
          this.questionsSelfReview = questions;
          this.isQuestionsSelfReviewNew = false;
        }
      }

      if (
        this.prStatus?.pr_status === 0 ||
        this.prStatus?.pr_status === 1 ||
        this.prStatus?.pr_status === 2
      ) {
        const questions = await this.$store.dispatch("getQuestions", {
          is_self_review: false,
        });
        if (questions) {
          this.questionsRate = questions;
          this.isQuestionsRateNew = false;
        }
      }
    },
  },

  watch: {
    prStatus: {
      handler() {
        this.getQuestionsList();
      },
    },
  },
};
</script>

<style lang="scss" src="./controlReview.scss" scoped></style>
