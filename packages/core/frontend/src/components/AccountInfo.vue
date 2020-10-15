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
import api from "../api";

@Component({})
export default class AccountInfo extends Vue {
  logout2(): void {
    api.logout().then(() => {
      this.$router.push("/login");
    });
  }
}
</script>
