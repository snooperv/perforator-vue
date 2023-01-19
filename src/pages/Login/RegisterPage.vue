<template>
  <div class="background">
    <div class="register" id="reg">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first"></div>
          <div class="logo-title">
            <img src="@/assets/img/logo.svg" alt="Picture" class="logo" />
            <h1>Perforator</h1>
          </div>
          <form>
            <input
              type="text"
              name="name"
              placeholder="Имя и фамилия"
              class="fadeIn second"
              :class="{ hasError: this.loginError }"
              :value="login"
              @input="updateLogin"
              @keydown.enter.prevent="registerMethod"
              pattern="^\S+ \S+$"
              autofocus
              required
            />
            <div v-if="this.loginError">
              <p class="input-error" v-html="loginError"></p>
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Номер телефона"
              class="fadeIn second"
              :class="{ hasError: this.phoneError }"
              :value="phone"
              @input="updatePhone"
              @keydown.enter.prevent="registerMethod"
              v-mask="'+7 (###) ###-##-##'"
              required
            />
            <div v-if="this.phoneError">
              <p class="input-error" v-html="phoneError"></p>
            </div>

            <input
              type="url"
              name="sbis"
              placeholder="Ссылка на профиль"
              class="fadeIn third"
              :class="{ hasError: this.referenceError }"
              :value="reference"
              @input="updateReference"
              @keydown.enter.prevent="registerMethod"
              required
            />
            <div v-if="this.referenceError">
              <p class="input-error" v-html="referenceError"></p>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Пароль"
              class="fadeIn third"
              :class="{ hasError: this.passwordError }"
              :value="password"
              @input="updatePassword"
              @keydown.enter.prevent="registerMethod"
              required
            />
            <div v-if="this.passwordError">
              <p class="input-error" v-html="passwordError"></p>
            </div>

            <div class="photo fadeIn third">
              <div class="empty">
                <img id="myImg" :src="avatar" alt="Picture" class="avatar" />
              </div>
              <div class="background-photo-upload">
                <div class="inner-wrapper">
                  <p class="photo-text">
                    {{ imageFile.name || "Ваша аватарка" }}
                  </p>
                  <label
                    >Выбрать файл
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      placeholder="Фото"
                      class="photo-btn"
                      :class="{ hasError: this.imageError }"
                      @input="updateImage"
                      id="photo"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
            <div v-if="this.imageError">
              <p class="input-error" v-html="imageError"></p>
            </div>

            <input
              type="button"
              value="Зарегистрироваться"
              @click="registerMethod"
            />
          </form>
          <p class="agreement">
            Регистрируясь, вы принимаете наши
            <a href="#">Условия, Политику использования данных</a> и
            <a href="#">Политику в отношении файлов cookie.</a>
          </p>
        </div>
      </div>
      <div class="enter fadeInDown">
        <div id="formEnter">
          <p>
            Уже есть аккаунт?
            <router-link to="/login" style="color: #2c286d">Войти</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { types } from "@/types";

export default {
  mounted() {
    const cookieToken = this.$store.getters.cookieToken;

    if (localStorage.token) {
      this.$router.push("/self-review");
      return;
    }
    this.$store.commit("CLEAR_lOCALSTORGE");
  },

  data() {
    return {
      login: "",
      loginError: false,
      password: "",
      passwordError: false,
      phone: "",
      phoneError: false,
      reference: "",
      referenceError: false,
      image: "",
      imageFile: "",
      imageError: false,
    };
  },

  computed: {
    ...mapState(["user"]),
    avatar() {
      return this.image || require(`@/assets/img/avatar.png`);
    },
  },

  methods: {
    registerMethod() {
      this.loginValidate();
      this.phoneValidate();
      this.passwordValidate();
      this.referenceValidate();
      this.imageValidate();
      if (
        !this.loginError &&
        !this.passwordError &&
        !this.phoneError &&
        !this.referenceError &&
        !this.imageError
      ) {
        const formatPhone = "+" + this.phone.replace(/[^0-9]/g, "");
        let formData = new FormData();
        formData.append("name", this.login);
        formData.append("phone", formatPhone);
        formData.append("sbis", this.reference);
        formData.append("password", this.password);
        formData.append("photo", this.imageFile);
        this.$store.dispatch("registerNewUser", formData);
      }
    },

    updateLogin(e) {
      this.login = e.target.value;
      this.loginValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    updatePhone(e) {
      this.phone = e.target.value;
      this.phoneValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    updatePassword(e) {
      this.password = e.target.value;
      this.passwordValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    updateReference(e) {
      this.reference = e.target.value;
      this.referenceValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    updateImage(e) {
      this.imageFile = e.target.files[0];
      //console.log(this.imageFile);

      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.image = reader.result;
        }.bind(this),
        false
      );

      if (this.imageFile) {
        if (/\.(jpe?g|png|gif)$/i.test(this.imageFile.name)) {
          reader.readAsDataURL(this.imageFile);
        }
      }

      this.imageValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    loginValidate() {
      if (!this.login) {
        this.loginError = "Необходимо указать имя и фамилию";
        return false;
      }

      const countWords = this.login.split(" ").length;

      if (countWords !== 2) {
        console.log("Error");
        this.loginError = "Введите значение в формате: Имя Фамилия";
        return false;
      }

      this.loginError = false;
      return true;
    },

    phoneValidate() {
      if (!this.phone) {
        this.phoneError = "Необходимо заполнить телефон";
        return false;
      }

      this.phoneError = false;
      return true;
    },

    passwordValidate() {
      if (!this.password) {
        this.passwordError = "Необходимо заполнить пароль";
        return false;
      }

      this.passwordError = false;
      return true;
    },

    referenceValidate() {
      if (!this.reference) {
        this.referenceError = "Необходимо указать ссылку на профиль";
        return false;
      }

      if (
        !this.reference.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g
        )
      ) {
        this.referenceError = "Укажите ссылку";
        return false;
      }

      this.referenceError = false;
      return true;
    },

    imageValidate() {
      if (!this.imageFile) {
        this.imageError = "Необходимо выбрать фото";
        return false;
      }

      this.imageError = false;
      return true;
    },
  },
};
</script>

<style src="./stylesLogin.scss" lang="scss" scoped></style>
