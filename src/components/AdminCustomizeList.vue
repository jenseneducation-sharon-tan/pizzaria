<template>
  <div class="toppings-list">
    <ul class="topping-item">
      <div class="heading">
        <h1>Namn</h1>
        <h1>Pris</h1>
        <h1 class="invisible">empty</h1>
        <h1 class="invisible">empty</h1>
      </div>
      <li v-for="item in toppings" :key="item.id" class="topping-item">
        <AdminCustomizeItem :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import AdminCustomizeItem from "@/components/AdminCustomizeItem.vue";

export default {
  components: { AdminCustomizeItem },
  props: ["toppings"],
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .topping-item {
    color: $dark-green;

    .heading {
      display: grid;
      grid-template-columns: 1fr 1fr auto auto;
      margin: 40px 0 20px 20px;
      border-bottom: solid 1px $light-green;

      h1 {
        font-size: $font-text-sm;
        font-weight: 100;
        color: $light-green;
      }

      h1:nth-child(1) {
        display: flex;
        margin-bottom: 20px;
      }

      h1:nth-child(2) {
        display: flex;
      }
      h1:nth-child(3) {
        margin-right: 50px;
      }
      .invisible {
        color: white;
      }
    }

    hr {
      margin-left: 20px;
      background-color: #8eb94b;
    }
  }
}
</style>
