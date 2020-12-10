<template>
  <div>
    <v-breadcrumbs :items="collectionPath"></v-breadcrumbs>
    <v-list>
      <v-subheader v-if="collections.length" inset>Collections</v-subheader>

      <v-list-item
        v-for="collection in collections"
        :key="`collection:${collection.name}`"
        :to="{
          name: 'Browse',
          params: { workspace: $route.params.workspace, collectionID: collection.id },
        }"
      >
        <v-list-item-avatar>
          <v-icon class="grey lighten-1" dark>mdi-folder</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="collection.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <EditCollectionButton :id="collection.id"></EditCollectionButton>
        </v-list-item-action>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-subheader v-if="resources.length" inset>Files</v-subheader>

      <v-list-item
        v-for="resource in resources"
        :key="`resource:${resource.name}`"
        selectable
        :to="{
          name: 'Resource',
          params: { workspace: $route.params.workspace, collectionID: resource.id },
        }"
      >
        <v-list-item-avatar>
          <v-icon class="blue" dark>mdi-file-document</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="resource.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <EditResourceButton :id="resource.id"></EditResourceButton>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import api from "@/api";
import EditResourceButton from "@/components/EditResourceButton.vue";
import EditCollectionButton from "@/components/EditCollectionButton.vue";

interface BreadcrumbItem {
  text: string;
  to: string;
  exact?: boolean;
}

const resourceService = api.service("resources");
const collectionsService = api.service("collections");
@Component({
  components: { EditCollectionButton, EditResourceButton },
})
export default class BrowseList extends Vue {
  collectionPath: BreadcrumbItem[] = [];

  collections: { name: string; id: number }[] = [];

  resources: { name: string; id: number }[] = [];

  @Watch("$route")
  async pullCollections(): Promise<void> {
    this.collections = (
      await collectionsService.find({
        query: {
          workspaceID: this.$route.params.workspace,
          collectionID: this.$route.params.collectionID || null,
        },
      })
    ).data;
  }

  @Watch("$route")
  async pullResources(): Promise<void> {
    this.resources = (
      await resourceService.find({
        query: {
          workspaceID: this.$route.params.workspace,
          collectionID: this.$route.params.collectionID || null,
        },
      })
    ).data;
  }

  @Watch("$route")
  async pullCollectionPath(): Promise<void> {
    this.collectionPath = [];

    const collectionPath: BreadcrumbItem[] = [];
    let cid = this.$route.params.collectionID;
    while (cid) {
      // eslint-disable-next-line no-await-in-loop
      const collection = await collectionsService.get(cid);
      collectionPath.push({
        text: collection.name,
        to: `/workspace/${this.$route.params.workspace}/browse/${cid}`,
      });
      cid = collection.collectionID;
    }
    collectionPath.push({
      text: "Home",
      to: `/workspace/${this.$route.params.workspace}/browse`,
      exact: true,
    });
    this.collectionPath = collectionPath.reverse();
  }

  mounted(): void {
    this.pullCollectionPath();
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
