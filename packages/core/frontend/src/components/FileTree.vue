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
import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";

const socket = io("http://localhost:3030");
const client = feathers();
client.configure(socketio(socket));
const collectionsService = client.service("collections");
const userService = client.service("users");

@Component
export default class FileTree extends Vue {
  items: { data: [] } = { data: [] };
  // search by owner when authorization is implemented by @Krivokrysenko

  async pullItems(): Promise<void> {
    const user = await userService.find({
      query: {
        email: "ruslanab@buffalo.edu", // replace with authorized user
      },
    });
    collectionsService.create({
      // create sample collection just for testing purposes
      name: "sample",
      owner: user.data[0],
      ownerID: user.data[0].id,
    });
    this.items = await collectionsService.find({
      query: {
        ownerID: user.data[0].id,
      },
    });
  }

  mounted(): void {
    this.pullItems();
  }
}
</script>
