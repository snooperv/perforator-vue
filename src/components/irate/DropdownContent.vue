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
          required
        ></textarea>
        <div class="char-count">
          <span id="imp-zones-chars" class="chars">0</span>
          <span id="plan-max" class="max">/ 512 символов</span>
        </div>

        <div class="rating">
          <input
            type="radio"
            name="rates_deadlines"
            value="4"
            class="radio-1-1"
            :id="`radio-${peerId}-1-1`"
          />
          <label :for="`radio-${peerId}-1-1`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_deadlines"
            value="3"
            class="radio-1-1"
            :id="`radio-${peerId}-2-1`"
          />
          <label :for="`radio-${peerId}-2-1`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_deadlines"
            value="2"
            class="radio-1-1"
            :id="`radio-${peerId}-3-1`"
          />
          <label :for="`radio-${peerId}-3-1`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_deadlines"
            value="1"
            class="radio-1-1"
            :id="`radio-${peerId}-4-1`"
          />
          <label :for="`radio-${peerId}-4-1`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p class="text_rate">Ваша оценка:</p>
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
          required
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
            :id="`radio-${peerId}-1-2`"
          />
          <label :for="`radio-${peerId}-1-2`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_approaches"
            value="3"
            class="radio-1-2"
            :id="`radio-${peerId}-2-2`"
          />
          <label :for="`radio-${peerId}-2-2`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_approaches"
            value="2"
            class="radio-1-2"
            :id="`radio-${peerId}-3-2`"
          />
          <label :for="`radio-${peerId}-3-2`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_approaches"
            value="1"
            class="radio-1-2"
            :id="`radio-${peerId}-4-2`"
          />
          <label :for="`radio-${peerId}-4-2`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p class="text_rate">Ваша оценка:</p>
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
          required
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
            :id="`radio-${peerId}-1-3`"
          />
          <label :for="`radio-${peerId}-1-3`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_teamwork"
            value="3"
            class="radio-1-3"
            :id="`radio-${peerId}-2-3`"
          />
          <label :for="`radio-${peerId}-2-3`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_teamwork"
            value="2"
            class="radio-1-3"
            :id="`radio-${peerId}-3-3`"
          />
          <label :for="`radio-${peerId}-3-3`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_teamwork"
            value="1"
            class="radio-1-3"
            :id="`radio-${peerId}-4-3`"
          />
          <label :for="`radio-${peerId}-4-3`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p class="text_rate">Ваша оценка:</p>
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
          required
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
            :id="`radio-${peerId}-1-4`"
          />
          <label :for="`radio-${peerId}-1-4`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_practices"
            value="3"
            class="radio-1-4"
            :id="`radio-${peerId}-2-4`"
          />
          <label :for="`radio-${peerId}-2-4`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_practices"
            value="2"
            class="radio-1-4"
            :id="`radio-${peerId}-3-4`"
          />
          <label :for="`radio-${peerId}-3-4`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_practices"
            value="1"
            class="radio-1-4"
            :id="`radio-${peerId}-4-4`"
          />
          <label :for="`radio-${peerId}-4-4`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p class="text_rate">Ваша оценка:</p>
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
          required
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
            :id="`radio-${peerId}-1-5`"
          />
          <label :for="`radio-${peerId}-1-5`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_experience"
            value="3"
            class="radio-1-5"
            :id="`radio-${peerId}-2-5`"
          />
          <label :for="`radio-${peerId}-2-5`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_experience"
            value="2"
            class="radio-1-5"
            :id="`radio-${peerId}-3-5`"
          />
          <label :for="`radio-${peerId}-3-5`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_experience"
            value="1"
            class="radio-1-5"
            :id="`radio-${peerId}-4-5`"
          />
          <label :for="`radio-${peerId}-4-5`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p class="text_rate">Ваша оценка:</p>
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
          required
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
            :id="`radio-${peerId}-1-6`"
          />
          <label :for="`radio-${peerId}-1-6`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_adaptation"
            value="3"
            class="radio-1-6"
            :id="`radio-${peerId}-2-6`"
          />
          <label :for="`radio-${peerId}-2-6`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_adaptation"
            value="2"
            class="radio-1-6"
            :id="`radio-${peerId}-3-6`"
          />
          <label :for="`radio-${peerId}-3-6`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <input
            type="radio"
            name="rates_adaptation"
            value="1"
            class="radio-1-6"
            :id="`radio-${peerId}-4-6`"
          />
          <label :for="`radio-${peerId}-4-6`">
            <img src="@/assets/img/rating2.png" alt="" />
          </label>

          <p class="text_rate">Ваша оценка:</p>
        </div>

        <input type="hidden" name="profile" :value="peerId" />
        <input type="submit" value="Отправить отзыв" @click="postForm" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropdownContent",

  props: {
    peerId: {
      type: Number,
      required: true,
    },
  },

  methods: {
    postForm(event) {
      event.preventDefault();
      const form = new FormData(event.target.parentElement);
      console.log(event.target.parentElement);
      this.$store.dispatch("postPeersRatedMe", form);
    },
  },
};
</script>

<style lang="scss" src="./dropdownContent.scss" scoped></style>
