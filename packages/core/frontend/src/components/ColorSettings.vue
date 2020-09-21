<template>
  <div>
    <v-dialog v-model="dialog" top persistent max-width="300">
      <template v-slot:activator="{ on, attrs }">
        Primary Color: <v-btn color="primary" depressed rounded v-bind="attrs" v-on="on"></v-btn>
      </template>
      <v-card>
        <v-color-picker
          v-model="color"
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
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      swatch: false,
      height: 500,
      dialog: false,
      color: "primary",
    };
  },
  computed: {
    showColor() {
      return this.color;
    },
  },
  methods: {
    writeColor() {
      this.dialog = false;
      this.$vuetify.theme.themes.light.primary = this.color;
    },
  },
});
</script>
