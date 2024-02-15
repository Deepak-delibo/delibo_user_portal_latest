const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PieChart.vue'), meta: { requiresAuth: false } },
      { path: '/dashboard',name:"Dashboard", component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: false } },
      { path: '/permission',name:"Permission", component: () => import('pages/PermissionPage.vue'), meta: { requiresAuth: false } },
      { path: '/booking',name:"Booking", component: () => import('pages/BookingPage.vue'), meta: { requiresAuth: false } }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'resetPassword',name:"reset-password", component: () => import('pages/ResetPassword.vue') },
      // other admin routes
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;

