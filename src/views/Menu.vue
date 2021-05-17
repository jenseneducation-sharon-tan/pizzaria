<template>
  <div class="menu">
    <img class="graphic-top" :src="require(`@/assets/graphic-top.svg`)" />

    <h1>Menu</h1>

    <MenuList />

    <img class="graphic-bottom" :src="require(`@/assets/graphic-bottom.svg`)" />
  </div>
</template>

<script>
import MenuList from "@/components/MenuList";
export default {
  name: "Menu",
  components: { MenuList },

  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
  mounted() {
    this.$store.dispatch("fetchMenu");
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.menu {
  display: none;
}

@media screen and (max-width: $breakpoint-mobile) {
  h1 {
    font-size: $font-heading-xl;
    color: $dark-green;
    padding-top: 40px;
  }

  .menu {
    display: block;

    .graphic-top {
      position: fixed;
      right: 0;
      top: 0;
      z-index: 2;
    }

    h1 {
      background-color: $white;
      position: fixed;
      top: 0;
      width: 100%;
      padding-top: 70px;
      z-index: 1;
    }

    .graphic-bottom {
      position: fixed;
      right: 0;
      bottom: 60px;
    }
  }
}
</style>
