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
              <v-text-field
                id="email"
                v-model="email"
                label="E-mail"
                required
                :rules="emailRules"
                @keydown.enter="submit"
              ></v-text-field>
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
                :rules="passwordRules"
                @click:append="show1 = !show1"
                @keydown.enter="submit"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-col>
          <v-btn
            id="login"
            depressed
            color="primary"
            :disabled="!(password.length >= 8 && /.+@.+/.test(email))"
            :loading="loading"
            @click="submit"
            >Login</v-btn
          >
        </v-col>
      </v-form>
      <v-btn id="create" block text to="/register">Create Account</v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import api from "@/api";

@Component
export default class Login extends Vue {
  email = "";

  password = "";

  loginSuccess = false;

  loginFail = false;

  show1 = false;

  loading = false;

  emailRules = [
    (v: string): string | boolean => !!v || "E-mail is required",
    (v: string): string | boolean => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  passwordRules = [(v: string): string | boolean => !!v || "Password is required"];

  async submit(): Promise<void> {
    this.loading = true;
    try {
      await api.authenticate({
        strategy: "local",
        email: this.email,
        password: this.password,
      });
      this.loginSuccess = true;
      this.loginFail = false;
      await this.$router.push("/app");
    } catch {
      this.loginFail = true;
    }
    this.loading = false;
  }
}
</script>
