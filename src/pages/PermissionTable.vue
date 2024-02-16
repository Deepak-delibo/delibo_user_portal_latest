<template>
  <div class="q-py-md" v-if="!$q.screen.lt.sm">
    <q-markup-table class="my-sticky-column-table">
      <thead>
        <tr class="">
          <th class="text-left">
            <!-- <input class="" type="checkbox" v-model="selectAll" /> -->
            #
          </th>
          <th class="text-left">First Name</th>
          <th class="text-left">Last Name</th>
          <th class="text-left">User Name</th>
          <th class="text-left">Password</th>
          <th class="text-left">Assign City</th>
          <th class="text-left">Assign Delibo</th>
          <th class="text-left">Mobile</th>
          <th class="text-left">Email</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td class="text-left">
            {{ index + 1 }}
            <!-- <input type="checkbox" v-model="selectedRows" :value="row" /> -->
          </td>
          <td class="text-left text-subtitle1">{{ row.firstName }}</td>
          <td class="text-left text-subtitle1">{{ row.lastName }}</td>
          <td class="text-left">{{ row.userName }}</td>
          <td class="text-left">{{ row.password }}</td>
          <td class="text-left">{{ row.assignCity }}</td>
          <td class="text-left">{{ row.assignDelibo }}</td>
          <td class="text-left">{{ row.mobile }}</td>
          <td class="text-left">{{ row.email }}</td>
          <td class="text-left">
            <!-- <div class="text-primary q-gutter-md" style="font-size: 18px">
              <q-btn flat round dense v-tooltip="'View'">
                <q-icon name="visibility" />
              </q-btn>
              <q-btn flat round dense v-tooltip="'Edit'">
                <q-icon name="edit" />
              </q-btn>
              <q-btn flat round dense v-tooltip="'Delete'">
                <q-icon name="delete" />
              </q-btn>
            </div> -->
            <div class="text-primary q-gutter-sm">
              <q-btn flat dense icon="visibility" color="primary" size="sm" @click="viewDetails(row)">
                <q-tooltip
                  transition-show="flip-right"
                  transition-hide="flip-left"
                >
                  View
                </q-tooltip>
              </q-btn>

              <q-btn flat dense icon="edit" color="primary" size="sm">
                <q-tooltip transition-show="scale" transition-hide="scale">
                  Edit
                </q-tooltip>
              </q-btn>

              <q-btn
                flat
                dense
                icon="delete"
                color="primary"
                size="sm"
                @click="showAlert"
              >
                <q-tooltip transition-show="rotate" transition-hide="rotate">
                  Delete
                </q-tooltip>
              </q-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
  <div v-if="$q.screen.lt.sm">
    <!-- <div class="q-mt-sm">
      <q-checkbox  v-model="selectAll"  size="xs"/> Select All
    </div> -->
    <q-card v-for="(row, index) in tableData" :key="index" class="q-my-sm">
      <q-card-section>
        <div class="">
          <div class="text-primary  flex justify-end">
              <q-btn flat dense icon="visibility" color="primary" @click="viewDetails(row)">
                <q-tooltip
                  transition-show="flip-right"
                  transition-hide="flip-left"
                >
                  View
                </q-tooltip>
              </q-btn>

              <q-btn flat dense icon="edit" color="primary">
                <q-tooltip transition-show="scale" transition-hide="scale">
                  Edit
                </q-tooltip>
              </q-btn>

              <q-btn
                flat
                dense
                icon="delete"
                color="primary"
                @click="showAlert"
              >
                <q-tooltip transition-show="rotate" transition-hide="rotate">
                  Delete
                </q-tooltip>
              </q-btn>
            </div>
          <!-- <div > <q-checkbox class="q-mx-none q-px-none" size="xs" v-model="selectedRows" :val="row" /><span class="text-bold">First Name</span> : {{ row.name }}</div> -->
          <div>
            <span class="text-bold q-pr-sm">Dessert</span>: &nbsp;
            {{ row.name }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">Last Name</span>: &nbsp;
            {{ row.lastName }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">User Name</span>: &nbsp;
            {{ row.fat }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">Password</span>: &nbsp;
            {{ row.carbs }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">Protein (g)</span>:&nbsp;
            {{ row.protein }}
          </div>
          <div>
            <span class="text-bold q-pr-sm">Sodium (mg)</span>: &nbsp;
            {{ row.sodium }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent,ref, computed, watch, onMounted } from "vue";
import { inject } from 'vue'


export default defineComponent({
  name:'PermissionTable',
  props: ["tableData"],
  emits: ['viewDetails'],
  setup(props,{emit}) {
    const selectedRows = ref([]);
    const selectAll = ref(false);
    const bus = inject('bus')
    onMounted(() => {
      console.log("tableData:", props.tableData);
    });
    // Computed property to check if all rows are selected
    // const allRowsSelected = computed(() => {
    //   return selectedRows.value.length === rows.value.length;
    // });

    // Watch for changes in the allRowsSelected value
    // watch(allRowsSelected, (newValue) => {
    //   selectAll.value = newValue; // Update the selectAll value based on allRowsSelected
    // });

    // // Watch for changes in the selectAll value
    // watch(selectAll, (newValue) => {
    //   if (!newValue) {
    //     selectedRows.value = []; // Deselect all rows if selectAll is false
    //   } else {
    //     selectedRows.value = [...rows.value]; // Select all rows if selectAll is true
    //   }
    // });
    const showAlert = () => {
      bus.emit('countChanged', "dldkjfkdfjksfjksadjfksajf");
    };
    const viewDetails = (data)=>{
      emit('viewDetails', data);
    }
    return {
      selectedRows,
      showAlert,
      selectAll,
      viewDetails
    };
  },
});
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


