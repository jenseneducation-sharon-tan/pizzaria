<template>
  <div class="toppings">
    <router-link class="log-out-link" to="/admin">
      <span class="log-out" @click="logout">Logga ut</span>
    </router-link>
    <h1>Extra pålägg</h1>
    <div class="topping-details">
      <div class="add-topping">
        <img
          class="add-button"
          src="@/assets/add-orange.svg"
          alt=""
          @click="$refs.createModal.openModal()"
        />
        <span>Skapa ny pålägg</span>
      </div>

      <!--  <hr /> -->
      <!--  <AdminCustomizeList
        :toppings="toppings"
        v-on:sendItemID="pickThisTopping"
      /> -->
      <AdminCustomizeList :toppings="toppings" />
    </div>
    <!-- create-pizza modal -->
    <modal class="modal create-topping-modal" ref="createModal">
      <template v-slot:header>
        <h1 class="modal-title">Skapa ny pålägg</h1>
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
            @click="$refs.createModal.closeModal(), createTopping()"
          >
            Skapa
          </button>
        </div>
      </template>
    </modal>
    <!-- edit-pizza modal -->
  </div>
</template>

<script>
import AdminCustomizeList from "@/components/AdminCustomizeList";
import Modal from "@/components/Modal";
export default {
  components: { AdminCustomizeList, Modal },
  /*  props: ["id"], */
  data: () => ({
    title: "",
    price: "",
    selectedID: 0,
  }),
  computed: {
    toppings() {
      return this.$store.state.toppings;
    },
  },
  mounted() {
    this.$store.dispatch("fetchToppings");
  },
  methods: {
    async createTopping() {
      await this.$store.dispatch("createTopping", {
        title: this.title,
        price: this.price,
      });
    },
    /*  pickThisTopping(id) {
      console.log(id);
      this.$refs.createModal.openModal(id);
    }, */
    async logout() {
      await this.$store.dispatch("logoutAdmin");
      this.$router.push("/admin");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.overflow-hidden {
  overflow: hidden;
}
.toppings {
  display: none;
}

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .toppings {
    display: block;
    background: $white-green;
    height: 100vh;
    padding: 20px 1rem;
    color: $dark-green;
    overflow: auto;

    .log-out-link {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      align-items: flex-end;

      span {
        font-size: $font-text-sm;
        color: $dark-green;
      }
    }

    h1 {
      font-size: $font-heading-xl;
      font-weight: normal;
    }
    .topping-details {
      background: $white;
      border-radius: 20px;
      width: 100%;
      height: auto;
      padding: 1.5rem 1rem;
      margin-top: 30px;

      .add-topping {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 36px;
          width: 36px;
          margin-right: 8px;
        }

        span {
          color: $orange;
          font-size: $font-text-md;
        }
      }
      hr {
        border: $light-green solid 1px;
      }
    }
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
          } */
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

    .heading {
      /* display: flex;
      flex-direction: row; */
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      justify-items: flex-start;
      // width: 100%;
      font-size: $font-text-sm;
      color: $light-green;
      //justify-content: space-between;
    }
  }
}
</style>
