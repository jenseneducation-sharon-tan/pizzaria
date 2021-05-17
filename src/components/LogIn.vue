<template>
  <div class="LogIn">
    <h1>Logga in</h1>
    <div class="users">
      <label for="email">Epost</label>
      <input name="name" type="text" v-model="email" />
      <label for="password">Lösendord</label>
      <input name="password" type="text" v-model="password" />
      <span v-if="error" id="password-worng">Ojojoj! fel lösendord </span>
      <button class="saveUser" @click="loginUser()">Logga in</button>
    </div>
    <div class="user-text">
      <p>Är du inte registrerad?</p>
      <span @click="$emit('changeLogin')">Registrera</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data: () => ({
    email: "",
    password: "",
  }),
  computed: {
    error: function () {
      return this.$store.state.loginError;
    },
  },
  methods: {
    async loginUser() {
      await this.$store.dispatch("loginUser", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/main";
h1 {
  font-size: $font-heading-xl;
}
.users {
  display: flex;
  flex-direction: column;

  label {
    margin: 3px 0px 3px 3px;
    align-self: flex-start;
    font-size: $font-footer;
  }
  input {
    background-color: $white-green;
    border: 1px solid $white-green;
    color: $orange;
    font-size: $font-text-xs;
    height: 44px;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  #password-worng {
    color: $red;
  }
  .saveUser {
    @include common-button-mobile;
    font-size: 28px;
    padding: 10px 16px 8px;
    background: $orange;
    color: $white;
    margin: 32px 0 12px;
  }
}
.user-text {
  display: flex;
  flex-direction: row;
  font-size: $font-text-xs * 0.9;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  p {
    $color: $dark-green;
  }
  span {
    margin-left: 10px;
    color: $orange;
    text-decoration: underline;
  }
}
</style>