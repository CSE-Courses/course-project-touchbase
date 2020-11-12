<template>
  <v-dialog max-width="400" value="true" persistent>
    <v-card>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col>
              <v-alert v-if="registerSuccess" type="success"
                >Your account has been created successfully!</v-alert
              >
              <v-alert v-if="registerFail" type="error"
                >Account creation has failed! Please contact an administrator for
                assistance.</v-alert
              >
              <v-text-field
                id="email"
                v-model="email"
                label="E-mail"
                :rules="emailRules"
                required
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
                hint="At least 8 characters"
                counter
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
            id="register"
            depressed
            color="primary"
            :loading="loading"
            :disabled="!(password.length >= 8 && /.+@.+/.test(email))"
            @click="submit"
            >Register</v-btn
          >
        </v-col>
      </v-form>
      <v-btn id="existing" block text to="/login">Use Existing Account</v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import api from "@/api";

const usersService = api.service("users");

@Component
export default class Register extends Vue {
  email = "";

  password = "";

  registerSuccess = false;

  registerFail = false;

  show1 = false;

  loading = false;

  emailRules = [
    (v: string): string | boolean => !!v || "E-mail is required",
    (v: string): string | boolean => /.+@.+/.test(v) || "E-mail must be valid",
  ];

  passwordRules = [
    (v: string): string | boolean => !!v || "Password is required",
    (v: string): string | boolean => v.length >= 8 || "Password must be more than 8 characters",
  ];

  async submit(): Promise<void> {
    this.loading = true;
    try {
      await usersService.create({
        email: this.email,
        password: this.password,
      });

      this.registerSuccess = true;
      this.registerFail = false;
      await this.$router.push("/login");
    } catch (e) {
      // TODO: Display the error
      this.registerFail = true;
    }
    this.loading = false;
  }
}
</script>
