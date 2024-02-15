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
        <q-toolbar-title class="text-primary text-weight-bold"></q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :breakpoint="500" bordered>
      <div class="q-px-xl q-py-md q-mx-md">
        <img
          src="images/delibo.svg"
          loading="lazy"
          alt="Delibo Logo"
          width="150"
          height="150"
        />

        <div class="q-px-xl q-py-md text-weight-bolder text-h6 text-primary">
          DELIBO
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
import { ref, onMounted } from "vue";
import sideBarItems from "../SideBar/sideBarItems.vue";
import BarLists from "../SideBar/sideBar.js";
// Icons from https://fonts.google.com/icons?icon.set=Material+Icons

export default {
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const confirmLogout = ref(false);
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
    });

    return {
      leftDrawerOpen,
      confirmLogout,
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
.main_container{
  margin-top: 50px;
}
</style>
