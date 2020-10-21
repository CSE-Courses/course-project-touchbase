<template>
  <v-app>
    <TopBar></TopBar>
    <FileTree></FileTree>
    <AddButton></AddButton>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped lang="scss"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBar from "../components/TopBar.vue";
import FileTree from "../components/FileTree.vue";
import AddButton from "../components/AddButton.vue";

@Component({
  components: { TopBar, FileTree, AddButton },
})
export default class extends Vue {}
</script>
