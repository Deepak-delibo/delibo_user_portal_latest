<template>
  <q-card class="my-card text-white login_card">
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
          outlined
          v-model="name"
          label="Username*"
          autocomplete="Username"
          lazy-rules
          dense
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Username must be at least 6 characters long',
            (val) =>
              /^[a-zA-Z0-9]+$/.test(val) ||
              'Username can only contain letters and numbers',
          ]"
        />
        <q-input
          outlined
          v-model="password"
          class="q-mt-md"
          label="Password *"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          lazy-rules
          dense
          :rules="[
            (val) =>
              (val && val.length >= 8) ||
              'Password must be at least 8 characters long',
            (val) =>
            /^(?=.*[0-9])/.test(val) || 'Password must contain at least one number',

            (val) =>
            /^(?=.*[!@#\$%\^&\*_\-=+])/.test(val) ||
              'Password must contain at least one special character',
              (val) =>
              (val) => /^(?=.*[a-zA-Z])/.test(val) ||
              'Password must contain at least one letter',
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

        <div class="text-center q-mt-md">
          <q-btn label="Login" type="submit" class="full-width" color="primary" />

          <!-- <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />-->
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script>
import { signIn } from "aws-amplify/auth";
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const name = ref(null);
    const password = ref(null);
    const accept = ref(false);
    const onSubmit = async () => {
      if (accept.value !== true) {
        try {
          const { isSignedIn, nextStep } = await signIn({
            username: name.value,
            password: password.value,
          });
          // console.log(isSignedIn);
          console.log(nextStep);
          localStorage.setItem("userName", name.value);
          if (
            nextStep.signInStep == "NEW_PASSWORD_REQUIRED"
          ) {
            router.push({ name: "reset-password" });
          }
        } catch (error) {
          console.log("error signing in", error);
        }
      }
    };

    const onReset = () => {
      name.value = null;
      password.value = null;
    };
    return {
      name,
      password,
      accept,
      showPassword,
      togglePasswordVisibility,
      onSubmit,
      onReset,
    };
  },
};
</script>
<style>
.login_card {
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
  .login_card {
    width: 90%; /* Adjust width for smaller screens */
  }
}
</style>
