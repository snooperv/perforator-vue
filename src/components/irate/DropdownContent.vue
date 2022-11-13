<template>
  <div id="myDropdown-3" class="dropdown-content show">
    <div class="dropdown-container">
      <form name="formRate">
        <h3 class="dropdownTitle">Соблюдение сроков</h3>

        <textarea
          name="deadlines"
          cols="40"
          rows="4"
          maxlength="512"
          class="ta"
          id="deadlines"
          required=""
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating" style="position: relative; top: 10px">
          <input
            type="radio"
            name="rates_deadlines"
            value="4"
            class="radio-1-1"
            id="radio-1-1-1"
          />
          <label for="radio-1-1-1">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_deadlines"
            value="3"
            class="radio-1-1"
            id="radio-1-2-1"
          />
          <label for="radio-1-2-1">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_deadlines"
            value="2"
            class="radio-1-1"
            id="radio-1-3-1"
          />
          <label for="radio-1-3-1">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_deadlines"
            value="1"
            class="radio-1-1"
            id="radio-1-4-1"
          />
          <label for="radio-1-4-1">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p id="text-rate-1-1" class="text_rate"></p>
        </div>

        <h3 class="dropdownTitle">Пути достижения целей</h3>

        <p class="description">
          Идет ли человек по головам или находит пути решения договариваясь с
          коллегами
        </p>

        <textarea
          name="approaches"
          cols="40"
          rows="4"
          maxlength="512"
          class="ta"
          id="goals"
          required=""
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating">
          <input
            type="radio"
            name="rates_approaches"
            value="4"
            class="radio-1-2"
            id="radio-1-1-2"
          />
          <label for="radio-1-1-2">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_approaches"
            value="3"
            class="radio-1-2"
            id="radio-1-2-2"
          />
          <label for="radio-1-2-2">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_approaches"
            value="2"
            class="radio-1-2"
            id="radio-1-3-2"
          />
          <label for="radio-1-3-2">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_approaches"
            value="1"
            class="radio-1-2"
            id="radio-1-4-2"
          />
          <label for="radio-1-4-2">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p id="text-rate-1-2" class="text_rate"></p>
        </div>

        <h3 class="dropdownTitle">Умение работать в команде</h3>

        <p class="description">
          Насколько активно человек вовлечен в командную работу
        </p>

        <textarea
          name="teamwork"
          cols="40"
          rows="4"
          maxlength="512"
          class="ta"
          id="teamwork"
          required=""
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating">
          <input
            type="radio"
            name="rates_teamwork"
            value="4"
            class="radio-1-3"
            id="radio-1-1-3"
          />
          <label for="radio-1-1-3">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_teamwork"
            value="3"
            class="radio-1-3"
            id="radio-1-2-3"
          />
          <label for="radio-1-2-3">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_teamwork"
            value="2"
            class="radio-1-3"
            id="radio-1-3-3"
          />
          <label for="radio-1-3-3">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_teamwork"
            value="1"
            class="radio-1-3"
            id="radio-1-4-3"
          />
          <label for="radio-1-4-3">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p id="text-rate-1-3" class="text_rate"></p>
        </div>

        <h3 class="dropdownTitle">Приверженность к хорошим теx.практикам</h3>

        <p class="description">
          Насколько человек придерживается покрытия кода авто тестами,
          проектирует хорошую архитектуру, использует хорошие паттерны.
        </p>

        <textarea
          name="practices"
          cols="40"
          rows="4"
          maxlength="512"
          class="ta"
          id="techPrac"
          required=""
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating">
          <input
            type="radio"
            name="rates_practices"
            value="4"
            class="radio-1-4"
            id="radio-1-1-4"
          />
          <label for="radio-1-1-4">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_practices"
            value="3"
            class="radio-1-4"
            id="radio-1-2-4"
          />
          <label for="radio-1-2-4">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_practices"
            value="2"
            class="radio-1-4"
            id="radio-1-3-4"
          />
          <label for="radio-1-3-4">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_practices"
            value="1"
            class="radio-1-4"
            id="radio-1-4-4"
          />
          <label for="radio-1-4-4">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p id="text-rate-1-4" class="text_rate"></p>
        </div>

        <h3 class="dropdownTitle">Уровень владения технологиями</h3>

        <p class="description">
          Насколько хорошо человек владеет технологиями разработки, используемым
          стеком и т.д.
        </p>

        <textarea
          name="experience"
          cols="40"
          rows="4"
          maxlength="512"
          class="ta"
          id="techSkills"
          required=""
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating">
          <input
            type="radio"
            name="rates_experience"
            value="4"
            class="radio-1-5"
            id="radio-1-1-5"
          />
          <label for="radio-1-1-5">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_experience"
            value="3"
            class="radio-1-5"
            id="radio-1-2-5"
          />
          <label for="radio-1-2-5">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_experience"
            value="2"
            class="radio-1-5"
            id="radio-1-3-5"
          />
          <label for="radio-1-3-5">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_experience"
            value="1"
            class="radio-1-5"
            id="radio-1-4-5"
          />
          <label for="radio-1-4-5">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p id="text-rate-1-5" class="text_rate"></p>
        </div>

        <h3 class="dropdownTitle">Адаптивность</h3>

        <p class="description">
          Насколько быстро человек адаптируется к новым условиям работы,
          вливается в новый коллектив
        </p>

        <textarea
          name="adaptation"
          cols="40"
          rows="4"
          maxlength="512"
          class="ta"
          id="adaptive"
          required=""
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating">
          <input
            type="radio"
            name="rates_adaptation"
            value="4"
            class="radio-1-6"
            id="radio-1-1-6"
          />
          <label for="radio-1-1-6">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_adaptation"
            value="3"
            class="radio-1-6"
            id="radio-1-2-6"
          />
          <label for="radio-1-2-6">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_adaptation"
            value="2"
            class="radio-1-6"
            id="radio-1-3-6"
          />
          <label for="radio-1-3-6">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_adaptation"
            value="1"
            class="radio-1-6"
            id="radio-1-4-6"
          />
          <label for="radio-1-4-6">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p id="text-rate-1-6" class="text_rate"></p>
        </div>

        <input type="hidden" name="profile" value="3" />
        <input type="submit" value="Отправить отзыв" name="rate-3" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownContent",
};
</script>

