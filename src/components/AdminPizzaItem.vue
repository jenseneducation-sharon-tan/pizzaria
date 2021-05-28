<template>
  <div class="item-details">
    <div class="item-row">
      <div class="item-title">
        <span>{{ item.title }}</span>
      </div>
      <div class="item-price">
        <span>{{ item.price }} kr</span>
      </div>
      <div class="item-description">
        <span>{{ item.desc }}</span>
      </div>
      <div class="edit"  @click="$refs.editModal.openModal()">
        <span class="edit">Redigera</span>
      </div>
      <div class="delete" v-on:click="removePizza()">
        <span class="delete">Ta bort</span>
      </div>
    </div>
	<!-- editPizza model -->
	<modal class="modal edit-pizza-modal" ref="editModal">
      <template v-slot:header>
        <h1 class="modal-title">Redigera ny pizza</h1>
      </template>

      <template v-slot:body>
        <div class="pizza-detail-wrap">
          <label for="title">Namn</label>
          <input
            name="title"
            type="text"
            placeholder="Margherita"
            v-model="item.title"
          />
          <label for="price">Pris</label>
          <input name="price" type="text" placeholder="119kr" v-model="item.price" />
          <label for="desc">Ingredienser</label>
          <input
            name="desc"
            type="text"
            placeholder="Tomatsås, Ost, Mozzarellaost, Basilika"
            height="200"
            v-model="item.desc"
          />
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="edit-pizza-button"
            @click="$refs.editModal.closeModal(), updatePizza(item.id)"
          >
            Spara
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: {  Modal },
  props: {
    item: Object,
  },
  data: () => ({
	title: "",
    price: "",
    desc: "",
  }),

  methods: {
    removePizza() {
      this.$store.dispatch("removePizza", { id: this.item.id });
    },
	async updatePizza() {
      await this.$store.dispatch("updatePizza", {
        title: this.title,
        price: this.price,
        desc: this.desc,
		id: this.pizza.id
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.item-details {
  display: none;
}

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .item-details {
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
        margin-right: 0.5rem;
        text-align: left;
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
    }
	.edit-pizza-modal {
      h1 {
        font-size: $font-heading-xl;
      }
      .pizza-detail-wrap {
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

          &:last-child {
            height: 123px;
            padding-top: 0;

            &[type="text"]::placeholder {
              position: absolute;
              padding-top: 5px;
            }
          }
        }
      }
      .edit-pizza-button {
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
}
</style>