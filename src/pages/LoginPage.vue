<!-- <template>
  <div class="auth-section wf-section">
    <div class="auth-container">
      <div class="auth-header">
        <div class="back-button-container">
          <img
            src="images/back-arrow.svg"
            loading="lazy"
            alt="back-button"
            class="back-button hide"
          />
        </div>
        <div class="logo-container">
          <div class="delibo-logo">DELIBO</div>
        </div>
        <div class="help-button-container"></div>
      </div>
      <div class="auth-body">
        <div class="login-container">
          <div class="heading-text centered">Admin Portal</div>
          <div v-if="!newPasswordRequired">
            <text-input
              ref="loginUsername"

              v-model="username"
              :required="true"
              :autofocus="true"
              autoCompleteName="username"
              label="Username"
              placeholder="Please enter your username"
            />
            <password-input
              ref="loginPassword"

              v-model="password"
              :required="true"
              :autofocus="false"
              autoCompleteName="password"
              label="Password"
              placeholder="Please enter your password"
            />
          </div>
          <div v-else>

            <password-input
              ref="loginNewPassword"
              v-model="newPassword"
              :required="true"
              :autofocus="true"
              autoCompleteName="password"
              label="New Password"
              placeholder="Please enter a new password"
            />
          </div>
        </div>
        <div class="auth-bottom-container">
          <div v-if="!newPasswordRequired" class="button-wrapper">
            <div  class="button-container">
              <div class="button-text">LOGIN</div>
            </div>
            <div  class="already-text">
              <span class="sign-in-span">Forgot your password?</span>
            </div>
          </div>
          <div v-else class="button-wrapper">
            <div  class="button-container">
              <div class="button-text">CHANGE PASSWORD</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AWS from "aws-sdk";

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: "ap-south-1",
});
import { defineAsyncComponent } from "vue";
export default {

  data() {
    return {
      username: "",
      password: "",
      newPasswordRequired: false,
      newPassword: "",
      authChallengeParams: {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        Session: null,
        ClientId: null,
        ChallengeResponses: null,
      },
    };
  },
  components: {
    TextInput: defineAsyncComponent(() =>
      import("components/Input/TextInput.vue")
    ),
    PasswordInput: defineAsyncComponent(() =>
      import("components/Input/PasswordInput.vue")
    ),
  },
};
</script>

<style>
</style> -->
<template>
  <q-card
    class="my-card text-white"
    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
  >
    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
      <div class="text-subtitle2">by John Doe</div>
    </q-card-section>

    <q-card-section class="q-pt-none"> lorem </q-card-section>
  </q-card>
</template>
