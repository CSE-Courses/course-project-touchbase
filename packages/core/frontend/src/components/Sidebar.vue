<template>
  <div>
    <v-navigation-drawer
      v-model="toggle"
      app
      color="secondary"
      absolute
      dark
      clipped
      transition
      open-on-click
      activatable
    >
      <v-subheader>List Views</v-subheader>
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item to="/app/browse">
            <v-list-item-icon>
              <v-icon>mdi-folder-multiple</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Browse</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/app/calendar">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Calendar</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Sidebar extends Vue {
  @Prop() toggle!: boolean;
}
</script>
