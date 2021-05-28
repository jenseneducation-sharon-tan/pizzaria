<template>
  <div class="topping-details">
    <div class="item-row">
      <div class="item-title">
        <span>{{ item.title }}</span>
      </div>
      <div class="item-price">
        <span>{{ item.price }} kr</span>
      </div>
      <div class="edit" @click="$refs.editModal.openModal()">
        <span class="edit">Redigera</span>
      </div>
      <div class="delete" @click="removeTopping()">
        <span class="delete">Ta bort</span>
      </div>
    </div>
    <!-- create-topping modal -->
    <modal class="modal create-topping-modal" ref="editModal">
      <template v-slot:header>
        <h1 class="modal-title">Redigera pålägg</h1>
      </template>
      <template v-slot:body>
        <div class="topping-detail-wrap">
          <label for="title">Namn</label>
          <input
            name="title"
            type="text"
            placeholder="Ingredients eg. Paprika"
            v-model="title"
          />
          <label for="price">Pris</label>
          <input name="price" type="number" placeholder="119" v-model="price" />
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="create-topping-button"
            @click="$refs.editModal.closeModal(), updateTopping(item.id)"
          >
            Skapa
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
  components: { Modal },
  props: {
    item: Object,
  },
  data: () => ({
    title: "",
    price: "",
  }),
  methods: {
    removeTopping() {
      this.$store.dispatch("removeTopping", { id: this.item.id });
    },
    async updateTopping() {
      await this.$store.dispatch("updateTopping", {
        title: this.title,
        price: this.price,
        id: this.item.id,
      });
    },
  },
  created() {
    this.title = this.item.title;
    this.price = this.item.price;
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.item-details {
  display: none;
}

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .topping-details {
    // display: flex;
    border-bottom: $light-green solid 1px;
    margin: 20px 0 20px 20px;
    font-size: $font-text-xs;
    //width: 100%;
    .item-row {
      display: grid;
      grid-template-columns: 1fr 1fr auto auto;
      margin-bottom: 20px;
      //justify-items: flex-start;

      .item-title {
        display: flex;
      }
      .item-price {
        display: flex;
        justify-content: flex-start;
      }

      .edit,
      .delete {
        color: $orange;
      }

      .edit {
        margin-right: 20px;
      }
    }
  }
  /*  .topping-details {
    display: flex;
    border-bottom: $light-green solid 1px;
    margin: 20px 0 20px 20px;
    font-size: $font-text-xs;
    width: 100%;

    .heading {
      display: flex;
      flex-direction: row;
      border-bottom: $light-green solid 1px;
    }

    .item-row {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      text-align: left;
      width: 100%;

      .item-title {
        width: 100px;
        margin-bottom: 5px;
        /* padding-right: 20px; */
  /*  text-align: left;
      }

      .item-description {
        text-align: left;
        margin-bottom: 20px;
        width: 400px;
        padding-right: 20px;
      }

      .item-price {
        width: 100px;
        text-align: left;
        margin-top: 3px;
      }
      .edit {
        width: 100px;
        text-align: left;
        color: $orange;
      }
      .delete {
        width: 100px;
        text-align: left;
        color: $orange;
      }
    }*/
  .create-topping-modal {
    h1 {
      font-size: $font-heading-xl;
    }
    .topping-detail-wrap {
      display: flex;
      flex-direction: column;

      label {
        margin: 3px 0px 3px 3px;
        align-self: flex-start;
        font-size: $font-footer;
      }

      input {
        background-color: $white-green;
        border: 1px solid $white-green;
        color: $dark-green;
        font-size: $font-text-xs;
        height: 44px;
        border-radius: 5px;
        margin-bottom: 5px;
        padding-left: 8px;

        &::placeholder {
          font-style: italic;
          color: $gray;
          opacity: 0.4;
        }

        /* &:last-child {
            height: 123px;
            padding-top: 0;

            &[type="text"]::placeholder {
              position: absolute;
              padding-top: 5px;
            }
          }
        }*/
      }
    }
    .create-topping-button {
      @include common-button-tablet;
      font-size: 32px;
      padding: 10px 16px 8px;
      background: $orange;
      color: $white;
      margin: 0.5rem 0 12px;
      width: 260px;
    }
  }
}
</style>
