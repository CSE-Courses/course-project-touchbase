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
    <v-btn @click="submit">Login</v-btn>
    <v-alert v-if="loginSuccess" type="success"
      >Your account has been authenticated successfully!</v-alert
    >
    <v-alert v-if="loginFail" type="error"
      >Account login has failed! Please check your login credentials.</v-alert
    >
  </v-form>
</template>

<script>
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:3030");
const app = feathers();

// Setup the transport (Rest, Socket, etc.) here
app.configure(socketio(socket));

// Available options are listed in the "Options" section
app.configure(
  auth({
    storageKey: "auth",
  })
);

export default {
  name: "Login",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  data() {
    return {
      email: "",
      password: "",
      loginSuccess: false,
      loginFail: false,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    submit() {
      app
        .authenticate({
          strategy: "local",
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.loginSuccess = true;
        })
        .catch(() => {
          this.loginFail = true;
        });
    },
  },
};
</script>

<style scoped></style>
