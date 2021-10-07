<template>
  <div class="details-container">
    <div class="details-nav">
      <button class="back-button" @click="goBack">
        <svg
          width="12"
          height="19"
          viewBox="0 0 12 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2L2.76688 8.99979C2.35165 9.40163 2.36242 10.0707 2.79037 10.459L10 17"
            stroke="#D6D5DA"
            stroke-width="3"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <img class="details-logo" src="@/assets/logo.png" alt="logo" />
    </div>
    <div class="details-summary-info">
      <p class="details-para">
        {{ coinDetail.name }} <span>{{ coinDetail.symbol }}</span>
      </p>
      <div class="details-price">
        <p>${{ coinDetail.price }}</p>
        <MarketStatus
          :iconWidth="3.1"
          :iconHeight="1.8"
          :market_change_24hr="coinDetail.change_24h"
          :fontSize="2.4"
          :margin="1"
        />
      </div>
    </div>
    <button class="add-to-track-btn" v-if="coinDetail.is_tracked == 0">
      Add to tracked currencies list
    </button>
    <button class="remove-from-track-btn" v-if="coinDetail.is_tracked == 1">
      Remove from tracked currencies list
    </button>
  </div>
</template>

<script>
import MarketStatus from "@/components/MarketStatus.vue";
export default {
  name: "CurrencyDetails",
  components: { MarketStatus },
  props: ["CoinDetail"],
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  computed: {
    coinDetail() {
      return this.$attrs.coinProp;
    },
  },
};
</script>

<style lang="scss" scoped>
.details-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1d1c28;
  overflow-y: scroll;

  .details-nav {
    height: 10rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .back-button {
      background: transparent;
      border: none;
      flex: 0.48 1 auto;
      display: flex;
      align-items: flex-start;
      svg {
        flex: 0.5 1 auto;
      }
    }
    .details-logo {
      width: 14rem;
      height: 1.9rem;
    }
  }
  .details-summary-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    .details-para {
      color: #d6d5da;
      font-size: 2.8rem;
      span {
        color: #8987a0;
        font-size: 1.8rem;
        padding-left: 0.8rem;
      }
    }
    .details-price {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      height: 10rem;
      width: 35rem;
      p {
        font-size: 3.4rem;
        color: #d6d5da;
      }
    }
  }
  .add-to-track-btn,
  .remove-from-track-btn {
    height: 4.7rem;
    width: 33rem;
    border: none;
    border-radius: 5rem;
    font-size: 1.6rem;
    color: #fcfcfc;
    background-color: transparent;
  }
  .add-to-track-btn {
    background-color: #686cd6;
  }
  .remove-from-track-btn{
    border: 2px solid #686cd6;
  }
}
</style>

