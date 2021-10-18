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
    <div class="history-button-container" v-if="day">
      <label
        class="history-button"
        for="1day"
        :class="{ 'active-button': chart_data == day }"
        >1 Day<input
          @click="updateChartDay"
          type="radio"
          id="1day"
          name="history"
          :value="day"
          v-model="chart_data"
      /></label>
      <label
        class="history-button"
        for="1month"
        :class="{ 'active-button': chart_data == month }"
        >1 Month<input
          @click="updateChartMonth"
          type="radio"
          id="1month"
          name="history"
          :value="month"
          v-model="chart_data"
      /></label>
      <label
        class="history-button"
        for="1year"
        :class="{ 'active-button': chart_data == year }"
        >1 Year<input
          @click="updateChartYear"
          type="radio"
          id="1year"
          name="history"
          :value="year"
          v-model="chart_data"
      /></label>
    </div>
    <p v-if="error" class="error-msg">We have some problem to get data.</p>

    <div class="chart">
      <apexchart
        ref="cryptoChart"
        width="100%"
        type="line"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <button
      class="add-to-track-btn"
      v-if="currenciesUnit[0].is_tracked == 0"
      @click="addToTrack(coinDetail.currency_id)"
    >
      Add to tracked currencies list
    </button>
    <button
      class="remove-from-track-btn"
      v-if="currenciesUnit[0].is_tracked == 1"
      @click="removeFromTrack(coinDetail.currency_id)"
    >
      Remove from tracked currencies list
    </button>
  </div>
</template>

<script>
const options = {
  headers: {
    "user-access-token": "90275ed9-b7f3-4061-a8b7-6d602bfef99c",
  },
};
import MarketStatus from "@/components/MarketStatus.vue";
import axios from "axios";
import VueApexCharts from "vue-apexcharts";
export default {
  name: "CurrencyDetails",
  components: { MarketStatus, apexchart: VueApexCharts },
  props: ["CoinDetail", "currencies"],
  data() {
    return {
      tablica: "",
      day: "",
      month: "",
      year: "",
      chart_data: "",
      error: false,
      chartOptions: {
       
        chart: {
          id: "vue",
        },
        xaxis: {
          categories: [],
        },
        colors: ["#686cd6"],
      },
      series: [
        {
          name: "vue",
          data: [],
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    addToTrack(currencyId) {
      this.$emit("addToTrack", currencyId);
      console.log(this.coinDetail.currency_id);
    },
    removeFromTrack(currencyId) {
      this.$emit("removeFromTrack", currencyId);
    },
    getDayHistory() {
      axios
        .get(
          `https://api.sprintt.co/crypto/currencies/history/${this.coinDetail.currency_id}?time_scope=1D`,
          options
        )
        .then((response) => {
          this.day = response.data.quotes_data;
          this.chart_data = response.data.quotes_data;
          this.updateChartDay();
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
    getMonthHistory() {
      axios
        .get(
          `https://api.sprintt.co/crypto/currencies/history/${this.coinDetail.currency_id}?time_scope=1M`,
          options
        )
        .then((response) => {
          this.month = response.data.quotes_data;
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
    getYearHistory() {
      axios
        .get(
          `https://api.sprintt.co/crypto/currencies/history/${this.coinDetail.currency_id}?time_scope=1Y`,
          options
        )
        .then((response) => {
          this.year = response.data.quotes_data;
        })
        .catch((err) => {
          console.log(err);
          this.error = true;
        });
    },
    updateChartDay() {
      const dayPrice = [];
      this.day.forEach((el) => dayPrice.push(el.price));

      this.$refs.cryptoChart.updateOptions({
        series: [
          {
            name: this.coinDetail.name,
            data: dayPrice,
          },
        ],
      });
    },
    updateChartMonth() {
      const monthPrice = [];
      this.month.forEach((el) => monthPrice.push(el.price + "$"));
      this.$refs.cryptoChart.updateOptions({
        series: [
          {
            name: this.coinDetail.name,
            data: monthPrice,
          },
        ],
      });
    },
    updateChartYear() {
      const yearPrice = [];
      this.year.forEach((el) => yearPrice.push(Math.round(el.price)));
      this.$refs.cryptoChart.updateOptions({
        series: [
          {
            name: this.coinDetail.name,
            data: yearPrice,
          },
        ],
      });
    },
  },
  computed: {
    coinDetail() {
      return this.$attrs.coinProp;
    },
    currenciesUnit() {
      return this.currencies.filter((x) => {
        return x.currency_id == this.coinDetail.currency_id;
      });
    },
  },
  mounted() {
    this.getDayHistory();
    this.getMonthHistory();
    this.getYearHistory();
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
  .remove-from-track-btn {
    border: 2px solid #686cd6;
  }
  .history-button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .history-button {
      width: 9.6rem;
      height: 3.7rem;
      border-radius: 4rem;
      background-color: #2b2f39;
      font-size: 1.6rem;
      color: #d6d5da;
      margin: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        display: none;
      }
    }
  }
  .active-button {
    border: 1px solid #d6d5da;
  }
  .error-msg {
    font-size: 2rem;
    margin: 1.4rem;
    color: red;
  }
  .chart {
    margin: 1rem;
  }
}
</style>

