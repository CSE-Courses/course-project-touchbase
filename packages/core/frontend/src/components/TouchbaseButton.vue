<template>
  <div>
    <v-dialog v-model="dialog" persistent fullscreen>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar rounded v-bind="attrs" v-on="on">
          <v-img alt="TouchBase Logo" src="../assets/logo.svg" transition="scale-transition" />
        </v-avatar>
      </template>
      <v-app-bar color="primary">
        <v-btn text icon color="background" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
      <SettingsMenu></SettingsMenu>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SettingsMenu from "./SettingsMenu.vue";

export default Vue.extend({
  name: "TouchbaseButton",
  components: { SettingsMenu },
  data() {
    return {
      dialog: false,
    };
  },
});
</script>
