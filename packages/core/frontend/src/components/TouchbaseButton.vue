<template>
  <div>
    <router-link to="/about" icon src="../assets/logo.svg">
      <v-avatar rounded>
        <img alt="TouchBase Logo" src="../assets/logo.svg" transition="scale-transition" />
      </v-avatar>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TouchbaseButton",
});
</script>
