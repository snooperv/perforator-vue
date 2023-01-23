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
        :disabled="period === 'previous'"
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
        :disabled="period === 'previous'"
      ></textarea>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DropdownForm",

  props: ["myId", "workerId", "period", "pr_id"],

  computed: {
    ...mapState(["commonNote", "privateNote", "user"]),
  },

  data() {
    return {
      common: "",
      personal: "",
      timerId: null,
    };
  },

  mounted() {
    if (this.period === "current")
      this.$store
        .dispatch("getOneToOne", {
          is_manager: this.user.statusManager,
          manager_id: this.user.statusManager ? this.myId : this.workerId,
          employee_id: this.user.statusManager ? this.workerId : this.myId,
        })
        .then((result) => {
          this.common = result.commonNote;
          this.personal = result.privateNote;
        });
    else if (this.period === "previous")
      this.$store
        .dispatch("getOneToOnePrevious", {
          pr_id: this.pr_id,
          is_manager: this.user.statusManager,
          manager_id: this.user.statusManager ? this.myId : this.workerId,
          employee_id: this.user.statusManager ? this.workerId : this.myId,
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
          is_manager: this.user.statusManager,
          manager_id: this.user.statusManager ? this.myId : this.workerId,
          employee_id: this.user.statusManager ? this.workerId : this.myId,
          personalNote: this.personal,
          commonNote: this.common,
        });
      }, 1000);
    },
  },
};
</script>

<style lang="scss" src="./dropDownForm.scss" scoped></style>
