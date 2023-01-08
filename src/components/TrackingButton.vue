<template>
  <div>
    <button
      v-if="!isTracked"
      class="add-to-track-btn"
      @click="addToTracked(crypto.symbol)"
    >
      Add to tracked
    </button>

    <button v-if="isTracked" class="remove-from-track-btn" @click="removeFromTracked(crypto.symbol)">
      Remove from tracked
    </button>
  </div>
</template>

<script>
export default {
  name: "TrackingButton",
  props: ["crypto"],
  data() {
    return {
      tracked: [],
      err: false,
    };
  },
  created() {
    this.getCurrentTracked();
  },
  methods: {
    async getCurrentTracked() {
      if(!localStorage.getItem('tracked')){
          localStorage.setItem('tracked', '[]');
        }
      const dataJSON = await localStorage.getItem("tracked");
      const parsedData = await JSON.parse(dataJSON);
      this.tracked = parsedData;
    },
    addToTracked(crypto) {
      this.tracked.push(crypto);
      localStorage.setItem("tracked", JSON.stringify(this.tracked)); 
    },
    removeFromTracked(crypto) {
      this.tracked = this.tracked.filter((el) => el !== crypto);
      localStorage.setItem("tracked", JSON.stringify(this.tracked));
    },
  },
  computed: {
    isTracked() {
      return this.tracked.includes(this.crypto.symbol);
    },
  },
};
</script>

<style scoped lang="scss">
.add-to-track-btn,
.remove-from-track-btn {
  height: 4.7rem;
  min-width: 25rem;
  border: 1px solid transparent;
  border-radius: 5rem;
  font-size: 1.6rem;
  color: #d6d5da;
  background-color: transparent;
  margin-top: 2rem;
  transition: 0.1s ease-out;

  &:hover {
    outline-style: solid;
    outline-color: #686cd6;
    outline-offset: 3px;
    outline-width: 2px;
  }
  &:active {
    filter: grayscale(20%);
  }
}
.add-to-track-btn {
  background-color: #686cd6;
}
.remove-from-track-btn {
  border: 2px solid #686cd6;
}
</style>
