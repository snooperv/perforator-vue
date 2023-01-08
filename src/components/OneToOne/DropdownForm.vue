<template>
  <div :id="'myDropdown-' + workerId" class="dropdown-content">
    <form :id="'one-to-one-' + workerId" @keyup="postNotes">
      <h3 class="dropdownTitle">Общие заметки</h3>

      <textarea
        name="common"
        cols="40"
        rows="5"
        maxlength="2048"
        style="margin-left: 35px"
        class="ta big"
        id="generalNotes"
        v-model="common"
      ></textarea>

      <h3 class="dropdownTitle">
        <i class="icon-lock fas fa-lock" aria-hidden="true"></i>
        Личные заметки
      </h3>

      <textarea
        name="personal"
        cols="40"
        rows="5"
        maxlength="2048"
        style="margin-left: 35px"
        class="ta big"
        id="personalNotes"
        v-model="personal"
      ></textarea>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DropdownForm",

  props: ["myId", "workerId"],

  computed: {
    ...mapState(["commonNote", "privateNote"]),
  },

  data() {
    return {
      common: "",
      personal: "",
      isManager: localStorage.getItem("isManager") === "true",
      timerId: null,
    };
  },

  mounted() {
    this.$store
      .dispatch("getOneToOne", {
        is_manager: this.isManager,
        manager_id: this.myId,
        employee_id: this.workerId,
      })
      .then((result) => {
        this.common = result.commonNote;
        this.personal = result.privateNote;
      });
  },

  methods: {
    postNotes(e) {
      clearTimeout(this.timerId);
      if (e.target.name === "common") this.common = e.target.value;
      if (e.target.name === "personal") this.personal = e.target.value;
      this.timerId = setTimeout(() => {
        this.$store.dispatch("postProcessOneToOne", {
          is_manager: this.isManager,
          manager_id: this.myId,
          employee_id: this.workerId,
          personalNote: this.personal,
          commonNote: this.common,
        });
      }, 1000);
    },
  },
};
</script>

<style scoped>
h2 {
  display: inline-block;
  color: #222;
  font-size: 32px;
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
  padding-top: 70px;
  background-color: #ececf2;
  width: 95%;
  border-radius: 15px;
  transform: translateY(-50px);
  position: relative;
  z-index: 1;
}

.dropdownTitle {
  color: #000;
  margin-left: 30px;
  margin-bottom: 10px;
  font-size: 22px;
}

.ta {
  border-radius: 15px;
  border: none;
  width: 90%;
  padding: 20px;
  font-size: 16px;
  resize: none;
  margin-bottom: 30px;
  line-height: 1.5;
}

.icon-lock {
  padding: 5px;
  border-radius: 50%;
  background-color: #331969;
  color: #fff;
  font-size: 14px;
  position: relative;
  top: -3px;
  margin-right: -2px;
}
</style>
