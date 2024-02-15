<template>
  <div>
    <q-item class="q-mx-md q-my-sm"
      clickable
      v-for="item in actual_side_bar"
      :key="item.path"
      :class="{ 'red--text': isActiveItem(item.path) }"
      @click="navigateTo(item.path)"
    >
      <q-item-section v-if="item.icon" avatar class="q-mx-none q-px-none q-py-none">
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import ApiServices from "./../SideBar/accessControl";

export default {
  data() {
    return {
      actual_side_bar: [],
      isOnline: navigator.onLine,
      sidebarItems: [
        {
          title: "DashBoard",
          path: "/dashboard",
          icon:"dashboard"

        },
        {
          title: "Permission",
          path: "/permission",
          icon:"key"
        },
        {
          title: "Booking",
          path: "/booking",
          icon:"bookmarks"
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
      this.actual_side_bar = this.sidebarItems.filter(item =>
        ApiServices.checkSideBarItems(item.title)
      );
    },
    navigateTo(path) {
      this.$router.push(path);
    },
    isActiveItem(path) {
      return this.$route.path === path;
    },
    updateOnlineStatus() {
      this.isOnline = navigator.onLine;
      console.log("check internet connection", this.isOnline);
      if (!this.isOnline) {
        this.$router.push("/nointernet");
      }
    },
  },
};
</script>

<style >
.red--text {
  background: #EF9105;
  border-radius: 4px;
  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 10px;
}
.active-item {
  /* Define your active item styles here */
  background-color: #2a4365; /* Example background color */
  color: #ffffff; /* Example text color */
}
.q-item__section--avatar{
  min-width: 34px !important;

}
.q-item {
    min-height: 28px !important;
    padding-block: 5px !important;
}
</style>
