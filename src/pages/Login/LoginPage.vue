<template>
  <div class="background">
    <div class="login">
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first"></div>
          <div class="logo-title">
            <img src="@/assets/img/logo.svg" alt="Picture" class="logo" />
            <h1>Perforator</h1>
            <p v-if="isAdmin">
              Авторизация в панель <br />
              администрирования
            </p>
          </div>
          <form class="log">
            <input
              class="fadeIn second"
              :class="{ hasError: this.loginError }"
              :value="login"
              @input="updateLogin"
              type="text"
              name="username"
              placeholder="Номер телефона"
              v-mask="'+7 (###) ###-##-##'"
              @keydown.enter.prevent="loginMethod"
              autofocus
              required
            />
            <div v-if="this.loginError">
              <p class="input-error" v-html="loginError"></p>
            </div>
            <input
              class="fadeIn third"
              :class="{ hasError: this.passwordError }"
              :value="password"
              @input="updatePassword"
              type="password"
              name="password"
              placeholder="Пароль"
              @keydown.enter.prevent="loginMethod"
              required
            />
            <div v-if="this.passwordError">
              <p class="input-error" v-html="passwordError"></p>
            </div>
            <input
              type="button"
              class="fadeIn fourth"
              value="Войти"
              @click="loginMethod"
            />
            <div v-if="user.authError">
              <p class="input-error" v-html="user.authError"></p>
            </div>
          </form>
          <div class="admin fourth" v-if="isAdmin">
            <button class="adminLogin" @click="changeAuthType">
              Сотрудник / менеджер
            </button>
          </div>
          <div class="admin fourth" :class="isFirstLoad && 'fadeIn'" v-else>
            <button class="adminLogin" @click="changeAuthType">
              Администратор
            </button>
          </div>
        </div>
      </div>
      <div class="enter fadeInDown">
        <div id="formEnter">
          <p>
            У вас еще нет аккаунта?
            <router-link to="/registration" style="color: #2c286d"
              >Зарегистрироваться
            </router-link>
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

    if (this.$route.query.username && this.$route.query.password) {
      this.login = this.$route.query.username.slice(2);
      this.password = this.$route.query.password;
    }
  },

  computed: { ...mapState(["user"]) },

  data() {
    return {
      login: "",
      loginError: false,
      password: "",
      passwordError: false,
      isAdmin: false,
      isFirstLoad: true,
    };
  },

  methods: {
    loginMethod() {
      this.loginValidate();
      this.passwordValidate();
      if (!this.loginError && !this.passwordError) {
        const username = "+" + this.login.replace(/[^0-9]/g, "");
        if (this.isAdmin) {
          if (
            username === "+79876543210" &&
            this.password === "passAdmin456789"
          ) {
            localStorage.adminToken = "tokenForAdmin";
            this.$router.push("/admin");
          } else this.user.authError = "Неверный логин или пароль";
        } else {
          this.$store.dispatch("getToken", {
            username,
            password: this.password,
          });
        }
      }
    },

    updateLogin(e) {
      this.login = e.target.value;
      this.loginValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    updatePassword(e) {
      this.password = e.target.value;
      this.passwordValidate();
      if (this.user.authError) this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },

    loginValidate() {
      if (!this.login) {
        this.loginError = "Необходимо заполнить телефон";
        return false;
      }

      this.loginError = false;
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

    changeAuthType() {
      this.isAdmin = !this.isAdmin;
      this.isFirstLoad = false;
      this.loginError = false;
      this.passwordError = false;
      this.$store.commit(types.CLEAR_AUTH_ERRORS);
    },
  },
};
</script>

<style src="./stylesLogin.scss" lang="scss" scoped></style>
