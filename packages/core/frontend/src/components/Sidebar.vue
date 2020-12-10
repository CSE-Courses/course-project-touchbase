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
      <v-list v-if="defaultWorkspaceName" color="secondary darken-3" class="workspace-switcher">
        <v-list-group prepend-icon="mdi-home-city">
          <template v-slot:activator>
            <v-list-item-title>{{ defaultWorkspaceName }}</v-list-item-title>
          </template>

          <v-list-item v-for="workspace in workspaces" :key="workspace.id" link>
            <v-list-item-title :to="{ name: 'Browse', params: { workspace: workspace.id } }">
              {{ workspace.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-divider />

      <v-subheader>List Views</v-subheader>
      <v-list nav dense>
        <v-list-item-group color="primary">
          <v-list-item :to="{ name: 'Browse', params: { workspace: $route.params.workspace } }">
            <v-list-item-icon>
              <v-icon>mdi-folder-multiple</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Browse</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'Calendar', params: { workspace: $route.params.workspace } }">
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
import api from "../api";

const workspacesService = api.service("workspaces");

@Component
export default class Sidebar extends Vue {
  @Prop() toggle!: boolean;

  workspaces: { name: string; id: number }[] = [];

  get defaultWorkspaceName() {
    return this.workspaces.find(
      (workspace) => workspace.id.toString() === this.$route.params.workspace
    )?.name;
  }

  async refreshWorkspaces() {
    const authRes = await api.get("authentication");
    const workspacesData = await workspacesService.find({
      query: {
        ownerID: authRes.user.id,
      },
    });
    this.workspaces = workspacesData.data;
  }

  mounted() {
    this.refreshWorkspaces();
  }
}
</script>

<style lang="scss" scoped>
.workspace-switcher {
  padding: 0;
}

.workspace-switcher ::v-deep .v-list-group__header {
  padding: 4px 16px;
}
</style>
