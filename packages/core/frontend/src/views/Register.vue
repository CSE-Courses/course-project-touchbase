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
      <v-btn id="existing" block text to="/login">Use Existing Account</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "Register",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      email: "",
      password: "",
      registerSuccess: false,
      registerFail: false,
      show1: false,
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
          vm.registerFail = false;
          router.push("/login");
        })
        .catch(function res() {
          vm.registerFail = true;
        });
    },
  },
};
</script>
