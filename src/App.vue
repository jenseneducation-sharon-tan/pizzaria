<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view v-show="thisIsMobileAndCustomer || thisIsTabletAndAdmin" />
    </transition>

    <router-view v-show="thisIsMobile" name="nav" />
    <router-view v-show="thisIsTablet" name="navAdmin" />

    <div class="textInfo" v-show="!thisIsMobileAndCustomer && urlIsApp">
      <p class="emoji">&#x1f630;</p>
      <br />
      <p>Denna app är bara för mobil...</p>
    </div>
    <div class="textInfo" v-show="!thisIsTabletAndAdmin && urlIsAdmin">
      <p class="emoji">&#x1f630;</p>
      <br />
      <p>Admnin sidan är bara för tablett...</p>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    transitionName: "opacity",
    //indexPage: 1,

    thisIsMobile: false,
    thisIsTablet: false,
    thisIsTabletAndAdmin: false,
    thisIsMobileAndCustomer: false,
    urlIsAdmin: false,
    urlIsApp: false,
  }),
  watch: {
    $route(to, from) {
      if (from.path === "/menu" && to.path === "/cart" && this.thisIsMobile) {
        this.transitionName = "ltr";
      } else {
        this.transitionName = "opacity";
      }
      //this.indexPage++;
    },
  },
  created() {
    window.addEventListener("resize", this.isMobile);
    window.addEventListener("resize", this.isTablet);
  },
  mounted() {
    this.isMobile();
    this.isTablet();
  },
  Destroy() {
    window.removeEventListener("resize", this.isMobile);
    window.removeEventListener("resize", this.isTablet);
  },
  methods: {
    isMobile() {
      if (window.innerwidth || document.documentElement.clientWidth <= 425) {
        this.thisIsMobile = true;
      } else {
        this.thisIsMobile = false;
      }
      this.setDisplay();
    },
    isTablet() {
      if (window.innerwidth || document.documentElement.clientWidth > 425) {
        if (window.innerwidth || document.documentElement.clientWidth <= 1024) {
          this.thisIsTablet = true;
        } else {
          this.thisIsTablet = false;
        }
      } else {
        this.thisIsTablet = false;
      }
      this.setDisplay();
    },
    setDisplay() {
      if (
        this.$route.path === "/" ||
        this.$route.path === "/about" ||
        this.$route.path === "/menu" ||
        this.$route.path === "/cart" ||
        this.$route.path === "/checkout" ||
        this.$route.path === "/thankyou" ||
        this.$route.path === "/profile"
      ) {
        this.urlIsAdmin = false;
        this.urlIsApp = true;
        if (this.thisIsMobile) {
          this.thisIsMobileAndCustomer = true;
        } else {
          this.thisIsMobileAndCustomer = false;
        }
      } else {
        this.thisIsMobileAndCustomer = false;
      }

      if (
        this.$route.path === "/admin" ||
        this.$route.path === "/admin/pizza" ||
        this.$route.path === "/admin/customize" ||
        this.$route.path === "/admin/orders"
      ) {
        this.urlIsAdmin = true;
        this.urlIsApp = false;
        if (this.thisIsTablet) {
          this.thisIsTabletAndAdmin = true;
        } else {
          this.thisIsTabletAndAdmin = false;
        }
      } else {
        this.thisIsTabletAndAdmin = false;
      }
    },
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

  .textInfo {
    background-image: url("assets/bg-1.jpg");
    background-repeat: repeat;
    height: 100vh;
    overflow: auto;
    color: $white;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    font-size: $font-text-sm;

    .emoji {
      font-size: 80px;
    }
  }
}

/* LTR */
.ltr-enter-active {
  animation: entering-ltr 500ms;
  //transform: translateX(-50%);
}
.ltr-leave-active {
  animation: leaving-ltr 500ms;
}

@keyframes entering-ltr {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes leaving-ltr {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* OPACITY */
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-enter-active {
  animation: entering-opacity 250ms;
}
.opacity-leave-active {
  animation: leaving-opacity 250ms;
}

@keyframes entering-opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes leaving-opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
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
