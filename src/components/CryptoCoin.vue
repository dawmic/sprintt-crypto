<template>
  <router-link
    tag="div"
    class="coin-container"
    :to="{
      name: 'CurrencyDetails',
      params: { name: coinProp.name, coinProp },
    }"
  >
    <div class="coin-container">
      <div class="logo">
        <img
        width="50"
        height="50"
          class="logo-image"
          :src="coinProp.iconUrl"
          :alt="coinProp.name"
        />
        <div>
          <p class="coin-name">{{ coinProp.name }}</p>
          <p class="coin-symbol">{{ coinProp.symbol }}</p>
        </div>
      </div>
      <div class="coin-data">
        <p class="coin-price">${{ roundedPrice }}</p>
        <MarketStatus
          :iconWidth="1.2"
          :iconHeight="0.7"
          :market_change_24hr="coinProp.change"
          :fontSize="1.0"
          :margin="0.2"
        />
      </div>
    </div>
  </router-link>
</template>
<script>
import MarketStatus from "@/components/MarketStatus.vue";
export default {
  name: "CryptoCoin",
  components: { MarketStatus },
  props: ["coinProp"],
  computed: {
    roundedPrice(){
      return parseFloat(this.coinProp.price).toFixed(2);
    }
  }
};
</script>
<style lang="scss" scoped>
.coin-container {

  width: clamp(20rem, 90vw, 40rem);
  background-color: #2b2f39;
  border-radius: 2rem;
  margin: 1.5rem 1rem 0 1rem;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .logo,
  .coin-data {
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    color: #d6d5da;
    .coin-price {
      font-size: 1.6rem;
    }
  }
  .logo {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .logo-image {
      margin: 0rem 1rem 1.5rem 1.5rem;
    }
    .coin-name {
      font-size: 1.6rem;
    }
    .coin-symbol {
      font-size: 1rem;
    }
  }
  .coin-data {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-right: 1.5rem;
  }
}
</style>