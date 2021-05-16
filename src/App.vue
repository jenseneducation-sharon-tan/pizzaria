<template>
  <div id="app">
    <router-view />
    <router-view name="nav" />
    <router-view name="navAdmin" />
    <!-- <router-view v-show="thisIsMobile" />
    <router-view v-show="thisIsMobile" name="nav" />
    <router-view v-show="thisIsTablet" name="navAdmin" /> -->
    <!-- <div class="is-not-mobile" v-show="!thisIsMobile">
      <p class="emoji">&#x1f630;</p>
      <br />
      <p>Denna app är bara för mobil ...</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    // thisIsMobile: false,
    // thisIsTablet: false,
  }),
  // created() {
  //   window.addEventListener("resize", this.isMobile);
  //   window.addEventListener("resize", this.isTablet);
  // },
  // destroyed() {
  //   window.removeEventListener("resize", this.isMobile);
  //   window.removeEventListener("resize", this.isTablet);
  // },
  methods: {
    // isMobile() {
    //   if (window.innerwidth || document.documentElement.clientWidth <= 425) {
    //     this.thisIsMobile = true;
    //   } else {
    //     this.thisIsMobile = false;
    //   }
    // },
    // isTablet() {
    //   if (window.innerwidth || document.documentElement.clientWidth > 425) {
    //     if (window.innerwidth || document.documentElement.clientWidth <= 1024) {
    //       this.thisIsTablet = true;
    //     } else {
    //       this.thisIsTablet = false;
    //     }
    //   } else {
    //     this.thisIsTablet = false;
    //   }
    // },
  },
};
</script>

<style lang="scss">
@import "@/style/main";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;

  .is-not-mobile {
    background-image: url("/assets/bg-1.jpg");
    background-repeat: repeat;
    height: 100vh;
    overflow: auto;
    color: $white;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    font-size: $font-heading-lg;

    .emoji {
      font-size: 80px;
    }
  }
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
