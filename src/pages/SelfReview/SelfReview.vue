<template>
  <div class="self-review">
    <div class="instruction" v-if="!isMobile">
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
    <Instruction v-if="isMobile" />
    <h2 class="title">Self Review</h2>
    <div
      class="stage-opened"
      v-if="prStatus?.status !== 'no pr' && prStatus?.pr_status > 0"
    >
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
      <h2 class="title" v-if="!user.statusManager">Оценивающие</h2>
      <div class="peers" v-if="!user.statusManager">
        <p>
          <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
          <span>Пиры</span><br />
          Люди, с которыми вы взаимодействуете по рабочим вопросам. Рекомендуем
          выбирать 3-7 человек
        </p>
        <div id="my_peers" v-for="peer in user.peers">
          <div class="peer-sel" :id="'my-peer-' + peer.profile_id">
            <div class="peers-pic">
              <img
                class="avatar"
                :src="API_URL() + peer.photo"
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

    <div class="stage-closed" v-else>
      <h3>Данный этап сейчас закрыт</h3>
      <p>
        Вы сможете заполнить Self-Review после того как менеджер запустит этап
        Self-Review
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { openModal } from "jenesius-vue-modal";
import PeersList from "@/components/modals/PeersList/PeersList.vue";
import { API_URL } from "@/helpers/api";
import Instruction from "@/components/modals/SelfReview/Instruction.vue";
import PeersListMobile from "@/components/modals/PeersList/peersListMobile.vue";

export default {
  name: "SelfReview",
  components: { Instruction },

  data() {
    return {
      reviewContent: [],
    };
  },

  computed: {
    ...mapState(["user", "selfReview", "isMobile", "prStatus"]),

    openModalPeers() {
      this.isMobile
        ? openModal(PeersListMobile, { isManager: false })
        : openModal(PeersList, { isManager: false });
    },

    isSendDisabled() {
      const isFillText = this.selfReview.grades.filter(
        (grade) => grade.comment !== ""
      );
      return !(
        isFillText.length === this.selfReview.grades.length &&
        (this.user.peers.length > 0 || this.user.statusManager)
      );
    },
  },

  methods: {
    API_URL() {
      return API_URL;
    },
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
    this.$store.dispatch("getMyPeers").then(() => console.log(this.user.peers));
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

<style lang="scss" src="./selfReview.scss" scoped></style>
