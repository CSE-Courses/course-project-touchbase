<template>
  <div>
    <v-dialog v-model="dialog" top persistent max-width="300">
      <template v-slot:activator="{ on, attrs }">
        Primary Color: <v-btn :color="color" rounded v-bind="attrs" v-on="on"></v-btn>
      </template>
      <v-card>
        <v-color-picker
          v-model="color"
          :value="color"
          :show-swatches="swatch"
          :hide-canvas="swatch"
          :hide-inputs="swatch"
          swatches-max-height="500"
          mode="hexa"
          canvas-height="250"
        ></v-color-picker>
        <v-card-actions>
          <v-btn text @click.stop="swatch = !swatch">
            <v-icon>mdi-palette</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="writeColor">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ColorSettings extends Vue {
  swatch = false;

  height = 500;

  dialog = false;

  color = this.$vuetify.theme.themes.light.primary;

  showColor() {
    return this.color;
  }

  writeColor() {
    this.dialog = false;
    this.$vuetify.theme.themes.light.primary = this.color;
  }
}
</script>
