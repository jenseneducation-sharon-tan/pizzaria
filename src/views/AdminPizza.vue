<template>
  <div class="pizza">
	<router-link class="log-out-link" to="/admin">
		<span class="log-out">Logga ut</span>
	</router-link>
	<h1>Pizzor</h1>
	<div class="pizza-details">
		<div class="create-pizza">
			<img class="add-button" src="@/assets/add.svg" alt=""/>
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
	</div>
</template>

<script>
import AdminPizzaList from "@/components/AdminPizzaList";
export default {
	components: { AdminPizzaList },
	computed: {
    menu() {
      return this.$store.state.menu;
	},
	},
	mounted() {
		this.$store.dispatch("fetchMenu");
		},

}
</script>

<style lang="scss" scoped>
@import "@/style/main";

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