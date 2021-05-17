<template>
  <ul class="menu-list">
    <li v-for="item in menu" :key="item.id" class="menu-items">
      <MenuItem :item="item" />
    </li>
  </ul>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";

export default {
  components: { MenuItem },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
};
</script>

<style lang="scss" scoped></style>
