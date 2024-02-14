import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes"; // Import your routes from a separate file

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use createWebHistory for history mode
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Assuming you have some logic to check authentication, for example, checking if there is a token in local storage
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      next("/auth/login");
    } else {
      // If authenticated, proceed to the next route
      next();
    }
  } else {
    // If the route does not require authentication, proceed to the next route
    next();
  }
});

export default router;
