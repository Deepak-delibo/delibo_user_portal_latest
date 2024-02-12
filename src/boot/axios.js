import { boot } from "quasar/wrappers";
import axios from "axios";
import AwsExports from "../aws-exports";
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// TODO: Change URL of Axios
// DEV: https://i5xy7kljsi.execute-api.ap-south-1.amazonaws.com/dev/
// TEST: https://m3ljlj1ho5.execute-api.ap-south-1.amazonaws.com/test
const clientId = AwsExports.aws_user_pools_web_client_id;

const lastUser = localStorage.getItem(
  `CognitoIdentityServiceProvider.${clientId}.LastAuthUser`
);

const accessToken = localStorage.getItem(
  `CognitoIdentityServiceProvider.${clientId}.${lastUser}.accessToken`
);

const api = axios.create({
  baseURL: "https://m3ljlj1ho5.execute-api.ap-south-1.amazonaws.com/test/",
  headers: {
    Authorization: accessToken,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