<style scoped>
.text_rate {
  position: absolute;
  margin-top: 50px;
  margin-right: -88px;
  width: 270px;
}

b {
  background-color: #edbd31;
  border-radius: 50%;
  width: 10px;
}

.rating {
  display: flex;
  flex-direction: row-reverse;
  width: 200px;
  float: right;
  margin-right: 120px;
  margin-top: -190px;
  position: relative;
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

.dropdown-content {
  display: none;
  padding-top: 50px;
  padding-bottom: 10px;
  background-color: #ececf2;
  width: 90%;
  border-radius: 15px;
  transform: translateY(-50px);
  position: relative;
  z-index: 1;
}

.dropdown-container {
  margin-left: 150px;
}

.ta {
  display: block;
  border-radius: 15px;
  border: 1px solid #8683f8;
  width: 60%;
  padding: 5px;
  font-size: 16px;
  resize: none;
  margin-bottom: 30px;
  margin-top: 15px;
  line-height: 1.5;
  position: relative;
}

.dropdownTitle {
  margin: 20px 0 5px 0;
  color: #2b2b2b;
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -1px;
  text-align: left;
}

p.description {
  position: relative;
  font-family: "Gotham Pro light", sans-serif;
  font-size: 18px;
  width: 62%;
  font-weight: 1000;
  line-height: 18px;
  letter-spacing: -0.04em;
  margin: 0 0 10px 0;
  color: #3c3c3c;
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

.char-count {
  text-align: right;
  font-size: 14px;
  position: relative;
  top: -55px;
  right: 41%;
}

.chars,
.max {
  font-size: 14px !important;
  position: relative;
  display: inline-block;
  font-family: "Gotham Pro light", sans-serif;
  font-weight: 400;
  color: #979797;
}

.show {
  display: block;
}
</style>
