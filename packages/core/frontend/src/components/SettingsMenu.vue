<template>
  <v-card>
    <v-expansion-panels accordion multiple focusable hover>
      <v-expansion-panel>
        <v-expansion-panel-header id="AccountSettings">Account Settings</v-expansion-panel-header>
        <v-expansion-panel-content> TODO </v-expansion-panel-content>
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
import AccountPopup from "./AccountPopup.vue";

@Component({
  components: { AccountPopup, ColorSettings },
})
export default class SettingsMenu extends Vue {}
</script>
