<template>
  <v-card>
    <v-expansion-panels accordion multiple focusable hover>
      <v-expansion-panel>
        <v-expansion-panel-header>Color Settings</v-expansion-panel-header>
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

@Component({
  components: { ColorSettings },
})
export default class SettingsMenu extends Vue {}
</script>
