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
import TopBar from "@/components/TopBar.vue";
import FileTree from "@/components/FileTree.vue";
import AddButton from "@/components/AddButton.vue";
import api from "@/api";

const settingsService = api.service("settings");

@Component({
  components: { TopBar, FileTree, AddButton },
})
export default class extends Vue {
  async pullSettings(): Promise<void> {
    const authRes = await api.reAuthenticate();
    const settingsData = await settingsService.find({
      query: {
        ownerID: authRes.user.id,
      },
    });
    this.$vuetify.theme.dark = settingsData.data.darkmode;
    this.$vuetify.theme.themes.light.primary = settingsData.data.color;
  }

  mounted(): void {
    this.pullSettings();
  }
}
</script>
