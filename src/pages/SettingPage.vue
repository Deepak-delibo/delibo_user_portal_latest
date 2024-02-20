<template>
  <div class="flex justify-end ">
    <q-btn color="primary" icon="add" label="Booking Duration" size="md" class="" @click="durationDialog = true" />
  </div>
  <settingTable :tableData="rows"></settingTable>
  <q-dialog v-model="durationDialog" persistent  >
    <q-card class="q-px-none" style="max-width: 80vw;">
      <div
        class="flex align-center bg-primary text-white q-px-sm"
        style="overflow-x: hidden"
      >
        <p class="text-bold q-mt-sm">Add New Booking Duration</p>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </div>

      <q-card-section class="q-px-none">
        <div>
          <q-form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-6">
                <q-input
                  outlined
                  class="q-py-md q-px-sm"
                  v-model="firstName"
                  label="Select City*"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-input
                  outlined
                  class="q-py-md q-px-sm"
                  v-model="lastName"
                  label="Select Delibo Name"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-input
                  outlined
                  v-model="assignDelibo"
                  class="q-py-md q-px-sm"
                  label="Add Duration"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
            </div>
            <div class="q-py-sm q-px-sm flex justify-sm-end justify-end-sm justify-lg-center">
              <q-btn label="Add Booking Duration" type="submit" color="primary" />
              <q-btn
                label="Cancel"
                type="reset"
                color="negative"
                @click="durationDialog = false"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <RazorPay :order_id="order_id"></RazorPay>
</template>
<script>
import settingTable from "pages/settingTable.vue";
import { ref } from "vue";
import RazorPay from 'pages/RazorPay.vue';
export default {
  components: {
    settingTable,
    RazorPay
  },
  setup() {
    const durationDialog = ref(false);
    const order_id = ref("order_N3H7KIRUOOef7h")
    const rows = ref([
      {
        city: "Mumbai",
        status: "active",
        delibo_name: "Mumbai Delibo",
        duration: "1 hours",
      },
      {
        city: "Delhi",
        status: "active",
        delibo_name: "Delhi Delibo",
        duration: "1 hours",
      },
      {
        city: "Bangalore",
        status: "active",
        delibo_name: "Bangalore Delibo",
        duration: "1 hours",
      },
      {
        city: "Hyderabad",
        status: "expired",
        delibo_name: "Hyderabad Delibo",
        duration: "1 hours",
      },
      {
        city: "Ahmedabad",
        status: "expired",
        delibo_name: "Ahmedabad Delibo",
        duration: "1 hours",
      },
      {
        city: "Chennai",
        status: "expired",
        delibo_name: "Chennai Delibo",
        duration: "1 hours",
      },
      {
        city: "Kolkata",
        status: "active",
        delibo_name: "Kolkata Delibo",
        duration: "1 hours",
      },
      {
        city: "Surat",
        status: "expired",
        delibo_name: "Surat Delibo",
        duration: "1 hours",
      },
      {
        city: "Pune",
        status: "expired",
        delibo_name: "Pune Delibo",
        duration: "1 hours",
      },
      {
        city: "Jaipur",
        status: "active",
        delibo_name: "Jaipur Delibo",
        duration: "1 hours",
      },
      {
        city: "Lucknow",
        status: "active",
        delibo_name: "Lucknow Delibo",
        duration: "1 hours",
      },
      {
        city: "Kanpur",
        status: "active",
        delibo_name: "Kanpur Delibo",
        duration: "1 hours",
      },
      {
        city: "Nagpur",
        status: "active",
        delibo_name: "Nagpur Delibo",
        duration: "1 hours",
      },
      {
        city: "Indore",
        status: "active",
        delibo_name: "Indore Delibo",
        duration: "1 hours",
      },
      {
        city: "Thane",
        status: "active",
        delibo_name: "Thane Delibo",
        duration: "1 hours",
      },
      {
        city: "Bhopal",
        status: "active",
        delibo_name: "Bhopal Delibo",
        duration: "1 hours",
      },
      {
        city: "Visakhapatnam",
        status: "active",
        delibo_name: "Visakhapatnam Delibo",
        duration: "1 hours",
      },
      {
        city: "Pimpri-Chinchwad",
        status: "active",
        delibo_name: "Pimpri-Chinchwad Delibo",
        duration: "1 hours",
      },
      {
        city: "Patna",
        status: "active",
        delibo_name: "Patna Delibo",
        duration: "1 hours",
      },
    ]);
    return{
      rows,
      durationDialog,
      order_id
    }
  },
};
</script>
