<template>
  <div class="self-review">
    <div class="form" id="head">Сотрудник Дима2</div>

    <div class="form">
      <div class="container">
        <h2 class="title">Итоговая обратная связь</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td class="table-heading">менеджер</td>
              <td class="table-heading">пиры</td>
              <td class="table-heading">средняя</td>
            </tr>
            <tr>
              <td class="text-in-table">Средняя оценка</td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="average_avg_manager">
                  2.67
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="average_avg_peers">2.67</div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="average_avg_averages">
                  2.67
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <div class="table-title">Оценки по каждому критерию</div>
              </td>
            </tr>
            <tr>
              <td class="text-in-table">Соблюдение сроков</td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="time_avg_manager">3.00</div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="time_avg_peers">2.00</div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="time_avg_averages">2.50</div>
              </td>
            </tr>
            <tr>
              <td class="text-in-table">Пути достижения целей</td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="target_avg_manager">
                  4.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="target_avg_peers">4.00</div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="target_avg_averages">
                  4.00
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-in-table">Умение работать в команде</td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="teamwork_avg_manager">
                  2.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number bad" id="teamwork_avg_peers">1.00</div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number bad" id="teamwork_avg_averages">
                  1.50
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-in-table">
                Приверженность к хорошим техническим практикам
              </td>
              <td class="numbers-in-table">
                <div class="grade-number bad" id="practices_avg_manager">
                  1.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="practices_avg_peers">
                  3.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="practices_avg_averages">
                  2.00
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-in-table">Уровень владения технологиями</td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="technologies_avg_manager">
                  4.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="technologies_avg_peers">
                  2.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="technologies_avg_averages">
                  3.00
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-in-table">Адаптивность</td>
              <td class="numbers-in-table">
                <div class="grade-number good" id="adaptive_avg_manager">
                  2.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="adaptive_avg_peers">
                  4.00
                </div>
              </td>
              <td class="numbers-in-table">
                <div class="grade-number great" id="adaptive_avg_averages">
                  3.00
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
  </div>
</template>

<script>
export default {
  name: "OneWorker",
};
</script>

<style scoped>
h2,
h3,
h4 {
  color: #222222;
  margin-top: 15px;
  font-size: 24px;
}

p {
  font-family: "Gotham Pro light";
  font-weight: 1000;
  color: #222222;
  margin: 0;
}

td {
  color: #222222;
  font-weight: 400;
  font-size: 18px;
}

.self-review {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 90%;

  color: rgb(167, 167, 167);
  font-weight: 600;
}

.form {
  margin-top: 40px;
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

.icon-circle {
  font-size: 9px !important;
  margin: 0;
  color: #cac9f7;
  position: relative;
  top: -3px;
}

.commas::before {
  content: "A";
  position: absolute;
  left: 0px;
  top: 0px;
  padding-bottom: 20px;
  font-size: 30px;
  color: #edbd31;
  background-size: 25px auto;
  transform: rotate(180deg);
}

.table-heading {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 11px;
  text-align: center;
}

table {
  display: grid;
  width: 95%;
  height: 575px;
  margin: 15px;
  background: #ececf2;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 35px;
  border-spacing: 10px;
}

.grade-number {
  font-size: 20px;
  color: #fff;
  padding: 5px;
  text-align: center;
  border-radius: 25px;
  width: 60px;
  height: 32px;
  line-height: 32px;
  display: inline-block;
  margin-left: 15px;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 10px;
}

.great {
  background-color: #a5a4f5;
}

.good {
  background-color: #edbd31;
}

.bad {
  background-color: #cd2525;
}

.numbers-in-table {
  width: 81px;
  height: 46px;
  background: #ffffff;
  border-radius: 17px;
}

.numbers-in-table:nth-child(3n + 1) {
  margin-right: 20px;
}

.text-in-table {
  width: 457px;
  height: 46px;
  padding-left: 20px;
  margin-left: 20px;

  background: #ffffff;
  border-radius: 17px;
}

.text-in-self {
  padding: 10px;
  padding-left: 30px;
  padding-right: 30px;
  font-weight: normal;
  font-size: 14px;
  line-height: 15px;
  color: #27264d;
}

.text-under-head-self {
  color: #686868;
  font-weight: 200 !important;
  font-size: 14px;
  line-height: 15px;
  font-style: normal;
}

.table-title {
  margin: 10px;
  font-size: 21px;
}

.title-self {
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
}

.title {
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
}

.title-head-self {
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 0;
  margin-top: 0;
}

.final-grades {
  font-family: Gotham Pro;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 19px;
  margin-left: 20px;
}

.self-review-manager {
  padding: 20px;
  margin-left: 60px;
}

.self-review-manager-result {
  padding: 20px;
  margin-left: 20px;
  margin-bottom: 5px;
}

.self-review-manager-result:nth-last-child(1) {
  margin-bottom: 30px;
}

.white-border {
  background: #ffffff;
  border-radius: 15px;
  width: 90%;
  margin-bottom: 10px;
  margin-top: 20px;
}

.gray-border {
  background: #f4f4fa;
  border-radius: 19px;
  margin-bottom: 15px;
}

.peer-info {
  vertical-align: middle;
}

.description {
  margin-top: -25px;
  font-size: 14px;
  margin-bottom: 20px;
}

.dropbtn {
  background-color: white;
  color: white;
  margin-right: auto;
  left: 15px;
  float: right;
  font-size: 16px;
  border: none;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.chevron {
  position: relative;
  float: right;
  margin-right: 25px;
  font-size: 1.5em;
  color: #331969;
  pointer-events: none;
}

.dropdown-content {
  display: none;
  padding-top: 50px;
  background-color: #ececf2;
  width: 95%;
  border-radius: 15px;
  transform: translateY(-50px);
  position: relative;
  z-index: 1;
}

.dropdown-container {
  margin-left: 70px;
  padding-bottom: 10px;
}

.photo {
  border: 2px solid #222222;
  border-radius: 50%;
}

.show {
  display: block !important;
}

.drop {
  display: none;
}

.question,
.grade_category_name,
.description {
  font-weight: 400;
  font-family: "Gotham Pro", serif;
  font-size: 21px;
  font-style: normal;
}

.grade_category_name {
  font-weight: 700;
  margin-top: 0;
}

.description {
  color: #686868;
  font-size: 14px;
  font-weight: 200;
}
</style>
