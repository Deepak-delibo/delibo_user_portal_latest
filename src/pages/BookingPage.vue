<template>
  <div>
    <div class="row" v-for="rowIndex in 4" :key="rowIndex">
      <div class="col-12 col-md-6" v-for="colIndex in 2" :key="colIndex">
        <v-chart class="chart" :option="generateOption()" autoresize />
      </div>
    </div>
  </div>
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent // Import GridComponent
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent // Add GridComponent to the list of components used
]);

// Generate separate options for each chart
function generateOption() {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    grid: {}, // You can now use grid configuration in your options
    series: [
      {
        data: [Math.floor(Math.random() * 300), Math.floor(Math.random() * 300), Math.floor(Math.random() * 300), Math.floor(Math.random() * 300), Math.floor(Math.random() * 300), Math.floor(Math.random() * 300), Math.floor(Math.random() * 300)],
        type: 'line'
      }
    ]
  };
}
</script>


<style scoped>
.chart {
  height: 400px;
}
</style>
