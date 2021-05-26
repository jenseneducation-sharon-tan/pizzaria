<template>
  <div class="item-details">
   
    <div class="item-row">
        <div class="item-title">
          <span>{{ item.title }}</span>
        </div>
		<div class="item-price">
			<span>{{ item.price }} kr</span></div>
        <div class="item-description">
			<span>{{ item.desc }}</span>
		</div>
		<div class="edit">
          <span class="edit">Redigera</span>
        </div>
		<div class="delete">
        <span class="delete">Ta bort</span>
        </div>
	</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
	/* removeQuantity(index) {
      this.$store.commit("removeQuantity", index);
    }, */
    
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
        width:100px; 
        margin-bottom: 5px;
		/* padding-right: 20px; */
		text-align: left;
        }

        .item-description {
        text-align: left;
        margin-bottom: 20px;
		width:400px;
		padding-right: 20px;
        }

      .item-price {
		width:100px;
        text-align: left;
        margin-top: 3px;
		}
	.edit {
		width:100px; 
		text-align: left;
		color: $orange;
		}
	.delete {
		width:100px; 
		text-align: left;
		color: $orange;
		}
    }
  }
}
</style>