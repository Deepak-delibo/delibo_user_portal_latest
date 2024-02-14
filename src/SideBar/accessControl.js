export default {
  checkAllowedRoutes(path) {
    let role = "caller";
    // let role = localStorage.getItem('Role')
    let allowed_admin_routes = [
      "/adminDashboard",
      "/callerDashboard",
      "/mobilePage",
      "/nointernet",
    ];
    let allowed_caller_routes = [
      "/callerDashboard",
      "/leadDetails",
      "/nointernet",
    ];
    if (role === "admin" && allowed_admin_routes.includes(path)) {
      return true;
    } else if (role === "caller" && allowed_caller_routes.includes(path)) {
      return true;
    } else {
      return false;
    }
  },
  checkSideBarItems(name) {
    let role = "caller";

    // let role = localStorage.getItem('Role');
    let allowed_admin_pages = ["DashBoard", "Leads", "MobilePage"];
    let allowed_caller_pages = ["Caller Dashboard", "Leads"];
    if (role === "admin" && allowed_admin_pages.includes(name)) {
      return true;
    } else if (role === "caller" && allowed_caller_pages.includes(name)) {
      return true;
    } else {
      return false;
    }
  },
};