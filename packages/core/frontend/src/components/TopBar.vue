<template>
  <div>
    <v-app-bar app color="primary" flat dark clipped-left clipped-right>
      <Tabs></Tabs>
      <v-spacer></v-spacer>
      <TouchbaseButton></TouchbaseButton>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "./Tabs.vue";
import TouchbaseButton from "./TouchbaseButton.vue";

export default Vue.extend({
  name: "TopBar",
  components: { Tabs, TouchbaseButton },
});
</script>
