<template>
  <div class="profile">
    <div class="Profile-container" v-if="!loggedIn">
      <LogIn v-if="logIn" @changeLogin="changeLogin" />
      <Regist v-else @changeLogin="changeLogin" />
    </div>
    <div v-else>PROFILE!!!</div>
  </div>
</template>
<script>
import LogIn from "@/components/LogIn";
import Regist from "@/components/Regist";

export default {
  name: "Profile",
  components: { LogIn, Regist },
  data: () => ({
    logIn: false,
  }),
  computed: {
    loggedIn() {
      return this.$store.state.user && this.$store.state.user.id != undefined;
    },
  },
  methods: {
    changeLogin() {
      this.logIn = !this.logIn;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/main";
@media screen and (max-width: $breakpoint-mobile) {
  .profile {
    background-image: url("../assets/bg-1.jpg");
    background-repeat: repeat y;
    padding: 5px;
    height: 100vh;
    overflow: auto;
    color: $light-green;
    display: flex;
    align-items: center;
    .Profile-container {
      background: $white;
      border-radius: 20px;
      width: 95%;
      height: auto;
      margin: 0 auto 60px;
      padding: 1.5rem 1rem;
    }
  }
}
</style>