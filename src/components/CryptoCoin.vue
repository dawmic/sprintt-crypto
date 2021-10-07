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
          class="logo-image"
          :src="coinProp.image_url"
          :alt="coinProp.name"
        />
        <div>
          <p class="coin-name">{{ coinProp.name }}</p>
          <p class="coin-symbol">{{ coinProp.symbol }}</p>
        </div>
      </div>
      <div class="coin-data">
        <p class="coin-price">${{ coinProp.price }}</p>
        <MarketStatus
          :iconWidth="1.2"
          :iconHeight="0.7"
          :market_change_24hr="coinProp.change_24h"
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
};
</script>
<style lang="scss" scoped>
.coin-container {
  height: 8.5rem;
  width: clamp(20rem, 90vw, 40rem);
  background-color: #2b2f39;
  border-radius: 2rem;
  margin: 1rem;
  display: flex;
  flex-direction: row;
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
      margin: 1.5rem;
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