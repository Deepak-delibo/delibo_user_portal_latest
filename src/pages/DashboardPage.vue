<template>
   <div class="row">
    <div class="col-12 col-md-6 q-pa-sm">
      <q-card>
        <indexPagesVue/>
      </q-card>
    </div>
    <div class="col-12 col-md-6 q-pa-sm">
      <q-card>
        <LineChart/>
      </q-card>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-md-6 q-pa-sm">
      <q-card>
        <DonutChart/>
      </q-card>
    </div>
    <div class="col-12 col-md-6 q-pa-sm">
      <q-card>
        <LineChart/>
      </q-card>
    </div>
  </div>

</template>

<script setup>
import indexPagesVue from './PieChart.vue';
import LineChart  from './LineChart.vue';
import DonutChart from './DonutChart.vue'
</script>
