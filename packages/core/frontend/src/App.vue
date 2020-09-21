<template>
  <v-app :style="{ background: $vuetify.theme.themes[isDark].background }">
        <TopBar></TopBar>

    <FileTree></FileTree>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
import TopBar from "./components/TopBar.vue";
import FileTree from "./components/FileTree.vue";

export default {
  components: { TopBar, FileTree },
  computed: {
    isDark(): string {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
