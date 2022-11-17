<template>
  <div class="history-button-container">
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '3h' }"
      @click="updateChart($event.target.textContent)"
    >
      3h
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '24h' }"
      @click="updateChart($event.target.textContent)"
    >
      24h
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '7d' }"
      @click="updateChart($event.target.textContent)"
    >
      7d
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '30d' }"
      @click="updateChart($event.target.textContent)"
    >
      30d
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '3m' }"
      @click="updateChart($event.target.textContent)"
    >
      3m
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '1y' }"
      @click="updateChart($event.target.textContent)"
    >
      1y
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '3y' }"
      @click="updateChart($event.target.textContent)"
    >
      3y
    </button>
    <button
      class="history-button"
      :class="{ activeBtn: timePeriod == '5y' }"
      @click="updateChart($event.target.textContent)"
    >
      5y
    </button>
  </div>
</template>

<script>
export default {
  name: "TimePeriodSwitcher",
  props: ["timePeriod"],
  methods: {
    updateChart(val) {
      this.$emit("updateChart", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.history-button-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  margin: 0 auto;
  height: 10rem;
  overflow-x: scroll;
  scrollbar-width: 0;
  .history-button {
    min-width: 9.6rem;
    height: 3.7rem;
    border-radius: 4rem;
    background-color: #2b2f39;
    font-size: 1.6rem;
    color: #d6d5da;
    margin: 1rem;
    border: 1px solid #2b2f39;
  }
}
.activeBtn {
  border: 1px solid #d6d5da !important;
}
</style>
