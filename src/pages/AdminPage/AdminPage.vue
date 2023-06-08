<template>
  <div class="container">
    <div class="header">
      <div class="wrapper">
        <div class="logo-div">
          <img src="@/assets/img/logo.svg" alt="logo" class="logo" />
        </div>
        <div class="logo-title">
          <h3>Perforator</h3>
        </div>
        <div class="admin__menu">
          <span class="admin__menu-item admin__menu-item-active">
            <PeopleIcon /> Пользователи
          </span>
        </div>
      </div>
      <div class="rightWrapper">
        <button class="exit" @click="adminExit">
          Выйти
          <ExitIcon />
        </button>
      </div>
    </div>
    <div class="content">
      <div class="teams-bg">
        <div class="company">
          <div class="company-description">
            <img src="@/assets/img/company-logo.png" alt="Logo" class="logo" />
            <span>Тестовая компания</span>
            <img src="@/assets/img/admin-arrow.svg" alt="Logo" class="arrow" />
          </div>
          <div class="teams-add">
            <FolderIcon />
          </div>
        </div>
        <div class="company-team">
          <div class="company">
            <div class="company-description">
              <div class="team-icon">
                <TeamIcon />
              </div>
              <span>Команда 1</span>
              <img
                src="@/assets/img/admin-arrow.svg"
                alt="Logo"
                class="arrow"
              />
            </div>
            <div class="teams-add">
              <CrownIcon />
            </div>
            <div class="teams-add" @click="openModalPeers">
              <PencilIcon />
            </div>
            <div class="teams-add">
              <RemoveIcon />
            </div>
          </div>
          <div class="company-employee">
            <div class="company-description">
              <img
                src="@/assets/img/photos/Vadim.jpg"
                alt="Logo"
                class="logo"
              />
              <span>Вадим Сотрудник1</span>
              <span class="manager">Менеджер</span>
            </div>
          </div>
          <div class="company-employee">
            <div class="company">
              <div class="company-description">
                <img
                  src="@/assets/img/photos/Nikita.jpg"
                  alt="Logo"
                  class="logo"
                />
                <span>Никита Сотрудник2</span>
              </div>
              <div class="teams-add" @click="openUserInfo">
                <PencilIcon />
              </div>
              <div class="teams-add">
                <RemoveIcon />
              </div>
            </div>
          </div>
          <div class="company-employee">
            <div class="company-description">
              <img
                src="@/assets/img/photos/Kirill.jpg"
                alt="Logo"
                class="logo"
              />
              <span>Кирилл Сотрудник3</span>
            </div>
          </div>
        </div>
        <div class="company-team">
          <div class="company">
            <div class="company-description">
              <div class="team-icon">
                <TeamIcon />
              </div>
              <span>Команда 2</span>
              <img
                src="@/assets/img/admin-arrow.svg"
                alt="Logo"
                class="arrow"
              />
            </div>
            <div class="teams-add">
              <CrownIcon />
            </div>
            <div class="teams-add" @click="openModalPeers">
              <PencilIcon />
            </div>
            <div class="teams-add">
              <RemoveIcon />
            </div>
          </div>
          <div class="company-employee">
            <div class="company-description">
              <img
                src="@/assets/img/photos/Vadim.jpg"
                alt="Logo"
                class="logo"
              />
              <span>Вадим Сотрудник1</span>
              <span class="manager">Менеджер</span>
            </div>
          </div>
          <div class="company-employee">
            <div class="company-description">
              <img
                src="@/assets/img/photos/Sasha.jpg"
                alt="Logo"
                class="logo"
              />
              <span>Саша Сотрудник4</span>
              <span class="manager manager-choose">Менеджер</span>
            </div>
          </div>
          <div class="company-employee">
            <div class="company-description">
              <img src="@/assets/img/photos/Roma.jpg" alt="Logo" class="logo" />
              <span>Рома Сотрудник5</span>
              <span class="manager manager-choose">Менеджер</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PeopleIcon from "@/components/icons/PeopleIcon.vue";
