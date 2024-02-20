<template>
  <div class="q-py-md" v-if="!$q.screen.lt.sm">
    <q-markup-table class="my-sticky-column-table">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">City</th>
          <th class="text-left">Status</th>
          <th class="text-left">Delibo Name</th>
          <th class="text-left">Duration</th>
          <!-- <th class="text-left">Customer Contact</th> -->
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="text-left">{{ index + 1 }}</td>
          <td class="text-left text-subtitle1">{{ row.city }}</td>
          <td class="text-left">
            <q-chip
              v-if="row.status == 'active'"
              outline
              color="positive"
              size="12px"
              >Active</q-chip
            >
            <q-chip v-else outline color="negative" size="12px">Expired</q-chip>
          </td>
          <td class="text-left">{{ row.delibo_name }}</td>
          <td class="text-left">{{ row.duration }}</td>
          <td class="text-left">
            <div class="text-primary q-gutter-sm">
              <q-toggle v-model="row.status" color="primary" />
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <div class="q-py-md" v-if="$q.screen.lt.sm">
    <q-card v-for="(row, index) in tableData" :key="index" class="q-my-sm">
      <q-card-section>
        <div class="">
          <div class="text-primary flex justify-end">
            <q-btn
              flat
              dense
              icon="print"
              size="sm"
              color="primary"
              @click="printPackageCode(row)"
            >
              <q-tooltip
                size="sm"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                Print Package Code
              </q-tooltip>
            </q-btn>
          </div>
          <!-- <div > <q-checkbox class="q-mx-none q-px-none" size="xs" v-model="selectedRows" :val="row" /><span class="text-bold">First Name</span> : {{ row.name }}</div> -->
          <div>
            <span class="text-bold q-pr-sm">City</span>: &nbsp;
            {{ row.city }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">status</span>: &nbsp;
            <q-chip
              v-if="row.status == 'active'"
              outline
              color="positive"
              size="12px"
              >Active</q-chip
            >
            <q-chip v-else outline color="negative" size="12px">Expired</q-chip>
          </div>
          <div>
            <span class="text-bold q-pr-sm">Delibo Name</span>:&nbsp;
            {{ row.delibo_name }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">Duration</span>: &nbsp;
            {{ row.duration }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
export default {
  props: ["tableData"],
  setup(props) {
    const third = ref(false);
    return {
      third,
    };
    onMounted(() => {
      console.log("find all data", props.tableData);
    });
  },
};
</script>
<style>
.my-sticky-column-table thead tr th {
  background-color: #ef9105;
  font-size: 15px;
  font-weight: 600;
  color: white;
}

.my-sticky-column-table td:nth-child(1),
.my-sticky-column-table td:nth-child(2) {
  background-color: #fff;
}

.my-sticky-column-table th:nth-child(1),
.my-sticky-column-table td:nth-child(1) {
  position: sticky;
  left: 0;
  z-index: 1;
}
.my-sticky-column-table th:nth-child(2),
.my-sticky-column-table td:nth-child(2) {
  position: sticky;
  left: 35px;
  z-index: 1;
}
.q-table tbody td {
  font-size: 13px !important;
}
</style>
