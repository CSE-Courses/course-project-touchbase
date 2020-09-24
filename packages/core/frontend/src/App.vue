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

<script>
import { Component, Vue } from "vue-property-decorator";
import TopBar from "./components/TopBar.vue";
import FileTree from "./components/FileTree.vue";

@Component({ components: { TopBar, FileTree } })
export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get isDark() {
    return this.$vuetify.theme.dark ? "dark" : "light";
  }
}
</script>
