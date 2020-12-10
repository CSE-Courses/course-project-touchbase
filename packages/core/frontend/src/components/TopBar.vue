<template>
  <div>
    <v-app-bar app color="primary" flat dark clipped-left clipped-right>
      <v-btn icon @click="$emit('toggle')">
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
import { Vue, Component } from "vue-property-decorator";
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
    } else if (resourcetest != null && type !== "Collection") {
      await this.$router.push({
        name: "Resource",
        params: { workspace: this.$route.params.workspace, collectionID: resourcetest.toString() },
      });
    }
  }

  collections: { name: string; id: number }[] = [];

  resources: { name: string; id: number; type: string }[] = [];

  collectionstrings: string[] = [];

  resourcestrings: string[] = [];

  async pullCollections(): Promise<void> {
    const authRes = await api.get("authentication");

    this.collections = (
      await collectionsService.find({
        query: {
          ownerID: authRes.user.id,
        },
      })
    ).data;
    this.collectionstrings = this.collections.map(
      (collection) => `${collection.name} (Collection)`
    );
  }

  async pullResources(): Promise<void> {
    const authRes = await api.get("authentication");

    this.resources = (
      await resourceService.find({
        query: {
          ownerID: authRes.user.id,
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
