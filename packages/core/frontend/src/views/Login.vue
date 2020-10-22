<template>
  <v-dialog max-width="400" value="true" persistent>
    <v-card>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col>
              <v-alert v-if="loginSuccess" type="success"
                >Your account has been authenticated successfully!</v-alert
              >
              <v-alert v-if="loginFail" type="error"
                >Account login has failed! Please check your login credentials.</v-alert
              >
              <v-text-field id="email" v-model="email" label="E-mail" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                required
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-col>
          <v-btn id="login" depressed color="secondary" @click="submit">Login</v-btn>
        </v-col>
      </v-form>
      <v-btn id="create" block text to="/register">Create Account</v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import api from "../api";
import router from "../router";

@Component
export default class Login extends Vue {
  email = "";

  password = "";

  loginSuccess = false;

  loginFail = false;

  show1 = false;

  async submit() {
    try {
      await api.authenticate({
        strategy: "local",
        email: this.email,
        password: this.password,
      });

      this.loginSuccess = true;
      this.loginFail = false;
      await router.go(0);
    } catch {
      this.loginFail = true;
    }
  }
}
</script>
