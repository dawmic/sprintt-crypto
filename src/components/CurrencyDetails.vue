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
        <p>${{ coinRoundedPrice }}</p>
      </div>
    </div>

    <p v-if="error" class="error-msg">We have some problem to get data.</p>
    <TimePeriodSwitcher :timePeriod='tp' @updateChart="getHistoryData($event)" />
    <div class="chart">
      <Chart
        :chart_data="chart_data"
        :chart_options="chart_options"
        :width_bar="width_bar"
        :height_bar="height_bar"
      />
    </div>
    <!-- <button
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
    </button> -->
  </div>
</template>

<script>
import axios from "axios";
//import options from "../../scripts/options.js";
import Chart from "./Chart.vue";
import headers from "../../scripts/config";
import TimePeriodSwitcher from "./TimePeriodSwitcher.vue";

export default {
  name: "CurrencyDetails",
  props: ["currencies"],
  components: { Chart, TimePeriodSwitcher },
  data() {
    return {
      history_data: "",
      chart_data: {
        labels: [],
        datasets: [
          {
            label: `USD ${this.$attrs.coinProp.name}`,
            backgroundColor: `${this.$attrs.coinProp.color}`,
            data: [],
          },
        ],
      },
      chart_options: {
        scales: {
          y: {
            //  display: false // Hide Y axis labels
          },
          x: {
            display: false, // Hide X axis labels,
            // max: 48,
            ticks: {
              autoSkip: true,
            },
          },
        },
      },
      error: false,
      tp: '',
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
    getHistoryData(time_period) {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: time_period,
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "50",
          offset: "0",
        },
        headers: headers,
      };
      this.tp = options.params.timePeriod;
      axios
        .get(
          `https://coinranking1.p.rapidapi.com/coin/${this.$attrs.coinProp.uuid}/history`,
          options
        )
        .then((response) => {
          this.chart_data.datasets[0].data = []; //reset chart data
          this.chart_data.labels = []; // reset chart data
          this.history_data = response.data.data.history;
          console.log(this.history_data.slice(0, 50));
          const cut_history_data = response.data.data.history.reverse();
          /*  response.data.data.history.forEach((el) =>
            this.chart_data.datasets[0].data.push(
              parseFloat(el.price).toFixed(2)
            )
          );
          response.data.data.history.forEach((el) =>{
           this.chart_data.labels.push(this.crypto_date(el.timestamp));
        
          }*/
          cut_history_data.forEach((el) => {
            this.chart_data.datasets[0].data.push(
              parseFloat(el.price).toFixed(2)
            );
            this.chart_data.labels.push(this.crypto_date(el.timestamp));
          });
        })
        .catch((err) => console.log(err));
        console.log('trigger func');
    },
    crypto_date(timestamp) {
      const u = new Date(timestamp * 1000);

      return (
        u.getUTCFullYear() +
        "-" +
        ("0" + u.getUTCMonth()).slice(-2) +
        "-" +
        ("0" + u.getUTCDate()).slice(-2) +
        " " +
        ("0" + u.getUTCHours()).slice(-2) +
        ":" +
        ("0" + u.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + u.getUTCSeconds()).slice(-2)
      );
    },
  },

  computed: {
    coinDetail() {
      return this.$attrs.coinProp;
    },
    coinRoundedPrice() {
      return parseFloat(this.$attrs.coinProp.price).toFixed(2);
    },
    height_bar() {
      return Number(60);
    },
    width_bar() {
      return Number(90);
    },
  },
  mounted() {
    this.getHistoryData("7d");
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
