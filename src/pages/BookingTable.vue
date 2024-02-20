<template>
  <div>
    <div class="q-py-md" v-if="!$q.screen.lt.sm">
      <q-markup-table class="my-sticky-column-table">
        <thead>
          <tr>
            <th class="text-left">
              <input class type="checkbox" v-model="selectAll" />
            </th>
            <th class="text-left">Booked Date</th>
            <th class="text-left">Agent</th>
            <th class="text-left">Customer</th>
            <th class="text-left">Status</th>
            <th class="text-left">Package ID</th>
            <th class="text-left">Expiry Date</th>
            <!-- <th class="text-left">Customer Contact</th> -->
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td class="text-left">
              <input type="checkbox" v-model="selectedRows" :value="row" />
            </td>
            <td class="text-left text-subtitle1">{{ row.date_booked }}</td>
            <td class="text-left text-subtitle1">{{ row.agent }}</td>
            <td class="text-left">{{ row.customer }}</td>
            <td class="text-left">
              <q-chip v-if="row.status == 'active'" outline color="positive" size="12px">Active</q-chip>
              <q-chip v-else outline color="negative" size="12px">Expired</q-chip>
            </td>
            <td class="text-left">{{ row.package_code }}</td>
            <td class="text-left">{{ row.expiry_date }}</td>
            <td class="text-left">
              <div class="text-primary q-gutter-sm">
                <q-btn
                  flat
                  dense
                  icon="print"
                  color="primary"
                  size="sm"
                  @click="printPackageCode(row)"
                >
                  <q-tooltip
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >Print Package Code</q-tooltip>
                </q-btn>
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <q-dialog v-model="show_qr_code" transition-show="scale" transition-hide="scale">
      <div class="slider-container">
        <q-card>
          <QRCodeSlider :categories="qrCodesArray"></QRCodeSlider>
        </q-card>
      </div>
    </q-dialog>
    <div v-if="$q.screen.lt.sm">
      <div class="q-mt-sm">
        <q-checkbox v-model="selectAll" size="xs" />Select All
      </div>
      <q-card v-for="(row, index) in tableData" :key="index" class="q-my-sm">
        <q-card-section>
          <div class>
            <div class="text-primary flex justify-end">
              <input type="checkbox" v-model="selectedRows" :value="row" />
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
                >Print Package Code</q-tooltip>
              </q-btn>
            </div>
            <!-- <div > <q-checkbox class="q-mx-none q-px-none" size="xs" v-model="selectedRows" :val="row" /><span class="text-bold">First Name</span> : {{ row.name }}</div> -->
            <div>
              <span class="text-bold q-pr-sm">Booked Date</span>
              : &nbsp;
              {{ row.date_booked }}
            </div>
            <div>
              <span class="text-bold q-pr-sm">Agent</span>
              : &nbsp;
              {{ row.agent }}
            </div>
            <div>
              <span class="text-bold q-pr-sm">Customer</span>
              : &nbsp;
              {{ row.customer }}
            </div>
            <div>
              <span class="text-bold q-pr-sm">status</span>: &nbsp;
              <q-chip v-if="row.status == 'active'" outline color="positive" size="12px">Active</q-chip>
              <q-chip v-else outline color="negative" size="12px">Expired</q-chip>
            </div>
            <div>
              <span class="text-bold q-pr-sm">Package ID</span>
              :&nbsp;
              {{ row.package_code }}
            </div>
            <div>
              <span class="text-bold q-pr-sm">Expiry Date</span>
              : &nbsp;
              {{ row.expiry_date }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { inject } from "vue";
import Swal from "sweetalert2";
import QRCode from "qrcode-generator";
import QRCodeSlider from "./QRCodeSlider.vue";
export default defineComponent({
  name: "PermissionTable",
  props: ["tableData"],
  emits: ["viewDetails"],
  components: {
    QRCodeSlider,
  },
  setup(props, { emit }) {
    const selectedRows = ref([]);
    const selectAll = ref(false);
    const show_qr_code = ref(false);
    const bus = inject("bus");
    const generateSVG = (svgData) => {
      // Logic to generate SVG tag from svgData
      return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" preserveAspectRatio="xMinYMin meet">${svgData}</svg>`;
    };
    onMounted(() => {
      console.log("tableData:", props.tableData);
      bus.on("selectedShowQr", () => {
        console.log("fjdkfjdl", selectedRows.value.length);
        if (selectedRows.value.length != 0) {
          qrCodesArray.value = [];
          selectedRows.value.forEach((data, index) => {
            const { package_code } = data;

            // Generate QR code for the package code
            const qr = QRCode(0, "M");
            qr.addData(package_code);
            qr.make();

            const svgData = qr.createSvgTag({
              cellSize: 4,
              margin: 1,
              scalable: true,
            });

            // Convert SVG to image
            //  const image = new Image();
            //   image.onload = function() {
            //       const canvas = document.createElement("canvas");
            //       canvas.width = image.width;
            //       canvas.height = image.height;
            //       const context = canvas.getContext("2d");
            //       context.drawImage(image, 0, 0);
            //       const imagePath = canvas.toDataURL(); // Retrieve the image path
            //       qrCodesArray.value.push(imagePath); // Push the image path into the array
            //   };
            //   image.src = "data:image/svg+xml;base64," + btoa(svgData);
            // Push SVG data into the array
            qrCodesArray.value.push(svgData);
          });
          console.log("fjdkfjlkdjf", qrCodesArray.value);
          show_qr_code.value = true;
        } else if (selectedRows.value.length == 0) {
          Swal.fire({
            icon: "error",
            title: "Please select the checkbox",
            toast: true,
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      });
    });
    const printPackageCode = (rowData) => {
      // Extract necessary details from the row data
      const { package_code } = rowData;
      const qr = QRCode(0, "M");
      qr.addData(package_code);
      qr.make();

      // Get QR code SVG data
      const svgData = qr.createSvgTag({
        cellSize: 1,
        margin: 0,
        scalable: true,
      });
      svgData;
      console.log("fjdkfjkljlj", svgData);
    };

    const allRowsSelected = computed(() => {
      return selectedRows.value.length === props.tableData.length;
    });

    watch(allRowsSelected, (newValue) => {
      selectAll.value = newValue; // Update the selectAll value based on allRowsSelected
    });

    // Watch for changes in the selectAll value
    watch(selectAll, (newValue) => {
      if (!newValue) {
        selectedRows.value = []; // Deselect all rows if selectAll is false
      } else {
        selectedRows.value = [...props.tableData]; // Select all rows if selectAll is true
      }
    });
    const viewDetails = (data) => {
      emit("viewDetails", data);
    };
    const qrCodesArray = ref([]);
    const getQrcodePath = (svgData) => {
      const image = new Image();
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      return new Promise((resolve, reject) => {
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          const imagePath = canvas.toDataURL(); // Retrieve the image path
          resolve(imagePath);
        };

        image.onerror = (error) => {
          reject(error);
        };

        image.src = "data:image/svg+xml;base64," + btoa(svgData);
      });
    };
    return {
      selectedRows,
      selectAll,
      viewDetails,
      show_qr_code,
      printPackageCode,
      qrCodesArray,
      getQrcodePath,
      generateSVG,
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
.swal-toast-custom-class {
  position: relative;
  top: 50px;
}
.qr_codes svg {
  width: 200px !important;
}
</style>


