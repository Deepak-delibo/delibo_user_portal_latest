
<template>
  <v-chart class="chart q-pt-md q-px-sm" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

// Provide the theme globally
// provide(THEME_KEY, 'dark');

// Define the option data
const option = ref({
  title: {
    text: "Delibo Sources",
    left: "start",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "horizontal",
    bottom: 15,
    left: "center",
    data: ["Ad Networks", "Video Ads", "Search Engines"],
  },
  series: [
    {
      name: "Delibo Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "47%"],
      label: {
        distanceToLabelLine: 5, // Adjust the distance here (in pixels)
      },
      data: [
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
