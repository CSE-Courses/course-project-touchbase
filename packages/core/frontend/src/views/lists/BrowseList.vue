<template>
  <!--v-list subheader two-line-->
  <v-list>
    <v-subheader inset>Collections</v-subheader>

    <v-list-item v-for="collection in collections" :key="`collection:${collection.name}`">
      <v-list-item-avatar>
        <v-icon class="grey lighten-1" dark>mdi-folder</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="collection.name"></v-list-item-title>
      </v-list-item-content>

      <!--v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action-->
    </v-list-item>

    <v-divider inset></v-divider>

    <v-subheader inset>Files</v-subheader>

    <v-list-item v-for="resource in resources" :key="`resource:${resource.name}`">
      <v-list-item-avatar>
        <v-icon class="blue" dark>mdi-file-document</v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="resource.name"></v-list-item-title>
      </v-list-item-content>

      <!--v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action-->
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";

const resourceService = api.service("resources");
const collectionsService = api.service("collections");

@Component
export default class BrowseList extends Vue {
  collections: { name: string }[] = [];

  resources: { name: string }[] = [];

  async pullCollections(): Promise<void> {
    const authRes = await api.reAuthenticate();

    this.collections = (
      await collectionsService.find({
        query: {
          ownerID: authRes.user.id,
        },
      })
    ).data;
  }

  async pullResources(): Promise<void> {
    const authRes = await api.reAuthenticate();

    this.resources = (
      await resourceService.find({
        query: {
          ownerID: authRes.user.id,
        },
      })
    ).data;
  }

  mounted(): void {
    this.pullCollections();
    this.pullResources();
    this.$root.$on("collection-refresh-needed", () => {
      this.pullCollections();
    });
    this.$root.$on("resource-refresh-needed", () => {
      this.pullResources();
    });
  }
}
</script>
