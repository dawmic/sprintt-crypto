<template>
  <div class="coin-container">
    <div class="logo">
      <img class="logo-image" :src="coinProp.image_url" :alt="coinProp.name" />
      <div>
      <!-- <p class="coin-name">{{ coinProp.name }}</p> -->
      <router-link
      tag="p" class="coin-name"
      :to="{ name: 'CurrencyDetails', params: { name: coinProp.name, coinProp } }"
    > {{coinProp.name}} </router-link>
        <p class="coin-symbol">{{ coinProp.symbol }}</p>
      </div>
    </div>
    <div class="coin-data">
      <p class="coin-price">${{ coinProp.price }}</p>
      <p v-if="coinProp.change_24h.includes('+')" class="coin-change courseUp">
        <img
          class="arrow-image"
          src="@/assets/green_arrow.png"
          alt="green arrow"
        /><span>{{ coinProp.change_24h }}</span>
      </p>
      <p
        v-if="coinProp.change_24h.includes('-')"
        class="coin-change courseDown"
      >
        <img
          class="arrow-image"
          src="@/assets/red_arrow.png"
          alt="green arrow"
        />
        <span>{{ coinProp.change_24h }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CryptoCoin",
  props: ["coinProp"],
  data() {
    return {};
  },
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
    font-size: 1.6rem;
  }
  .logo {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .logo-image {
      margin: 1.5rem;
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

    .arrow-image {
      height: 0.7rem;
      width: 1.2rem;
      margin-right: 0.2rem;
    }
    .coin-change {
      font-size: 1rem;
    }
  }
  .courseUp {
    color: #59bb6e;
  }
  .courseDown {
    color: #db4848;
  }
}
</style>