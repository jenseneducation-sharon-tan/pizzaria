<template>
  <div class="orders">
    <router-link class="log-out-link" to="/admin">
      <span class="log-out" @click="logout">Logga ut</span>
    </router-link>
    <h1>Beställningar</h1>
    <div class="order-details">
      <nav class="order-details__tab-wrapper">
        <div class="tab-1">
          <span>Nya beställningar</span>
        </div>
        <div class="tab-1">
          <span>Tidigare beställningar</span>
        </div>
      </nav>

      <main class="order-details__main-wrapper"></main>
    </div>
  </div>
</template>

<script>
// import AdminPizzaList from "@/components/AdminPizzaList";

export default {
  //   components: { AdminPizzaList },
  props: ["id"],

  data: () => ({
    title: "",
    price: "",
    desc: "",
  }),
  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
  mounted() {
    this.$store.dispatch("fetchMenu");
  },
  methods: {
    async createPizza() {
      await this.$store.dispatch("createPizza", {
        title: this.title,
        price: this.price,
        desc: this.desc,
      });
    },
    async logout() {
      await this.$store.dispatch("logoutAdmin");
      this.$router.push("/admin");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.overflow-hidden {
  overflow: hidden;
}
.pizza {
  display: none;
}

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .orders {
    display: block;
    background: $white-green;
    height: 100vh;
    padding: 20px 0 0;
    color: $dark-green;
    overflow: auto;

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
    }

    .order-details {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70px;
      flex-direction: column;
      height: 90%;

      &__tab-wrapper {
        display: flex;

        span {
          padding: 30px 40px;
          background: $dark-green;
          color: $white;
          border-radius: 20px;
          font-size: $font-heading-xs;
          font-weight: normal;
        }
      }

      &__main-wrapper {
        background: $dark-green;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
