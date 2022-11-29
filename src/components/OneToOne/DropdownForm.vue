<template>
  <div id="myDropdown-1" class="dropdown-content">
    <form
      action="/perforator/process_one_to_one/"
      id="one-to-one-1"
      method="post"
    >
      <h3 class="dropdownTitle">Общие заметки</h3>

      <textarea
        name="common"
        cols="40"
        rows="5"
        maxlength="2048"
        style="margin-left: 35px"
        class="ta big"
        id="generalNotes"
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
      ></textarea>
    </form>
  </div>
</template>

<script>
export default {
  name: "DropdownForm",
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
