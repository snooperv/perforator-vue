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
      <div class="container">
        <h2 class="title">
          Отзыв от менеджера
          <button onclick="myFunction()" class="peer dropbtn">
            <a href="" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
        </h2>

        <div id="myDropdown" class="drop show">
          <div class="">
            <div class="peer-info">
              <span id="manager_name">Менеджер Сергей1</span>
            </div>
            <div class="self-review-manager">
              <p>
                <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
                <span>Соблюдение сроков</span>
              </p>
            </div>
            <div class="self-review-manager gray-border commas">
              <p id="deadline">Good</p>
            </div>
            <div class="self-review-manager">
              <p>
                <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
                <span>Пути достижения целей</span>
              </p>
              <span class="description"
                >идет ли человек по головам или находит пути решения
                договариваясь с коллегами</span
              >
            </div>
            <div class="self-review-manager gray-border commas">
              <p id="approaches">Nice</p>
            </div>
            <div class="self-review-manager">
              <p>
                <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
                <span>Умение работать в команде</span>
              </p>
              <span class="description"
                >насколько активно человек вовлечен в командную работу</span
              >
            </div>
            <div class="self-review-manager gray-border">
              <p id="teamwork">You are crazy</p>
            </div>
            <div class="self-review-manager">
              <p>
                <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
                <span>Приверженность к хорошим тех.практикам</span>
              </p>
              <span class="description"
                >насколько человек придерживается покрытия кода авто тестами,
                проектирует хорошую архитектуру, использует хорошие
                паттерны</span
              >
            </div>
            <div class="self-review-manager gray-border">
              <p id="practices">Abc</p>
            </div>
            <div class="self-review-manager">
              <p>
                <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
                <span>Уровень владения технологиями</span>
              </p>
              <span class="description"
                >насколько хорошо человек владеет технологиями разработки,
                используемым стеком и т.д.</span
              >
            </div>
            <div class="self-review-manager gray-border">
              <p id="experience">123</p>
            </div>
            <div class="self-review-manager">
              <p>
                <i class="icon-circle fas fa-circle" aria-hidden="true"></i>
                <span>Адаптивность</span>
              </p>
              <span class="description"
                >насколько быстро человек адаптируется к новым условиям работы,
                вливается в новый коллектив</span
              >
            </div>
            <div class="self-review-manager gray-border">
              <p id="adaptation">rgsdgsdf</p>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
    <!--self review-->
    <div class="form" v-if="data.previousPeriod && !user.statusManager">
      <div class="container" @click="srIsDropdown = !srIsDropdown">
        <h2 class="title">
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

export default {
  name: "OneWorker",
  components: { SelfReviewContent },

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
