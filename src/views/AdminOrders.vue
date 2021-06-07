<template>
  <div class="orders">
    <router-link class="log-out-link" to="/admin">
      <span class="log-out" @click="logout">Logga ut</span>
    </router-link>
    <h1>Beställningar</h1>
    <div class="order-details">
      <NewOrderCounter />
      <ul class="tabs-1">
        <li
          v-on:click="changeTab1('1')"
          :class="{ active: tab1IsActive === '1' }"
        >
          Nya beställningar
        </li>
        <li
          v-on:click="changeTab1('2')"
          :class="{ active: tab1IsActive === '2' }"
        >
          Tidigare beställningar
        </li>
      </ul>

      <main class="order-details__main-wrapper">
        <ul v-if="tab1IsActive === '1'" class="tabs-2">
          <li
            v-on:click="changeTab2('1')"
            :class="{ active: tab2IsActive === '1' }"
          >
            Inte börjat förberedning
          </li>
          <li
            v-on:click="changeTab2('2')"
            :class="{ active: tab2IsActive === '2' }"
          >
            Under förberedning
          </li>
        </ul>

        <AdminOrderList :tab1="tab1IsActive" :tab2="tab2IsActive" />
      </main>
    </div>
  </div>
</template>

<script>
import AdminOrderList from "@/components/AdminOrderList";
import NewOrderCounter from "@/components/NewOrderCounter";
export default {
  components: { AdminOrderList, NewOrderCounter },

  data: () => ({
    tab1IsActive: "1",
    tab2IsActive: "1",
  }),
  computed: {},
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch("logoutAdmin");
      this.$router.push("/admin");
    },
    changeTab1: function(num) {
      this.tab1IsActive = num;
    },
    changeTab2: function(num) {
      this.tab2IsActive = num;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .orders {
    display: block;
    background: $white-green;
    height: 100vh;
    padding: 20px 0 0;
    color: $dark-green;

    .log-out-link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      align-items: flex-end;
      padding-right: 1rem;

      span {
        font-size: $font-text-sm;
        color: $dark-green;
      }
    }

    h1 {
      font-size: $font-heading-xl;
      font-weight: normal;
      margin-bottom: 40px;
    }

    .order-details {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 30px;
      flex-direction: column;
      bottom: 0;

      .order-counter {
        position: fixed;
        left: 44%;
        top: 145px;

        @media screen and (min-width: 1023px) {
          left: 46%;
        }
      }

      .tabs-1 {
        display: flex;
        margin-left: 40px;

        li {
          padding: 30px 40px;
          background: transparent;
          color: $dark-green;
          border-radius: 20px;
          font-size: $font-text-md;
          font-weight: normal;
        }

        .active {
          background: $dark-green;
          color: $white;
        }
      }

      &__main-wrapper {
        background: $dark-green;
        width: 100%;
        height: 90%;
        margin-top: -15px;
        margin-bottom: 10px;
        bottom: 0;

        .tabs-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          margin-right: 30px;

          li {
            font-size: $font-text-sm;
            color: $white;
            padding: 20px 40px 0;
            display: block;
            opacity: 0.4;
            text-decoration: underline;
          }

          .active {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
