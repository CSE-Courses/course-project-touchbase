<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col>
          <v-alert v-if="registerSuccess" type="success"
            >Your account has been created successfully!</v-alert
          >
          <v-alert v-if="registerFail" type="error"
            >Account creation has failed! Please contact an administrator for assistance.</v-alert
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
            hint="At least 8 characters"
            counter
            required
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-col>
      <v-btn id="register" depressed color="secondary" @click="submit">Register</v-btn>
    </v-col>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import api from "../api";

const usersService = api.service("users");

@Component
export default class Register extends Vue {
  email = "";

  password = "";

  registerSuccess = false;

  registerFail = false;

  show1 = false;

  async submit() {
    try {
      await usersService.create({
        email: this.email,
        password: this.password,
      });

      this.registerSuccess = true;
      this.registerFail = false;
    } catch (e) {
      // TODO: Display the error
      this.registerFail = true;
    }
  }
}
</script>
