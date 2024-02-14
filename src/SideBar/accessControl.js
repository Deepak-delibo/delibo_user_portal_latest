export default {
  checkAllowedRoutes(path) {
    let role = "superAdmin";
    // let role = localStorage.getItem('Role')
    let allowed_super_admin_routes = [
      "/dashboard",
      "/permission",
      "/booking",
      "/nointernet",
    ];
    let allowed_FM_routes = [
      "/dashboard",
      "/booking",
      "/nointernet",
    ];
    if (role === "superAdmin" && allowed_super_admin_routes.includes(path)) {
      return true;
    } else if (role === "facilityManager" && allowed_FM_routes.includes(path)) {
      return true;
    } else {
      return false;
    }
  },
  checkSideBarItems(name) {
    let role = "superAdmin";

    // let role = localStorage.getItem('Role');
    let allowed_super_admin_routes = ["DashBoard", "Permission", "Booking"];
    let allowed_FM_routes = ["DashBoard", "Booking"];
    if (role === "superAdmin" && allowed_super_admin_routes.includes(name)) {
      return true;
    } else if (role === "facilityManager" && allowed_FM_routes.includes(name)) {
      return true;
    } else {
      return false;
    }
  },
};
