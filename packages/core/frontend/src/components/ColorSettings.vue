<template>
  <div>
    <v-row>
      <v-col>
        <v-switch v-model="$vuetify.theme.dark" label="Dark Mode" @click="save"></v-switch>
      </v-col>
      <v-col>
        <v-row>
          <ColorPicker name="Primary Color" color="primary" dark="light" @save="save"></ColorPicker>
        </v-row>
        <v-row>
          <ColorPicker name="Secondary Color" color="secondary" @save="save"></ColorPicker>
        </v-row>
        <v-row>
          <ColorPicker name="Accent Color" color="accent" @save="save"></ColorPicker>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ColorPicker from "@/components/ColorPicker.vue";
import api from "../api";

const settingsService = api.service("settings");
@Component({
  components: { ColorPicker },
})
export default class ColorSettings extends Vue {
  swatch = false;

  height = 500;

  dialog = false;

  color = this.$vuetify.theme.themes.light.primary;

  async save(): Promise<void> {
    const user = await api.get("authentication");
    await settingsService.patch(
      null,
      {
        darkmode: this.$vuetify.theme.dark,
        color: JSON.stringify(this.$vuetify.theme.themes),
        ownerID: user.user.id,
      },
      {
        query: {
          ownerID: user.user.id,
        },
      }
    );
  }
}
</script>
