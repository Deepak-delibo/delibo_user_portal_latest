<template>
  <div class="input-parent-container">
    <div class="input-label-text" :class="$addClasses(['dark-mode', 'rtl'])">
      {{ label }} <span class="highlight-span">*</span>
    </div>
    <div class="input-container full-width" :class="$addClasses(['dark-mode'])">
      <q-input
        :autofocus="autofocus"
        :input-class="{ 'text-right': $q.lang.rtl }"
        class="textInput"
        color="transparent"
        label-color="grey"
        bg-color="transparent"
        hide-bottom-space
        filled
        v-model="textValue"
        :type="isPwd ? 'password' : 'text'"
        :name="autoCompleteName"
        :autocomplete="autoCompleteName"
        :dark="$q.dark.isActive"
        :placeholder="placeholder"
      >
      <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
    </q-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  data() {
    return {
      textValue: "",
      isPwd: true
    };
  },
  watch: {
    textValue(val) {
      this.$emit("update:model-value", val);
    }
  },
  mounted() {
    console.log("Model value:", this.modelValue);
    this.textValue = this.modelValue;

  },
  props: {
    modelValue: {
      type: String,
    },
    label: {
      type: String,
      default: "",
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    autoCompleteName: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
  },
  methods: {
  },
};
</script>

<style>
</style>
