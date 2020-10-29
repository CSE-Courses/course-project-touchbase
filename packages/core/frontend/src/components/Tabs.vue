<template>
  <div>
    <v-tabs background-color="primary">
      <v-tab to="/app/browse" text outlined rounded>
        <span>Browse</span>
      </v-tab>

      <v-tab to="/app/calendar" text outlined rounded>
        <span>Calendar</span>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {}
</script>
