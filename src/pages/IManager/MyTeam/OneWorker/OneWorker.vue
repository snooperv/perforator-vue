<template>
  <div class="self-review">
    <div class="form" id="head">{{ worker?.username }}</div>

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
    <div class="form">
      <div class="container">
        <h2 class="title">
          Результаты SelfReview
          <button onclick="toggle_sr()" class="peer dropbtn">
            <a href="" class="chevron">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </a>
          </button>
        </h2>
        <div id="sr" class="drop show">
          <div class="">
            <form id="self-review">
              <!--Сюда self review-->
              <div id="id53" class="self-review-manager-result gray-border">
                <h4 id="theme53" class="grade_category_name">Вводная часть</h4>
                <p class="description">
                  Напишите два-три предложения об общем впечатлении от работы за
                  последнее время
                </p>

                <p class="question">
                  Что вам нравится в вашей текущей работе, задачах, отношениях с
                  коллегами, процессах в компании и т.д.?
                </p>
                <div class="white-border">
                  <div class="text-in-self">
                    <span class="description">First text field</span>
                  </div>
                </div>
                <p class="question">
                  Что не нравится, что можно улучшить/ исправить?
                </p>
                <div class="white-border">
                  <div class="text-in-self">
                    <span class="description">Second text field</span>
                  </div>
                </div>
              </div>
              <div id="id55" class="self-review-manager-result gray-border">
                <h4 id="theme55" class="grade_category_name">
                  Успехи и неудачи
                </h4>
                <p class="description">
                  Расскажите, что было сделано за этот период. Выделите те
                  проекты, которыми особенно гордитесь. Чтобы у руководителя
                  была полная картина ваших достижений, укажите название проекта
                  и продолжительность работы над ним
                </p>

                <p class="question">Какие у вас были успехи?</p>
                <div class="white-border">
                  <div class="text-in-self">
                    <span class="description">Third text field</span>
                  </div>
                </div>
                <p class="question">Какие у вас были неудачи?</p>
                <div class="white-border">
                  <div class="text-in-self">
                    <span class="description">Fourth text field</span>
                  </div>
                </div>
              </div>
              <div id="id57" class="self-review-manager-result gray-border">
                <h4 id="theme57" class="grade_category_name">Зоны роста</h4>
                <p class="description">
                  Определите, какие навыки вам важно развивать в ближайшее время
                  и что для этого вы планируете делать. Если вы не можете
                  вспомнить проблемы с задачами, подумайте, какие компетенции
                  стоит развивать, чтобы выполнять работу эффективнее. Например,
                  ваша работа страдает из-за того, что сложно вести переговоры.
                  Значит, это ваша зона роста.
                </p>

                <div class="white-border">
                  <div class="text-in-self">
                    <span class="description">Fifth text field</span>
                  </div>
                </div>
              </div>
              <div id="id58" class="self-review-manager-result gray-border">
                <h4 id="theme58" class="grade_category_name">
                  Планы на будущее
                </h4>
                <p class="description">
                  Напишите долгосрочные планы — к чему хотите прийти в течение
                  следующих нескольких месяцев, и свои пожелания. Подумайте, что
                  вы хотели бы видеть в вашем следующем селф-ревью.
                </p>

                <div class="white-border">
                  <div class="text-in-self">
                    <span class="description">Six text field</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <button class="exit" @click="deleteUser(worker.profile_id)" v-if="isMobile">
      Удалить
    </button>
  </div>
</template>

<script>
import colorGrade from "@/helpers/colorGrade";
import { mapState } from "vuex";

export default {
  name: "OneWorker",

  data() {
    return {
      worker: {},
      userReadable: [
        "Соблюдение сроков",
        "Пути достижения целей",
        "Умение работать в команде",
        "Приверженность к хорошим техническим практикам",
        "Уровень владения технологиями",
        "Адаптивность",
        "Средняя оценка",
      ],
    };
  },

  computed: {
    ...mapState(["user", "isMobile"]),
  },

  mounted() {
    this.user.team.length > 0 && this.loadWorker();
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
      this.worker = this.user.team.filter(
        (oneUser) => oneUser.profile_id === +this.$route.params.id
      )[0];
      console.log(this.worker);
    },

    deleteUser(id) {
      this.$store
        .dispatch("deleteUserImMyTeam", id)
        .then(() => this.$router.push("/i-manager/my-team"));
    },
  },

  watch: {
    "user.team": {
      handler() {
        this.loadScores();
      },
    },
  },
};
</script>

<style lang="scss" src="./oneWorker.scss" scoped></style>
