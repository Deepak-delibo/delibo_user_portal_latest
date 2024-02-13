<template>
  <q-layout view="lHh Lpr lFf" >
    <q-page-container class="auth-section wf-section">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AuthLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>
<style>
</style>
