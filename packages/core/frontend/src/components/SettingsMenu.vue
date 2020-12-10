<template>
  <v-card>
    <v-expansion-panels accordion multiple focusable hover>
      <v-expansion-panel>
        <v-expansion-panel-header id="AccountSettings">Account Settings</v-expansion-panel-header>
        <v-expansion-panel-content>
          <AccountSettings></AccountSettings>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header id="ColorSettings">Color Settings</v-expansion-panel-header>
        <v-expansion-panel-content>
          <ColorSettings></ColorSettings>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ColorSettings from "./ColorSettings.vue";
import AccountPopup from "./AccountInfo.vue";
import AccountSettings from "./AccountSettings.vue";

@Component({
  components: { AccountPopup, ColorSettings, AccountSettings },
})
export default class SettingsMenu extends Vue {}
</script>
