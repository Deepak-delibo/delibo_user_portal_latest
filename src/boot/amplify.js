import { Amplify } from 'aws-amplify';
import config from '../../src/amplifyconfiguration.json';
Amplify.configure(config);


// import { Auth } from "@aws-amplify/auth";
// import { Amplify, PubSub } from "aws-amplify";
// import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
// import AwsExports from "../aws-exports";
// import { Iot } from "aws-sdk";
// import AWS from "aws-sdk";

// Amplify.configure(AwsExports);
// Auth.configure(AwsExports);

// let newAmplifyConfig = {
//   Auth: {
//     mandatorySignIn: true,
//   },
// };
// Amplify.configure(newAmplifyConfig);

// console.log("Pubsub:", PubSub);

// const Amplify2 = AWS.Amplify;

// console.log("%c Amplify:", "background: #000000; color: #ffffff", Amplify);
// console.log("%c Amplify2:", "background: #000000; color: #ffffff", Amplify2);

// // TODO: Change IoT endpoint

// // TODO: "amplify pull <app-id>" to pull your existing Amplify project. Find the <app-id> in the AWS Console or Amplify Admin UI (From ARN starts with 'd')

// PubSub.addPluggable(
//   new AWSIoTProvider({
//     aws_pubsub_region: "ap-south-1",
//     aws_pubsub_endpoint:
//       "wss://a1jeezsyjov2le-ats.iot.ap-south-1.amazonaws.com/mqtt",
//   })
// );

// async function addPolicy() {
//   return new Promise(async (resolve, reject) => {
//     console.log("Add policy:");
//     Auth.currentCredentials()
//       .then(async (credentials) => {
//         try {
//           console.log("Credentials:", credentials);
//           if (!credentials.identityId) {
//             console.log("No credentials");
//             resolve();
//           }

//           const iot = new Iot({
//             region: "ap-south-1",
//             credentials: Auth.essentialCredentials(credentials),
//           });

//           const target = credentials.identityId;
//           const policyName = "IoT-test-policy";

//           const { policies } = await iot
//             .listAttachedPolicies({ target })
//             .promise();

//           console.log("Policies:", policies);

//           let policyFound = false;

//           if (policies.some((e) => e.policyName === policyName)) {
//             console.log("Policy found:");
//             policyFound = true;
//           }
//           console.log("Policy found:", policyFound);

//           if (policyFound) {
//             resolve();
//           } else {
//             const cognitoIdentityId = credentials.identityId;
//             console.log("Identity id:", cognitoIdentityId);

//             // CLI to attach policy
//             //  aws iot attach-policy --policy-name 'IoT-test-policy' --target 'ap-south-1:9f2b74d3-dce0-444c-969b-6c4026dd0078'
//             //  aws iot detach-policy --policy-name 'IoT-test-policy' --target 'ap-south-1:48e596d6-020b-49ae-87be-ad75e3d8f276'
//             await iot.attachPolicy({ policyName, target }).promise();
//             resolve();
//           }
//         } catch (error) {
//           console.log("Error:", error);
//           reject();
//         }
//       })
//       .catch((err) => {
//         console.log("Error:", err);
//         reject();
//       });
//   });
// }

// export default async ({ router, store, app }) => {
//   var globalProperties = app.config.globalProperties;
//   globalProperties.$Auth = Auth;
//   globalProperties.$Amplify = Amplify;
//   globalProperties.$PubSub = PubSub;
//   store.dispatch("setPubSubObject", PubSub);
//   globalProperties.$addIotPolicy = addPolicy;

//   console.log("Adding policy");
//   try {
//     await addPolicy();
//   } catch (error) {
//     console.log("Error:", error);
//   }
//   console.log("Resuming flow");

//   router.afterEach((to, from) => {
//     console.log("After each:", to, from);
//     store.dispatch("setCurrentRoute", to);
//     // store.commit('SET_ROUTE', to);
//   });

//   await router.beforeResolve((to, from, next) => {
//     store.dispatch("setShowFullScreenLoader", true);
//     console.log("Before resolve from:", from);
//     console.log("Before resolve to:", to);

