<template>
  <q-card class="my-card text-white reset_password_card">
    <div class="q-pa-md q-my-md">
      <div class="text-center">
        <img
          src="/images/delibo-logo.svg"
          loading="lazy"
          alt="delibo-logo"
          class="logo"
        />
        <p class="text-primary text-weight-bold text-h4 q-mb-none">Delibo</p>
        <p class="text-primary">Smart Lockers, Smarter Living!</p>
      </div>
      <q-form @submit="onSubmit" @reset="onReset" class="pt-2">
        <q-input
          filled
          v-model="password"
          dense
          class="q-mt-md"
          label="Password *"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          lazy-rules
          :rules="[
            (val) => (val && val.length >= 8) || 'Password must be at least 8 characters long',
            (val) => /^(?=.*[0-9])/.test(val) || 'Password must contain at least one number',
            (val) => /^(?=.*[!@#\$%\^&\*_\-=+])/.test(val) || 'Password must contain at least one special character',
            (val) => /^(?=.*[a-zA-Z])/.test(val) || 'Password must contain at least one letter',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              @click="togglePasswordVisibility"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          filled
          v-model="confirmPassword"
          class="q-mt-md"
          dense
          label="Confirm Password *"
          :type="showConfirmPassword ? 'text' : 'password'"
          autocomplete="current-password"
          lazy-rules
          :rules="[
            (val) => (val && val === password) || 'Passwords do not match',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="showConfirmPassword ? 'visibility' : 'visibility_off'"
              @click="toggleConfirmPasswordVisibility"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <div class="text-center q-mt-md">
          <q-btn label="Reset Password" class="full-width" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ApiServices from "../ApiServices";
export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);
    const password = ref(null);
    const confirmPassword = ref(null);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const toggleConfirmPasswordVisibility = () => {
      showConfirmPassword.value = !showConfirmPassword.value;
    };
    return {
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      async onSubmit() {
        if (password.value === confirmPassword.value) {
          const userName = localStorage.getItem("userName");
          alert(userName);
          try {
            let inputData = {
              Username:userName,
              Password: confirmPassword.value,
            };
            console.log("userName", userName);
            let apiPath = "orgResetPassword";
            const get_data = await ApiServices.resetUserPassword({
              inputData,
              apiPath,
            });
            console.log("Passwords match", get_data);
          } catch (error) {
            console.log("Not login .........", error);
          }

          // Proceed with your submit logic
        } else {
          console.log("Passwords do not match");
          // Show error message or handle invalid passwords
        }
      },
      onReset() {
        password.value = null;
        confirmPassword.value = null;
      },
    };
  },
};
</script>

<style>
.reset_password_card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
}
.logo {
  height: 100px;
}
/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .reset_password_card {
    width: 90%; /* Adjust width for smaller screens */
  }
}
</style>
