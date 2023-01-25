<template>
  <div class="self-review">
    <div class="form" v-if="worker?.username" id="head">
      {{ worker?.username }}
    </div>

    <div class="form">
      <div class="container">
        <h2 class="title">Итоговая обратная связь</h2>
        <table id="finalScore">
          <tbody>
            <tr>
              <td></td>
              <td class="text-in-table" v-for="text in userReadable">
                {{ text }}
              </td>
            </tr>
            <tr>
              <td class="table-heading">менеджер</td>
              <td
                class="numbers-in-table"
                v-for="rate in worker.rating?.manager"
              >
                <div
                  class="grade-number"
                  :class="colorGrade(rate)"
                  id="average_avg_manager"
                >
                  {{ rate }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="table-heading">пиры</td>
              <td class="numbers-in-table" v-for="rate in worker.rating?.peers">
                <div
                  class="grade-number"
                  :class="colorGrade(rate)"
                  id="average_avg_manager"
                >
                  {{ rate }}
                </div>
              </td>
            </tr>
            <tr>
              <td class="table-heading">средняя</td>
              <td
                class="numbers-in-table"
                v-for="rate in worker.rating?.averages"
              >
                <div
                  class="grade-number"
                  :class="colorGrade(rate)"
                  id="average_avg_manager"
                >
                  {{ rate }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!------->
    <div class="form">
      <div class="container feedback-manager" :class="{ opened: fbIsDropdown }">
        <h2 class="title" @click="fbIsDropdown = !fbIsDropdown">
          Отзыв от менеджера
          <button class="peer dropbtn">
            <a href="" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
        </h2>

        <DropdownContent
          v-if="fbIsDropdown && loaded"
          :peer-id="Number($route.params.id)"
          :prId="$route.params.prId"
        />
      </div>
    </div>
    <!--self review-->
    <div class="form" v-if="data.previousPeriod && !user.statusManager">
      <div class="container feedback-manager">
        <h2 class="title" @click="srIsDropdown = !srIsDropdown">
          Результаты SelfReview
          <button class="peer dropbtn">
            <a href="" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
        </h2>
        <div class="drop show">
          <SelfReviewContent
            v-if="srIsDropdown && loaded"
            :prId="$route.params.prId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colorGrade from "@/helpers/colorGrade";
import { mapState } from "vuex";
import SelfReviewContent from "@/pages/SelfReview/SelfReviewContent.vue";
import { types } from "@/types";
import DropdownContent from "@/components/irate/DropdownContent.vue";

export default {
  name: "OneWorker",
  components: { DropdownContent, SelfReviewContent },

  data() {
    return {
      worker: {},
      loaded: false,
      userReadable: [
        "Соблюдение сроков",
        "Пути достижения целей",
        "Умение работать в команде",
        "Приверженность к хорошим техническим практикам",
        "Уровень владения технологиями",
        "Адаптивность",
        "Средняя оценка",
      ],
      srIsDropdown: false,
      fbIsDropdown: false,
    };
  },

  computed: {
    ...mapState(["user", "isMobile", "data"]),
  },

  mounted() {
    this.loadWorker();
    this.rotate();
  },

  methods: {
    colorGrade,

    rotate() {
      const table = document.getElementById("finalScore");
      let tr = table.rows;
      if (!tr[1].cells[1]) {
        setTimeout(() => this.rotate(), 1);
        return;
      }

      let i = tr.length,
        j = tr[0].cells.length + 1,
        new_table = document.createElement("table"),
        flag = 1;

      while (j--) {
        for (let new_tr = new_table.insertRow(0), l = 0; l < i; l++) {
          if (j === 1 && flag) {
            let newTd = document.createElement("td");
            newTd.colSpan = 4;
            newTd.innerHTML =
              '<div class="table-title">Оценки по каждому критерию</div>';
            new_tr.append(newTd);
            flag = 0;
            continue;
          }
          if (j === 1 && !flag) continue;
          new_tr.append(tr[l].cells[j - flag]);
        }
      }

      new_table.childNodes[0].children[0].after(
        new_table.childNodes[0].lastChild
      );
      table.replaceChild(new_table.childNodes[0], table.childNodes[0]);
    },

    loadScores() {
      if (this.user.team) {
        this.$store.dispatch("getTeamScores", {
          team: this.user.team,
        });
      }
      this.loadWorker();
    },

    loadWorker() {
      if (
        this.data.previousPeriod?.results.length > 0 ||
        this.user.team.length > 0
      )
        this.worker = (
          this.data.previousPeriod?.results || this.user.team
        ).filter((oneUser) => oneUser.profile_id === +this.$route.params.id)[0];
      else this.worker = this.data.previousPeriod?.results;

      this.loaded = true;
    },
  },

  watch: {
    "user.team": {
      handler() {
        this.loadScores();
      },
    },

    "data.previousPeriod": {
      handler() {
        this.loadWorker();
      },
    },
  },

  beforeUnmount() {
    this.srIsDropdown = false;
    this.$store.commit(types.CLEAR_SELF_REVIEW);
  },
};
</script>

<style lang="scss" src="./oneWorker.scss" scoped></style>