//     closeAllOverlaysBeforRouterEnter();
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       // globalProperties.$q.loading.show();

//       globalProperties.$Auth
//         .currentAuthenticatedUser({ bypassCache: true })
//         .then(async (data) => {
//           console.log("Data:", data);

//           let userRoles =
//             data.signInUserSession.idToken.payload["cognito:groups"];
//           let pageRoles = to.meta.roles;

//           console.log("User roles:", userRoles);
//           console.log("Page roles:", pageRoles);

//           store.dispatch("setUserRoles", userRoles);
//           console.log("User pool id: ", data.pool.userPoolId);
//           store.dispatch("setUserPoolId", data.pool.userPoolId);

//           // Check if user has access to page
//           if (pageRoles.length > 0) {
//             if (userRoles.some((e) => pageRoles.includes(e))) {
//               console.log("User has access to page");
//             } else {
//               console.log("User does not have access to page");
//               next({ path: "/" });
//             }
//           }

//           if (data && data.signInUserSession) {
//             if (!store.getters.appFirstRun) {
//               console.log("First run resolve:");
//               store.dispatch("setShowFullScreenLoader", false);
//               next();
//               // store.dispatch("solveNextLogic", { to, from, next });
//               return;
//             }
//             console.log(
//               "%c First run:",
//               "background: #000000; color: #ffffff",
//               store.getters.appFirstRun
//             );

//             if (!store.getters.user) {
//               let pk = `a_${data.username}`;
//               let sk = `a_${data.username}`;
//               let inputData = {
//                 pk: pk,
//                 sk: sk,
//               };

//               await store.dispatch("getUserDetails", inputData);
//             }

//             /* Used to identify the user in logrocket. */
//             /* LogRocket.identify(data.attributes.sub, {
//               email: data.attributes.email,
//               phone_number: data.attributes.phone_number,
//             }); */

//             // globalProperties.$q.loading.hide();
//             /*  console.log("Show full screen loader:",);
//              store.dispatch("setShowFullScreenLoader", true)

//              await store.dispatch("setShowFullScreenLoader", false) */

//             await store.dispatch("setShowFullScreenLoader", false);
//             store.dispatch("setCurrentRouteInSidepane", to.fullPath);
//             store.dispatch("setCurrentRouteInBottomTabpane", to.fullPath);
//             store.dispatch("setAppFirstRun", false);
//             next();
//             // store.dispatch("solveNextLogic", { to, from, next });
//           }
//         })
//         .catch((e) => {
//           // globalProperties.$q.loading.hide();
//           store.dispatch("setShowFullScreenLoader", false);
//           console.log("Catch:", e);
//           console.log("to:", to);
//           store.dispatch("setNextPath", to.fullPath);
//           console.log("Next path:", store.getters.nextPath);
//           store.dispatch("setCurrentRoute", "/auth/login");
//           next({
//             path: "/auth/login",
//           });
//           // globalProperties.$q.loading.hide();
//         });
//     } else {
//       store.dispatch("setShowFullScreenLoader", false);
//       next();
//       // store.dispatch("solveNextLogic", { to, from, next });
//     }
//   });
//   function closeAllOverlaysBeforRouterEnter() {
//     const popups = [
//       "setShowOverlay",
//       "setShowAddNewAdminUserOverlay",
//       "setShowEditAdminUserOverlay",
//       "setShowAddNewWarehouseLocationOverlay",
//       "setShowEditWarehouseLocationOverlay",
//       "setShowFactoryConfigAddNewConfigOverlay",
//       "setShowSwitchWarehouseOverlay",
//       "setShowaddPrivateDeliboOverlay",
//       "setNewFaqTitleOverlay",
//       "setNewFaqOverlay",
//       "setShowSwitchDefaultedLocationOverlay",
//       "setShowSwitchLocationOverlay",
//       "setShowManageHmiUserOverlay",
//       "setShowManageLocationOverlay",
//       "setShowCreateNewLocationOverlay",
//       "setShowSwitchConfigOverlay",
//       "setShowAddB2BAdminOverlay",
//     ];
//     popups.forEach((val) => {
//       store.dispatch(val, false);
//     });
//   }
// };

// export { Auth };
