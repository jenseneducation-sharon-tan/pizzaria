<template>
  <div class="item-details">
   
    <div class="item-row">
        <div class="item-title">
          {{ item.title }}
        </div>
		<div class="item-price">{{ item.price }} kr</div>
        <div class="item-description">
          {{ item.desc }}
        </div>
		<div class="edit">
          <p class="edit">Redigera</p>
        </div>
		<div class="delete">
        <p class="edit">Ta bort</p>
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
    margin: 20px 20px;
	font-size: $font-text-xs;
   
	.heading {
			display: flex;
			flex-direction: row;
			border-bottom: $light-green solid 1px;
			}
   
    .item-row {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: space-around;
		text-align: left; 
		
		

        .item-title {
        width:100px; 
        margin-bottom: 5px;
		padding-right: 20px;
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
    }
  }
}
</style>