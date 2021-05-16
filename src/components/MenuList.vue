<template>
  <div class="menu-list">
    <div v-for="item in menu" :key="item.id" class="menu-items">
      <MenuItem :item="item" />
    </div>
  </div>
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

<style lang="scss" scoped>
.menu-list {
  margin-top: 140px;
}
</style>
