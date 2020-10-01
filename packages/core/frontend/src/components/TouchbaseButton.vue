<template>
  <div>
    <v-menu :close-on-content-click="dialog" offset-y="50">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar id="Logo" rounded v-bind="attrs" v-on="on">
          <v-img alt="TouchBase Logo" src="../assets/logo.svg" transition="scale-transition" />
        </v-avatar>
      </template>
      <v-card min-width="250">
        <AccountPopup></AccountPopup>
        <SettingsMenu></SettingsMenu>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SettingsMenu from "./SettingsMenu.vue";
import AccountPopup from "./AccountPopup.vue";

@Component({
  components: { AccountPopup, SettingsMenu },
})
export default class TouchbaseButton extends Vue {
  dialog = false;
}
</script>
