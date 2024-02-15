<template>
  <div class="text-capitalize flex justify-between">
    <q-btn-toggle
      v-model="add_role"
      size="md"
      toggle-color="primary"
      :options="options"
      class="text-capitalize"
    />
    <q-btn color="primary" icon="add" :label="dialog_name" size="md" @click="bar2 = true"/>
  </div>
  <q-dialog
      v-model="bar2"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="">
        <div class="flex align-center bg-primary text-white q-px-sm">
          <p class="text-h5 q-mt-sm">Add {{ dialog_name }}</p>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </div>


        <q-card-section class="q-pt-none">
          <div>

          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { ref, computed,watch } from 'vue'

export default {
  setup () {
    const bar2 =  ref(false);
    const add_role = ref('fm')
    const dialog_name = ref("Facility Manager")
    const options = computed(() => [
      {label: 'Facility Manager', value: 'fm'},
      {label: 'Feild Agent', value: 'fa'},
    ])
    watch(
      () => add_role.value,
      (newValue) => {
        if(newValue == "fa"){
          dialog_name.value = "Feild Agent"
        }else{
          dialog_name.value = "Facility Manager"
        }
      }
    );
    return {
      add_role,
      dialog_name,
      bar2,
      options,
      maximizedToggle: ref(false)

    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
