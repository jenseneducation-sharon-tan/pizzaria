<template>
  <ul class="menu-list">
    <li v-for="item in menu" :key="item.id" class="menu-item">
      <MenuItem :item="item" />
    </li>
  </ul>
</template>

<script>
import MenuItem from "@/components/MenuItem.vue";

export default {
  components: { MenuItem },
  props: ["menu"],
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-mobile) {
  .menu-list {
    margin-top: 30px;
    li:last-child {
      .menu-item {
        border: none;
      }
    }
  }
}
</style>
