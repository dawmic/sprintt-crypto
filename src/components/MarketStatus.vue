<template>
  <div class="market-container" :style="{ marginTop: marginTop + 'rem' }">
    <div class="up-container" v-if="marketUp">
      <img
        :style="{
          width: iconWidth + 'rem',
          height: iconHeight + 'rem',
          margin: margin + 'rem',
        }"
        src="@/assets/green_arrow.png"
        alt="Up caret icon"
      /><span :style="{ fontSize: fontSize + 'rem' }">{{
        market_change_24hr
      }}</span>
    </div>
    <div class="down-container" v-if="!marketUp">
      <img
        :style="{
          width: iconWidth + 'rem',
          height: iconHeight + 'rem',
          margin: margin + 'rem',
        }"
        src="@/assets/red_arrow.png"
        alt="Down caret icon"
      /><span :style="{ fontSize: fontSize + 'rem' }">{{
        market_change_24hr
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketStatus",
  props: [
    "iconWidth",
    "iconHeight",
    "market_change_24hr",
    "fontSize",
    "margin",
    "marginTop",
  ],
  data() {
    return {
      marketUp: null,
    };
  },
  mounted() {
    if (parseFloat(this.market_change_24hr) > 0) {
      this.marketUp = true;
    } else {
      this.marketUp = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.market-container {
  .up-container,
  .down-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .up-container {
    span {
      color: #59bb6e;
    }
  }
  .down-container {
    span {
      color: #db4848;
    }
  }
}
</style>