<template>
  <v-form ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="E-mail" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field v-model="password" label="Password" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="submit">Register</v-btn>
    <v-alert v-if="registerSuccess" type="success"
      >Your account has been created successfully!</v-alert
    >
    <v-alert v-if="registerFail" type="error"
      >Account creation has failed! Please contact an administrator for assistance.</v-alert
    >
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      email: "",
      password: "",
      registerSuccess: false,
      registerFail: false,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    submit() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const vm = this;
      axios
        .post("http://localhost:3030/users/", {
          email: vm.email,
          password: vm.password,
        })
        .then(function res() {
          vm.registerSuccess = true;
        })
        .catch(function res() {
          vm.registerFail = true;
        });
    },
  },
};
</script>

<style scoped></style>
