<template>
     <Bar
        :chart-data="chart_data"
        :chart-options="chart_options"
        :width="width_bar"
        :height="height_bar"
      />
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
name: 'Chart',
components: { Bar },
props: ['chart_data', 'chart_options', 'width_bar', 'height_bar'],

}
</script>

<style>

</style>