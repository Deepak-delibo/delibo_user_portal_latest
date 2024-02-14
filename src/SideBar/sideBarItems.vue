<template>
  <div>
    <q-item
      clickable
      tag="a"
      target="_blank"
      :href="item.path"
      v-for="item in actual_side_bar"
      :key="item.path"
      :exact-active-class="['active-item', 'bg-primary']"
    >
      <q-item-section v-if="item.icon" avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import ApiServices from "./../SideBar/accessControl";

export default {
  // props: ["sidebarItems"],
  data() {
    return {
      actual_side_bar: [],
      isOnline: navigator.onLine,
      sidebarItems: [
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
      ],
    };
  },
  mounted() {
    this.checkAllowedSidebarItems();
  },
  computed: {
    activeListItemClass() {
      return "red--text"; // Custom CSS class for active list items
    },
  },
  created() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  unmounted() {
    // using unmounted instead of destroyed
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  },
  methods: {
    checkAllowedSidebarItems() {
      console.log("find all adafjkdjfksdjk", this.sidebarItems);
      this.actual_side_bar = [];
      for (let i = 0; i < this.sidebarItems.length; i++) {
        const element = this.sidebarItems[i];
        if (ApiServices.checkSideBarItems(element.title)) {
          this.actual_side_bar.push(element);
        }
      }
    },
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
      console.log("check internet connection", this.isOnline);
      if (this.isOnline) {
        this.$router.push("/adminDashboard");
      } else {
        this.$router.push("/nointernet");
      }
    },
  },
};
</script>

<style scoped>
.red--text {
  background: #fe4a55;
  border-radius: 4px;
  color: #c41515;
  font-family: "Work Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
}
.active-item {
  /* Define your active item styles here */
  background-color: #2a4365; /* Example background color */
  color: #ffffff; /* Example text color */
}
</style>
