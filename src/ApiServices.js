import { api } from "./boot/axios"; // Import the custom Axios instance
import axios from "axios";
export default {
  resetUserPassword() {
    return new Promise((resolve, reject) => {
        console.log("fjklsfdljdfsljfldjfal",api)
        axios
       // Use the custom Axios instance instead of axios
        .post("/your_reset_password_endpoint_here")
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
