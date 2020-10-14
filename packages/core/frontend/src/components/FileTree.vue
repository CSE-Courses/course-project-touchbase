<template>
  <div>
    <v-navigation-drawer
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
import { Vue, Component } from "vue-property-decorator";
import api from "../api";

const usersService = api.service("users");
const collectionsService = api.service("collections");

@Component
export default class FileTree extends Vue {
  items: { data: [] } = { data: [] };

  async pullItems(): Promise<void> {
    const authRes = await api.reAuthenticate();

    const user = await usersService.find({
      query: {
        email: "ruslanab@buffalo.edu", // replace with authorized user
      },
    });

    await collectionsService.create({
      // create sample collection just for testing purposes
      name: "sample",
      ownerID: authRes.user.id,
    });

    this.items = await collectionsService.find({
      query: {
        ownerID: authRes.user.id,
      },
    });
  }

  mounted(): void {
    this.pullItems();
  }
}
</script>
