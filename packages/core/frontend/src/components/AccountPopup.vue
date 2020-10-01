<template>
  <v-dialog max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-col>
        <v-btn id="accounts" icon v-bind="attrs" v-on="on"> <v-icon large>mdi-account</v-icon> </v-btn>
      </v-col>
    </template>
    <v-card>
      <Login v-if="status"></Login>
      <v-btn id="create" block v-if="status" text @click="status = false">Create Account</v-btn>
      <Register v-if="!status"></Register>
      <v-btn id="existing" block v-if="!status" text @click="status = true">Use Existing Account</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Login from "./Login.vue";
import Register from "./Register.vue";

@Component({
  components: { Register, Login },
})
export default class AccountPopup extends Vue {
  status = true;
}
</script>
