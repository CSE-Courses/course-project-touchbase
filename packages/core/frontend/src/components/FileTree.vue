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
      <v-treeview :items="items.data" dense activatable hoverable> </v-treeview>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";

const collectionsService = api.service("collections");

@Component
export default class FileTree extends Vue {
  @Prop({ defualt: true })
  toggle;

  items: { data: [] } = { data: [] };

  async pullItems(): Promise<void> {
    const authRes = await api.reAuthenticate();

    this.items = await collectionsService.find({
      query: {
        ownerID: authRes.user.id,
      },
    });
  }

  mounted(): void {
    this.pullItems();
    this.$root.$on("collection-refresh-needed", () => {
      this.pullItems();
    });
  }
}
</script>
