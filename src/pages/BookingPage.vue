<template>
  <div>
    <div class="flex justify-end">
    <q-btn
      color="primary"
      icon="print"
      label="Selected print Data"
      size="md"
      class="q-mr-sm"
      @click="SelectedShowQR"
    />
    <q-btn
      color="primary"
      icon="add"
      label="Create New Booking"
      size="md"
      @click="create_booking_dialog = true"
    />
  </div>
  <BookingTable :tableData="rows"></BookingTable>
  <div class="q-py-md flex flex-center" v-if="!$q.screen.lt.sm">
    <q-pagination
      v-model="current"
      max="205"
      direction-links
      outline
      :max-pages="8"
      boundary-numbers
    />
  </div>
  <div class="q-py-md flex flex-center" v-if="$q.screen.lt.sm">
    <q-pagination
      v-model="current"
      max="205"
      direction-links
      outline
      :max-pages="4"
      boundary-numbers
    />
  </div>
  <q-dialog v-model="create_booking_dialog" persistent>
    <q-card class="q-px-none" style="width: 100vw;">
      <div class="flex align-center bg-primary text-white q-px-sm" style="overflow-x: hidden">
        <p class="text-bold q-mt-sm">Create New Booking</p>
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
                  label="Select Location*"
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
                  label="Select Size*"
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
                  label="Select Duration*"
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
                  v-model="assignCity"
                  label="Customer Name*"
                  class="q-py-md q-px-sm"
                  lazy-rules
                  dense
                  :readonly="showViewData"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-input
                  outlined
                  v-model="mobile"
                  label="Your mobile *"
                  lazy-rules
                  dense
                  :readonly="showViewData"
                  class="q-py-md q-px-sm"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-input
                  outlined
                  v-model="email"
                  label="FM"
                  class="q-py-md q-px-sm"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                />
              </div>
              <div class="col-12 col-md-6 col-lg-6">
                <q-input
                  outlined
                  v-model="email"
                  label="FA"
                  class="q-py-md q-px-sm"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                />
              </div>
            </div>
            <div class="q-py-sm q-px-sm flex justify-sm-end justify-end-sm justify-lg-center">
              <q-btn label="Book A Delibo" type="submit" color="primary" />
              <q-btn
                label="Cancel"
                type="reset"
                color="negative"
                @click="create_booking_dialog = false"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import BookingTable from "./BookingTable.vue";
import { inject } from "vue";
export default {
  emits: ["selectedShowQr"],
  components: {
    BookingTable,
  },
  setup() {
    const create_booking_dialog = ref(false);
    const bus = inject("bus");
    const current = ref(3);
    const rows = ref([
      {
        date_booked: "12/04/2020",
        agent: "Isaac Asimov",
        customer: "John Smith",
        status: "expired",
        package_code: "1234567890",
        expiry_date: "2021",
      },
      {
        date_booked: "02/08/2020",
        agent: "Frank Herbert",
        customer: "Jane Doe",
        status: "active",
        package_code: "9876543210",
        expiry_date: "2021",
      },
      {
        date_booked: "05/11/2020",
        agent: "Arthur C. Clarke",
        customer: "Robert Johnson",
        status: "active",
        package_code: "2468135790",
        expiry_date: "2021",
      },
      {
        date_booked: "09/01/2020",
        agent: "Philip K. Dick",
        customer: "Sarah Williams",
        status: "active",
        package_code: "1357924680",
        expiry_date: "2021",
      },
      {
        date_booked: "03/07/2020",
        agent: "Ray Bradbury",
        customer: "Michael Brown",
        status: "active",
        package_code: "8642097531",
        expiry_date: "2021",
      },
      {
        date_booked: "10/02/2020",
        agent: "Orson Scott Card",
        customer: "Emily Davis",
        status: "active",
        package_code: "5793142068",
        expiry_date: "2021",
      },
      {
        date_booked: "08/06/2020",
        agent: "Robert A. Heinlein",
        customer: "David Wilson",
        status: "active",
        package_code: "3579024618",
        expiry_date: "2021",
      },
      {
        date_booked: "06/09/2020",
        agent: "William Gibson",
        customer: "Jennifer Taylor",
        status: "active",
        package_code: "6802143957",
        expiry_date: "2021",
      },
      {
        date_booked: "01/12/2020",
        agent: "Ursula K. Le Guin",
        customer: "Christopher Lee",
        status: "active",
        package_code: "9024681357",
        expiry_date: "2021",
      },
      {
        date_booked: "04/05/2020",
        agent: "Douglas Adams",
        customer: "Amanda Moore",
        status: "active",
        package_code: "2134509876",
        expiry_date: "2021",
      },
    ]);
    const SelectedShowQR = () => {
      bus.emit("selectedShowQr");
    };
    return {
      create_booking_dialog,
      rows,
      current,
      SelectedShowQR,
    };
  },
};
</script>


<style scoped>
</style>
