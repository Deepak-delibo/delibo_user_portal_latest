const routes = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: '', component: () => import('pages/IndexPages.vue'),
        meta: {
          requiresAuth: true
        }
      },
      // {
      //   path: '/customer', component: () => import('pages/Customer.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: '/customer_details/:customerid?', component: () => import('pages/CustomerDetails.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: '/expired_delibos', component: () => import('pages/ExpiredDelibos.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // },
      // {
      //   path: '/unoccupied_delibos', component: () => import('pages/UnoccupiedDelibos.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // }
    ]
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/LoginPage.vue") },
      // { path: "register", component: () => import("pages/Auth/Register.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    // component: () => import("pages/Error404.vue"),
  },
];

export default routes;
