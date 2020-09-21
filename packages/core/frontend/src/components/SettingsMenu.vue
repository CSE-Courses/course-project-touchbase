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
import ColorSettings from "./ColorSettings.vue";

export default {
  components: { ColorSettings },
  data(): { dialog: boolean; notifications: boolean; sound: boolean; widgets: boolean } {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
    };
  },
};
</script>
