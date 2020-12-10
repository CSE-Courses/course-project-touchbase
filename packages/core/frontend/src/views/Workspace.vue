<template>
  <v-app>
    <TopBar @toggle="toggle = !toggle"></TopBar>
    <Sidebar :toggle="toggle"></Sidebar>
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
import Sidebar from "@/components/Sidebar.vue";
import AddButton from "@/components/AddButton.vue";
import api from "@/api";

const settingsService = api.service("settings");

@Component({
  components: { TopBar, Sidebar, AddButton },
})
export default class extends Vue {
  toggle = true;

  async pullSettings(): Promise<void> {
    const authRes = await api.get("authentication");
    const settingsData = await settingsService.find({
      query: {
        ownerID: authRes.user.id,
      },
    });
    const settings = settingsData.data[0];
    if (settings.color) {
      this.$vuetify.theme.themes = JSON.parse(settings.color);
    }
    if (settings.darkmode != null) {
      this.$vuetify.theme.dark = settings.darkmode;
    }
  }

  mounted(): void {
    this.pullSettings();
  }
}
</script>
