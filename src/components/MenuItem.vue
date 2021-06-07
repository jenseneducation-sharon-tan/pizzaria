<template>
  <div class="item-details">
    <img
      class="add-button"
      src="@/assets/add.svg"
      alt="Add Item"
      height="36px"
      width="36px"
      @click="addItem"
    />
    <div class="wrapper-row">
      <div class="wrapper-column">
        <div class="item-title">
          {{ item.title }}
        </div>
        <div class="item-ingredients">
          {{ item.desc }}
        </div>
      </div>
      <div class="item-price">{{ item.price }} kr</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    addItem() {
      this.$store.dispatch("addItem", this.item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.item-details {
  display: none;
}

@media screen and (max-width: $breakpoint-mobile) {
  .item-details {
    display: flex;
    border-bottom: $light-green solid 1px;
    margin: 10px 20px;
    //width: 100%;

    .add-button {
      position: relative;
      top: 10px;
    }
    .wrapper-row {
      display: flex;
      width: 100%;

      .wrapper-column {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        width: 300%;
        text-align: left;

        .item-title {
          font-size: $font-text-md;
          margin-bottom: 5px;
        }

        .item-ingredients {
          font-size: $font-base;
          margin-bottom: 20px;
        }
      }

      .item-price {
        font-size: $font-text-sm;
        width: inherit;
        margin-top: 3px;
      }
    }
  }
}
</style>
