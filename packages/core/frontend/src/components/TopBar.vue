<template>
  <div>
    <v-app-bar app color="primary" flat dark clipped-left clipped-right>
      <v-btn icon @click="$root.$emit('toggle-sidebar')">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-autocomplete
        v-model="searchinput"
        :items="collectionstrings.concat(resourcestrings)"
        label="Search"
        class="pt-9"
        clearable
        @change="search"
      ></v-autocomplete>
      <v-btn icon @click="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <SettingsButton></SettingsButton>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import api from "@/api";
import SettingsButton from "./SettingsButton.vue";

const resourceService = api.service("resources");
const collectionsService = api.service("collections");

@Component({
  components: { SettingsButton },
})
export default class TopBar extends Vue {
  searchinput = "";

  async search(): Promise<void> {
    const index = this.searchinput.indexOf("(");
    const search = this.searchinput.slice(0, index - 1);
    const type = this.searchinput.slice(index + 1, this.searchinput.length - 1);
    const collectiontest = this.collections.find((collection) => collection.name === search)?.id;
    const resourcetest = this.resources.find(
      (resource) => resource.name === search && resource.type === type
    )?.id;
    if (collectiontest != null && type === "Collection") {
      await this.$router.push({
        name: "Browse",
        params: {
          workspace: this.$route.params.workspace,
          collectionID: collectiontest.toString(),
        },
      });
      this.searchinput = '';
    } else if (resourcetest != null && type !== "Collection") {
      await this.$router.push({
        name: "Resource",
        params: { workspace: this.$route.params.workspace, id: resourcetest.toString() },
      });
      this.searchinput = '';
    }
  }

  collections: { name: string; id: number }[] = [];

  resources: { name: string; id: number; type: string }[] = [];

  collectionstrings: string[] = [];

  resourcestrings: string[] = [];

  @Watch("$route.params.workspace")
  async pullCollections(): Promise<void> {
    this.collections = [];
    this.collectionstrings = [];

    this.collections = (
      await collectionsService.find({
        query: {
          workspaceID: this.$route.params.workspace,
        },
      })
    ).data;
    this.collectionstrings = this.collections.map(
      (collection) => `${collection.name} (Collection)`
    );
  }

  @Watch("$route.params.workspace")
  async pullResources(): Promise<void> {
    this.resources = [];
    this.resourcestrings = [];

    this.resources = (
      await resourceService.find({
        query: {
          workspaceID: this.$route.params.workspace,
        },
      })
    ).data;
    this.resourcestrings = this.resources.map((resource) => `${resource.name} (${resource.type})`);
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
