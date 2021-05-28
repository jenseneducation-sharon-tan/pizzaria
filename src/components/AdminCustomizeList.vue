<template>
  <div class="toppings-list">
    <ul class="topping-item">
      <div class="heading">
        <p>Namn</p>
        <p class="price">Pris</p>
      </div>
      <li v-for="item in toppings" :key="item.id" class="topping-item">
        <!--   <AdminCustomizeItem :item="item" v-on:sendID="sendID" /> -->
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
  /* methods: {
    sendID(id) {
      this.$emit("sendItemID", id);
    },
  }, */
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  /* .toppings-list {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  ul {
    margin-top: 30px;
    color: $dark-green;
    list-style-type: none;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    hr {
      border: 1px solid $light-green;
      margin: 15px;
    }
    .heading {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 100%;

      .name .price .description {
        width: 100 px;
        text-align: left;
      }
    }

    li:last-child {
      .item-details {
        border: none;
      }
    }
  } */
}
</style>
