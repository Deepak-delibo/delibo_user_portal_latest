import axios from "axios";
const baseURL = "https://m3ljlj1ho5.execute-api.ap-south-1.amazonaws.com/dev";
const axiosInstance = axios.create({
  baseURL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = "your_access_token_here";
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  resetUserPassword(payload) {
    return new Promise((resolve, reject) => {
      const { inputData, apiPath } = payload;

      axios
        .post(`${baseURL}/${apiPath}`, inputData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //   resetUserPassword() {
  //     return new Promise((resolve, reject) => {
  //       axiosInstance
  //         .post("/")
  //         .then((response) => {
  //           resolve(response.data);
  //         })
  //         .catch((error) => {
  //           reject(error);
  //         });
  //     });
  //   },
};
