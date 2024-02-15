<template>
  <v-chart class="chart q-pt-md q-px-sm" :option="generateOption()" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, // Import GridComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, // Add GridComponent to the list of components used
]);

// Generate separate options for each chart
function generateOption() {
  return {
    title: {
      text: "Delibo Sources",
      left: "start",
      itemGap: 18
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
    series: [
      {
        data: [
          Math.floor(Math.random() * 300),
          Math.floor(Math.random() * 300),
          Math.floor(Math.random() * 300),
          Math.floor(Math.random() * 300),
          Math.floor(Math.random() * 300),
          Math.floor(Math.random() * 300),
          Math.floor(Math.random() * 300),
        ],
        type: "line",
      },
    ],
  };
}
</script>


<style scoped>
.chart {
  height: 400px;
}
</style>
