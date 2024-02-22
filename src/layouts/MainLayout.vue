<template>
  <q-layout view="lHh Lpr lff">
    <q-header>
      <q-toolbar class="bg-white" style="height: 65px">
        <q-btn
          flat
          dense
          v-if="!leftDrawerOpen"
          round
          class="text-primary"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-btn
          v-else
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-primary text-weight-bold">{{
          active_route
        }}</q-toolbar-title>
        <div>
          <q-btn
            dense
            color="primary"
            round
            icon="notifications"
            class="q-mx-sm"
          >
            <q-badge color="red" floating>4</q-badge>
          </q-btn>
          <q-btn flat >
            <q-avatar color="primary" text-color="white">J</q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :breakpoint="800" bordered>
      <div class="q-py-md q-mx-md text-center">
        <img
          src="images/delibo.svg"
          loading="lazy"
          alt="Delibo Logo"
          height="75"
        />

        <div class="text-center text-weight-bolder text-h6 text-primary">
          DELIBO
        </div>
        <div class="text-center text-weight-bolder text-h6 text-primary">
          B2B
        </div>
      </div>
      <q-list>
        <sideBarItems :sideBardata="sideBardata" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <q-dialog v-model="confirmLogout" persistent width="350">
          <q-card class="logout-dialog">
            <q-card-section class="row items-center">
              <span class="q-ml-sm text-bold text-subtitle1"
                >Are you sure want to logout?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="No" color="primary" v-close-popup />
              <q-btn
                flat
                label="Yes, Logout"
                color="primary"
                @click="logout"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div class="main_container">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import sideBarItems from "../SideBar/sideBarItems.vue";
import BarLists from "../SideBar/sideBar.js";
import { useRoute } from "vue-router";

export default {
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const confirmLogout = ref(false);
    const active_route = ref(null);
    const sideBardata = ref([
      {
        title: "DashBoard",
        path: "/adminDashboard",
      },
      {
        title: "Caller Dashboard",
        path: "/callerDashboard",
      },
      {
        title: "My Attendance",
        path: "/call",
      },
      {
        title: "Settings",
        path: "/course",
      },
      {
        title: "MobilePage",
        path: "/mobilePage",
      },
      {
        title: "Leads",
        path: "/leadDetails",
      },
    ]);
    const route = useRoute();
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const logout = () => {
      // Implement logout logic
      console.log("Logout");
    };

    onMounted(() => {
      // Assign sidebar data from BarLists to sideBardata
      sideBardata.value = BarLists;
      active_route.value = route.name;
      console.log("jfkdkjfdkfjs", route.name);
    });
    watch(
      () => route.name,
      (newValue, oldValue) => {
        active_route.value = newValue;
      }
    );
    return {
      leftDrawerOpen,
      confirmLogout,
      active_route,
      sideBardata,
      toggleLeftDrawer,
      logout,
    };
  },
  components: {
    sideBarItems,
  },
};
</script>

<style scoped>
.logout-dialog {
  width: 350px;
}
.main_container {
  min-height: 86vh;
  margin-top: 50px;
  padding: 20px;
  background: #ffffff;
  object-fit: fill;
}
</style>
