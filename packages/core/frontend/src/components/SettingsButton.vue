<template>
  <div>
    <v-dialog v-model="dialog" fullscreen :close-on-content-click="dialog">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <template v-slot:activator="{ on, attrs }">
        <v-btn id="settings-button" icon x-large color="accent" v-bind="attrs" v-on="on">
          <v-icon>mdi-settings</v-icon>
        </v-btn>
      </template>
      <v-card min-width="250">
        <AccountPopup></AccountPopup>
        <SettingsMenu></SettingsMenu>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SettingsMenu from "./SettingsMenu.vue";
import AccountPopup from "./AccountInfo.vue";

@Component({
  components: { AccountPopup, SettingsMenu },
})
export default class TouchbaseButton extends Vue {
  dialog = false;
}
</script>
