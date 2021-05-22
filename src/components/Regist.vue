<template>
  <div class="Regist">
    <h1>Registrera</h1>
    <p class="small">Registrera dig för att kunna se din orderhistork!</p>
    <div class="users">
      <label for="userName">Användarnamn</label>
      <input name="name" type="text" v-model="userName" />
      <label for="email">Epost</label>
      <input name="name" type="text" v-model="email" />
      <label for="password">Lösenord</label>
      <input name="password" type="text" v-model="password" />
      <button class="saveUser" @click="createUser()">Registrera</button>
    </div>
    <div class="user-text">
      <p>Är du redan registrerad?</p>
      <span @click="$emit('changeLogin')">Logga in</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Regist",
  data: () => ({
    userName: "",
    email: "",
    password: "",
  }),
  methods: {
    async createUser() {
      await this.$store.dispatch("createUser", {
        userName: this.userName,
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
  margin-bottom: 15px;
}
.small {
  font-size: $font-base * 0.9;
}
.users {
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  label {
    margin: 3px 0px 3px 3px;
    align-self: flex-start;
    font-size: $font-footer;
  }
  input {
    background-color: $white-green;
    border: 1px solid $white-green;
    height: 44px;
    border-radius: 5px;
    margin-bottom: 5px;
    color: $orange;
    font-size: $font-text-xs;
  }
  .saveUser {
    @include common-button-mobile;
    font-size: 24px;
    padding: 14px 16px 10px;
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