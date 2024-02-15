<template>
  <v-chart
    class="chart q-pt-md q-px-sm"
    :option="generateOption()"
    autoresize
  />
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
      itemGap: 18,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      bottom: 15,
      left: "center",
      data: ["Search Engine", "Direct", "Email","Union Ads","Video Ads"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
        distanceToLabelLine: 5, // Adjust the distance here (in pixels)
      },

        labelLine: {
          show: true,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
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
