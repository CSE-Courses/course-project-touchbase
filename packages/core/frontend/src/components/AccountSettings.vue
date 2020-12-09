<template>
  <div>
    <b>User ID: </b>{{ uid }}<br>
    <b>Email: </b>{{ email }}<br>
    <v-btn
      id="cpw"
      depressed
      color="primary"
      @click="cpwdialog = !cpwdialog"
      >Change Password</v-btn
    >
    <v-dialog v-model="cpwdialog" max-width="400" persistent>
      <v-card>
        <v-form ref="form">
          <v-container>
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
                  @keydown.enter="changePW(email, password)"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-col>
            <v-btn
              id="changepw"
              depressed
              color="primary"
              :disabled="!(password.length >= 8)"
              @click="changePW(email, password)"
              >Change Password</v-btn
            >
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import api from "../api";

const usersService = api.service("users");

@Component
export default class AccountSettings extends Vue {
  email = "";

  uid = NaN;

  password = "";

  cpwdialog = false;

  show1 = false;

  passwordRules = [
    (v: string): string | boolean => !!v || "Password is required",
    (v: string): string | boolean => v.length >= 8 || "Password must be more than 8 characters",
  ];

  async load(): Promise<void> {
    const user = await api.get("authentication");
    let userData = await usersService.find({
      query: {
        email: user.user.email,
      },
    });
    userData = userData.data;
    // eslint-disable-next-line prefer-destructuring
    userData = userData[0];
    this.email = userData.email;
    this.uid = userData.id;
  }

  async changePW(email: string, password: string): Promise<void> {
    usersService.patch(this.uid, { password });
    this.cpwdialog = false;
  }

  mounted(): void {
    this.load();
  }
}
</script>
