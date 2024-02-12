<template>
  <div>
    <router-view class="common-bg" />
    <!-- <full-screen-loader /> -->
    <overlay-models v-if="showOverlay" />
    <q-scroll-observer @scroll="handleScroll" :threshold="[0, 5]"></q-scroll-observer>
    <div class="fixed-bottom-right q-pa-xl delay scroll" v-show="scrollDown">
      <q-btn round color="primary" icon="navigation" @click="myFunction()" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "App",
  components: {
    // FullScreenLoader: defineAsyncComponent(() =>
    //   import("src/components/OverlayModels/FullScreenLoader.vue")
    // ),
    // OverlayModels: defineAsyncComponent(() =>
    //   import("src/components/OverlayModels/OverlayModels.vue")
    // )
  },
  data() {
    return {
      scrollDown: false
    };
  },

  computed: {
    // showOverlay: {
    //   get() {
    //     return this.$store.getters.showOverlay;
    //   },
    //   set(value) {
    //     this.$store.dispatch("setShowOverlay", value);
    //   }
    // }
  },
  mounted() {
    // this.storeCurrentSessionID();
    // console.log("Subscribing to keep alive processed");
    // this.$store.dispatch("subscribeToTopic", {
    //   topic: "delibo/lastKeepAliveReceived",
    //   callBackActionName: "lastKeepAliveReceived"
    // });
    // this.$store.dispatch("getAllDeliboLocations");
  },
  methods: {
    myFunction() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    handleScroll(event) {
      this.scrollDown = event.position.top >= 50 ? true : false;
    },
    storeCurrentSessionID() {
      var idFromStorage = sessionStorage.getItem("ID_KEY");
      if (idFromStorage == null) {
        const id = uuidv4(); // generate unique UUID
        sessionStorage.setItem("ID_KEY", id);
        idFromStorage = id;
      }
      // this.$store.commit("setCurrentSessionID", idFromStorage);
    }
  }
};
</script>
<style>
.bg-color-set {
  background-color: rgb(126 98 30 / 12%);
}
.q-page-container {
  padding-top: 20px !important;
}
.q-page {
  min-height: 100% !important;
}

.table-header tr th {
  background: #ef9105;
  color: white;
  font-size: 16px !important;
}
tr td {
  border-left: 0px !important;
  border-right: 0px !important;
  font-size: 16px !important;
}
table {
  border: 0px;
}
.q-table__card {
  border: 0px !important;
}
.bg-custom-color {
  background: rgba(0, 0, 0, 0.05) !important;
  color: black !important;
}
.bg-custom-color .q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
  color: black !important;
}
.bg-custom-color .q-icon {
  color: black !important;
}

.common-bg {
  background: hsla(0, 0%, 90.7%, 0.93) !important;
}
.q-card {
  border-radius: 12px;
}

/* scroll bar -- custom */

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ef9105;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ef9105;
}
.admin-title-heading-text {
  padding-bottom: 10px;
  font-size: 24px;
  line-height: 1;
  font-weight: 600;
  text-align: left;
  letter-spacing: -0.5px;
  cursor: default;
}
</style>