import ExitIcon from "@/components/icons/ExitIcon.vue";
import FolderIcon from "@/components/icons/FolderIcon.vue";
import TeamIcon from "@/components/icons/TeamIcon.vue";
import CrownIcon from "@/components/icons/CrownIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import { openModal } from "jenesius-vue-modal";
import PeersListMobile from "@/components/modals/PeersList/peersListMobile.vue";
import PeersList from "@/components/modals/PeersList/PeersList.vue";
import UserInfo from "@/components/modals/UserInfo/UserInfo.vue";
import EditUserInfo from "@/components/modals/UserInfo/EditUserInfo.vue";

export default {
  name: "AdminPage",
  components: {
    RemoveIcon,
    PencilIcon,
    CrownIcon,
    TeamIcon,
    FolderIcon,
    ExitIcon,
    PeopleIcon,
  },

  computed: {
    ...mapState(["isMobile"]),
  },

  methods: {
    adminExit() {
      localStorage.removeItem("adminToken");
      this.$router.push("/login");
    },

    openModalPeers() {
      this.isMobile
        ? openModal(PeersListMobile, { isManager: false })
        : openModal(PeersList, { isManager: false });
    },

    openUserInfo() {
      openModal(EditUserInfo);
    },
  },
};
</script>

<style
  lang="scss"
  src="../../components/layouts/Header/header.scss"
  scoped
></style>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: 75px 1fr;
}

.wrapper {
  display: flex;

  .admin__menu {
    display: flex;
    align-items: center;
    margin-top: 26px;
    margin-left: 24px;
    font-size: 18px;
    color: #b1b1b1;

    &-item {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;

      &-active {
        color: white;
        padding-bottom: 5px;
        border-bottom: 2px solid white;
      }
    }
  }
}

.rightWrapper {
  .exit {
    display: flex;
    gap: 5px;
    align-items: center;
    margin-top: 5px;
    color: #9c9c9c;
    background: none;
    border: none;
    font-size: 18px;

    &:hover {
      cursor: pointer;
      color: #e79010;
    }
  }
}

.content {
  grid-column-start: 1;
}

.teams {
  &-bg {
    background: #fff;
    width: calc(100% - 80px);
    margin: 40px 40px 0;
    padding: 40px 70px;
    box-sizing: border-box;
    border-radius: 31px;

    .company {
      display: flex;
      gap: 10px;
      align-items: center;

      &-description {
        display: grid;
        grid-template-columns: 46px 1fr 46px;
        align-items: center;
        gap: 16px;
        background: #f4f4fa;
        border-radius: 17px;
        width: 40%;
        font-family: "Gotham Pro", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 27px;
        letter-spacing: 0.035em;
        color: #2c286d;
        cursor: pointer;

        .logo {
          width: 56px;
          height: 56px;
          margin-left: -10px;
        }

        .arrow {
          width: 26px;
          height: 26px;
          //justify-self: flex-end;
        }

        .team-icon {
          width: 50px;
          height: 50px;
          background: #a5a4f5;
          border: 3px solid #ffffff;
          border-radius: 35px;
          margin-left: -10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .manager {
          border: 1px solid #cd2525;
          border-radius: 28px;
          padding: 3px 7px;
          font-family: "Gotham Pro", sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 10px;
          letter-spacing: -0.045em;
          color: #cd2525;
          margin-right: 20px;

          &-choose {
            color: rgba(205, 37, 37, 0.45);
            border: 1px solid rgba(205, 37, 37, 0.45);
          }
        }
      }

      &-team,
      &-employee {
        margin-left: 50px;
        margin-top: 8px;
      }

      &-team {
        .company-description {
          width: 45%;
        }
      }

      &-employee {
        .company-description {
          width: 50%;
          grid-template-columns: 46px 1fr auto;

          .logo {
            border-radius: 50%;
          }
        }
      }
    }
  }

  &-add {
    background: #f4f4fa;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
