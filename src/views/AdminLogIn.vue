<template>
  <div class="Admin-Login">
    <div class="home-container">
      <img src="../assets/pizza.svg" alt="" />
      <h1>EKO PIZZA</h1>
    </div>
    <div class="LogIn">
      <h1>Logga in</h1>
      <div class="users">
        <label for="name">Användarnamn</label>
        <input name="name" type="text" v-model="name" />
        <label for="password">Lösenord</label>
        <input name="password" type="password" v-model="password" />
        <span v-if="error" id="password-worng">{{ error }} </span>
        <button class="saveUser" @click="loginUser()">Logga in</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    password: "",
  }),
  computed: {
    error: function () {
      return this.$store.state.loginError;
    },
  },
  created() {
    if (Object.keys(this.$store.state.adminUser).length !== 0) {
      this.$router.push("/admin/pizza");
    }
  },
  methods: {
    async loginUser() {
      await this.$store.dispatch("loginAdmin", {
        username: this.name,
        password: this.password,
      });
      if (!this.error) {
        this.$router.push("/admin/pizza");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .Admin-Login {
    background-image: url("../assets/bg-1.jpg");
    background-repeat: repeat y;
    height: 100vh;
    padding: 38px 1rem;
    overflow: auto;
    color: $white;
    display: flex;
    flex-direction: column;
    width: 100%;
    .LogIn {
      background: $white;
      border-radius: 20px;
      width: 70%;
      height: 500px;
      margin: 0 auto 60px;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        font-size: $font-heading-xl;
        color: $dark-green;
      }
      .users {
        display: flex;
        flex-direction: column;

        label {
          color: $dark-green;
          margin: 5% 10% 2%;
          align-self: flex-start;
          font-size: $font-footer;
        }
        input {
          background-color: $white-green;
          border: 1px solid $white-green;
          color: $orange;
          font-size: $font-text-md;
          height: 44px;
          border-radius: 5px;
          margin: 0 auto 5px;
          width: 80%;
        }
        #password-worng {
          color: $red;
          margin-top: 10px;
          font-size: $font-text-md;
        }
        .saveUser {
          @include common-button-mobile;
          font-size: 28px;
          padding: 10px 16px 8px;
          background: $orange;
          color: $white;
          margin: 32px auto 12px;
          width: 70%;
        }
      }
    }
    .home-container {
      img {
        width: 148px;
        height: 148px;
      }

      h1 {
        font-size: $font-landing;
        font-weight: 400;
      }
      margin: 100px auto;
    }
  }
}
</style>
