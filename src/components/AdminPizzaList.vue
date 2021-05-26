<template>
<div class="pizza-list">
  
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
		</div> -->
		<hr>
		<ul class="menu-list">
    <li v-for="item in menu" :key="item.id" class="menu-item">
      <AdminPizzaItem :item="item" />
    </li>
  </ul>
</div>

</template>

<script>
import AdminPizzaItem from "@/components/AdminPizzaItem.vue";

export default {
  components: { AdminPizzaItem },
  props: ["menu"],
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
.pizza-list{
	display: flex;
	justify-content: center;align-items: center;
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
		margin:15px;
	}
	.heading {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
				
		.name .price .description{
			width: 100 px;
			text-align: left;
			}
	}

    li:last-child {
      .item-details {
        border: none;
      }
    }
  }
}
</style>
