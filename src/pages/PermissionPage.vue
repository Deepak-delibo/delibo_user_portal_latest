<template>
  <div class="text-capitalize flex justify-between">
    <q-btn-toggle
      v-model="add_role"
      size="md"
      toggle-color="primary"
      :options="options"
      class="text-capitalize"
    />
    <q-btn
      color="primary"
      icon="add"
      :label="dialog_name"
      size="md"
      @click="bar2 = true"
    />
  </div>
  <div class="row q-mt-sm q-col-gutter-xs">
    <div class="col-12 col-md-4 col-lg-4">
      <q-input
        v-model="search_input_value"
        debounce="500"
        dense
        outlined
        placeholder="Search"
        label="Search"
      />
    </div>
    <div class="col-12 col-md-4 col-lg-4">
      <q-select
        outlined
        dense
        v-model="model"
        :options="selectOptions"
        label="City"
      />
    </div>
    <div class="col-12 col-md-4 col-lg-4">
      <!-- <q-select
        outlined
        dense
        multiple
        use-chips
        v-model="model"
        :options="selectOptions"
        label="Delibo Name"
      /> -->
      <q-select
        v-model="parentCategory"
        multiple
        outlined
        dense
        label="Parent Category"
        :options="businessCategoriesToSelect"
        :option-label="
          (opt) => (Object(opt) === opt && 'title' in opt ? opt.title : null)
        "
        :option-value="
          (opt) => (Object(opt) === opt && '@id' in opt ? opt['@id'] : null)
        "
        :display-value="
          parentCategory.length <= 2
            ? parentCategory.map((item) => item.title).join(', ')
            : `${parentCategory
                .slice(0, 2)
                .map((item) => item.title)
                .join(', ')} (+${parentCategory.length - 2} others)`
        "
        map-options
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No Business Categories Found
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
  <PermissionTable
    :tableData="rows"
    @viewDetails="handleViewDetails"
  ></PermissionTable>
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
  <q-dialog v-model="bar2" persistent full-width>
    <q-card class="q-px-none">
      <div
        class="flex align-center bg-primary text-white q-px-sm"
        style="overflow-x: hidden"
      >
        <p class="text-bold q-mt-sm">Add {{ dialog_name }}</p>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </div>

      <q-card-section class="q-px-none">
        <div>
          <q-form @submit="onSubmit" @reset="onReset">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-4">
                <q-input
                  outlined
                  class="q-py-md q-px-sm"
                  v-model="firstName"
                  label="Your First Name *"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <q-input
                  outlined
                  class="q-py-md q-px-sm"
                  v-model="lastName"
                  label="Your Last Name *"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <q-input
                  outlined
                  v-model="assignDelibo"
                  class="q-py-md q-px-sm"
                  label="Assign Delibo*"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-4">
                <q-input
                  outlined
                  v-model="assignCity"
                  label="Your name *"
                  class="q-py-md q-px-sm"
                  lazy-rules
                  dense
                  :readonly="showViewData"
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
              <div class="col-12 col-md-6 col-lg-4">
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
              <div class="col-12 col-md-6 col-lg-4">
                <q-input
                  outlined
                  v-model="email"
                  label="Your email *"
                  class="q-py-md q-px-sm"
                  lazy-rules
                  :readonly="showViewData"
                  dense
                  :rules="[
                    (val) => (val && val.length > 0) || 'Please type something',
                  ]"
                />
              </div>
            </div>
            <div class="q-py-md q-px-sm" v-if="!showViewData">
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import PermissionTable from "./PermissionTable.vue";
import { inject } from "vue";
import Swal from "sweetalert2";
import { Loading } from "quasar";
export default {
  components: {
    PermissionTable,
  },
  setup() {
    const showViewData = ref(false);
    const bus = inject("bus");
    const rows = ref([
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        password: "password123",
        assignCity: "New York",
        assignDelibo: "Delhi",
        mobile: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        userName: "alicesmith",
        password: "alicepassword",
        assignCity: "Los Angeles",
        assignDelibo: "Tokyo",
        mobile: "9876543210",
        email: "alice@example.com",
      },
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        password: "password123",
        assignCity: "New York",
        assignDelibo: "Delhi",
        mobile: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        userName: "alicesmith",
        password: "alicepassword",
        assignCity: "Los Angeles",
        assignDelibo: "Tokyo",
        mobile: "9876543210",
        email: "alice@example.com",
      },
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        password: "password123",
        assignCity: "New York",
        assignDelibo: "Delhi",
        mobile: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        userName: "alicesmith",
        password: "alicepassword",
        assignCity: "Los Angeles",
        assignDelibo: "Tokyo",
        mobile: "9876543210",
        email: "alice@example.com",
      },
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        password: "password123",
        assignCity: "New York",
        assignDelibo: "Delhi",
        mobile: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        userName: "alicesmith",
        password: "alicepassword",
        assignCity: "Los Angeles",
        assignDelibo: "Tokyo",
        mobile: "9876543210",
        email: "alice@example.com",
      },
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        password: "password123",
        assignCity: "New York",
        assignDelibo: "Delhi",
        mobile: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        userName: "alicesmith",
        password: "alicepassword",
        assignCity: "Los Angeles",
        assignDelibo: "Tokyo",
        mobile: "9876543210",
        email: "alice@example.com",
      },
      {
        firstName: "John",
        lastName: "Doe",
        userName: "johndoe",
        password: "password123",
        assignCity: "New York",
        assignDelibo: "Delhi",
        mobile: "1234567890",
        email: "john@example.com",
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        userName: "alicesmith",
        password: "alicepassword",
        assignCity: "Los Angeles",
        assignDelibo: "Tokyo",
        mobile: "9876543210",
        email: "alice@example.com",
      },
    ]);
    const parentCategory = ref([]);
    const businessCategoriesToSelect = ref([
      { "@id": "1", title: "Category 1" },
      { "@id": "2", title: "Category 2" },
      { "@id": "3", title: "Category 3" },
      { "@id": "4", title: "Category 1" },
      { "@id": "5", title: "Category 2" },
      { "@id": "6", title: "Category 3" },
      { "@id": "7", title: "Category 1" },
      { "@id": "8", title: "Category 2" },
      { "@id": "9", title: "Category 3" },
      { "@id": "10", title: "Category 1" },
      { "@id": "11", title: "Category 2" },
      { "@id": "12", title: "Category 3" },
      { "@id": "13", title: "Category 1" },
      { "@id": "14", title: "Category 2" },
      { "@id": "15", title: "Category 3" },
      // Add more categories as needed
    ]);
    const formattedSelectedItems = computed(() => {
      const selected = parentCategory.value;
      if (selected.length <= 2) {
        return selected.map((item) => item.title).join(", ");
      } else {
        return `${selected
          .slice(0, 2)
          .map((item) => item.title)
          .join(", ")} (+${selected.length - 2} others)`;
      }
    });
    const items = ref([
      { title: "foo" },
      { title: "bar" },
      { title: "fizz" },
      { title: "buzz" },
      { title: "fizzbuzz" },
      { title: "foobar" },
    ]);
    const value = ref([]);

    const bar2 = ref(false);
    const add_role = ref("fm");
    const dialog_name = ref("Facility Manager");
    const options = computed(() => [
      { label: "Facility Manager", value: "fm" },
      { label: "Feild Agent", value: "fa" },
    ]);
    onMounted(() => {
      // Listen to the 'countChanged' event
      Loading.show();
      setTimeout(() => {
        Loading.hide();
      }, 2000);
      search_input_value.value = null;
      bus.on("countChanged", (data) => {
        console.log("afkjakfdjlak", data);
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF9105",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          console.log("dfijdkjkdjlsfdls", result);
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Data has been deleted.",
              icon: "success",
              confirmButtonColor: "#EF9105",
            });
          }
        });
      });
    });
    const search_input_value = ref(null);

    const firstName = ref(null);
    const lastName = ref(null);
    const assignCity = ref(null);
    const assignDelibo = ref(null);
    const mobile = ref(null);
    const email = ref(null);
    const accept = ref(false);
    watch(
      () => add_role.value,
      (newValue) => {
        if (newValue == "fa") {
          dialog_name.value = "Feild Agent";
        } else {
          dialog_name.value = "Facility Manager";
        }
      }
    );
    watch(
      () => search_input_value.value,
      (value) => {
        if (value !== null) {
          console.log("jdflkjfdlsdfajl", value);
          alert("dfkjfkdjfksjlafjsdalk");
        }
      }
    );

    const handleViewDetails = (data) => {
      console.log("dkjkdjfkds", data);
      showViewData.value = true;
      firstName.value = data.firstName;
      lastName.value = data.lastName;
      assignCity.value = data.assignCity;
      mobile.value = data.mobile;
      email.value = data.email;
      bar2.value = true;
    };
    return {
      showViewData,
      current: ref(3),
      search_input_value,
      parentCategory,
      businessCategoriesToSelect,
      formattedSelectedItems,
      add_role,
      firstName,
      lastName,
      assignCity,
      assignDelibo,
      dialog_name,
      mobile,
      email,
      rows,
      bar2,
      items,
      value,
      options,
      maximizedToggle: ref(false),
      accept,
      handleViewDetails,
      model: ref(null),
      selectOptions: ["Chennai", "Hyderabad", "Delhi", "Mumbai"],
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {},
    };
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
