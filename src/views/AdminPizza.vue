<template>
  <div class="pizza">
	<router-link class="log-out-link" to="/admin">
		<span class="log-out">Logga ut</span>
	</router-link>
	<h1>Pizzor</h1>
	<div class="pizza-details">
		<div class="create-pizza">
			<img class="add-button" src="@/assets/add-orange.svg" alt="" @click="$refs.createModal.openModal()"/>
				<span>Skapa ny pizza</span>
		</div>
	<!-- <div class="heading">
		<div class="name">
			<p>Namn</p>
		</div>
		<div class="price">
			<p>Pris</p>
		</div>
		<div class="description">
			<p>Ingrediendser</p>
		</div>
		<hr>
		</div> -->
		<AdminPizzaList :menu="menu" />
	</div>
	<!-- create-pizza modal -->
	<modal class="modal create-pizza-modal" ref="createModal">
      <template v-slot:header>
        <h1 class="modal-title">Skapa ny pizza</h1>
      </template>
	
      <template v-slot:body>
        <div class="pizza-detail-wrap">
          <label for="title">Namn</label>
          <input name="title" type="text" placeholder="Margherita" v-model="title" />
		<label for="price">Pris</label>
          <input name="price" type="text" placeholder="119kr" v-model="price" />
		<label for="desc">Ingredienser</label>
          <input name="desc" type="text" placeholder="Tomatsås, Ost, Mozzarellaost, Basilika" height="200" v-model="desc" />
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <button class="create-pizza-button" @click="
              $refs.createModal.closeModal(),
              createPizza()">
            Skapa
          </button>
        </div>
      </template>
    </modal>
	<!-- edit-pizza modal -->
</div>
</template>

<script>
import AdminPizzaList from "@/components/AdminPizzaList";
import Modal from "@/components/Modal";
export default {
	components: { AdminPizzaList, Modal, },
	props: ["id"],
	
  data: () => ({
	title: "",
    price: "",
	desc: "",
    
  }),
	computed: {
    menu() {
      return this.$store.state.menu;
	},
	},
	mounted() {
		this.$store.dispatch("fetchMenu");
		},
	methods: {
	
	async createPizza() {
        await this.$store.dispatch("createPizza", {
          title: this.title,
          price: this.price,
          desc: this.desc,
        });

	}

}
}
</script>

<style lang="scss" scoped>
@import "@/style/main";

.overflow-hidden {
  overflow: hidden;
}
.pizza {
  display: none;
}

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
	.pizza {
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
		.pizza-details {
			background: $white;
			border-radius: 20px;
			width: 100%;
			height: auto;
			padding: 1.5rem 1rem;
			margin-top: 30px;

			.create-pizza{
				display:flex;
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
		}
		.create-pizza-modal {
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
					color: $dark-green;font-size: $font-text-xs;
					height: 44px;border-radius: 5px;margin-bottom: 5px;padding-left: 8px;

					&:last-child {
						height: 123px;
						padding-top: 0;

						&[type="text"]::placeholder {
							position:absolute;
							padding-top: 5px;
							

							
}
					}
				}

			}
			.create-pizza-button {
			@include common-button-tablet;
			font-size: 32px;
			padding: 10px 16px 8px;background: $orange;
			color: $white;
			margin: 0.5rem 0 12px;
			width: 260px;
			}

			/* .heading {
				display: flex;
				flex-direction: row;
				width: 100%;
				justify-content: space-between;

			} */
		}
	}
}
    


</style>