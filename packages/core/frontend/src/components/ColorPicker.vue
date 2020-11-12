<template>
  <v-dialog v-model="dialog" top max-width="300" @click:outside="writeColor">
    <template v-slot:activator="{ on, attrs }">
      <v-row>
        <v-col sm="3">
          {{ name }}
        </v-col>
        <v-col>
          <v-btn :color="color" rounded v-bind="attrs" v-on="on"></v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card>
      <v-color-picker
        v-model="model"
        :value="model"
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ColorPicker extends Vue {
  @Prop() name!: string;

  @Prop() color!: string;

  swatch = false;

  height = 500;

  dialog = false;

  model = this.$vuetify.theme.themes[this.darkOrLight()][this.color];

  darkOrLight(): "dark" | "light" {
    if (this.$vuetify.theme.dark) {
      return "dark";
    }
    return "light";
  }

  writeColor(): void {
    this.dialog = false;
    this.$vuetify.theme.themes[this.darkOrLight()][this.color] = this.model;
    this.$emit("save");
  }
}
</script>
