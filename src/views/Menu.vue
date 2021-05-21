<template>
  <div class="menu">
    <img class="graphic-top" src="@/assets/graphic-top.svg" />
    <h1>Meny</h1>
    <MenuList :menu="menu" />
    <img class="graphic-bottom" src="@/assets/graphic-bottom.svg" />
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
  .menu {
    display: block;
    h1 {
      font-size: $font-heading-xl;
      color: $dark-green;
      padding-top: 40px;
    }
    .graphic-bottom {
      margin-bottom: 60px;
    }
  }
}
</style>
