<template>
  <div class="input-parent-container" :class="isHalfSize ? 'half' : ''">
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
        type="text"
        :name="autoCompleteName"
        :autocomplete="autoCompleteName"
        :dark="$q.dark.isActive"
        :placeholder="placeholder"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  data() {
    return {
      textValue: ""
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
    readonly: {
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
    isHalfSize: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  },
};
</script>

<style>
</style>
