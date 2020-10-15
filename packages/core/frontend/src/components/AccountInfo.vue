<template>
  <v-dialog max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-col>
        <v-btn id="accounts" icon v-bind="attrs" v-on="on">
          <v-icon large>mdi-account</v-icon>
        </v-btn>
        <v-btn text @click="logout2()">Logout</v-btn>
      </v-col>
    </template>
    <v-card> </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
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

@Component({})
export default class AccountInfo extends Vue {
  logout2(): void {
    app.logout().then(() => {
      this.$router.push("/login");
    });
  }
}
</script>
