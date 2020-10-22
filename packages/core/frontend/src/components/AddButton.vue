<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      direction="top"
      transition="slide-y-reverse-transition"
      fixed
      bottom
      right
    >
      <template v-slot:activator>
        <v-btn v-model="fab" dark fab color="primary">
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="resourceDialog = !resourceDialog"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Add Resource</span>
      </v-tooltip>
      <v-btn fab dark small color="primary" @click="dialog = !dialog">
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field v-model="collectionName" label="Collection name" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="resourceDialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field v-model="resourceName" label="Resource name" required></v-text-field>
          <v-select v-model="resourceType" label="Resource type" :items="resourceTypes"></v-select>
          <v-text-field
            v-for="arbit in resourceInputs[resourceType]"
            :key="arbit.valueOf"
            :input="arbit"
            :label="arbit"
            :v-model="resourceData"
          >
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="submitResource"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "../api";

const collectionsService = api.service("collections");

const resourceService = api.service("resources");

@Component({
  components: {},
})
export default class AddButton extends Vue {
  fab = false;

  dialog = false;

  resourceName = "";

  resourceDialog = false;

  resourceTypes = ["Hyperlink"];

  resourceType = null;

  resourceInputs = { Hyperlink: ["URL"] };

  resourceData = "google.com";

  collectionName = "";

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/explicit-module-boundary-types
  async submitResource() {
    const userID = await api.reAuthenticate();
    await resourceService.create({
      name: this.resourceName,
      type: this.resourceType,
      data: this.resourceData.replace("https://", "").replace("http://", ""),
      ownerID: userID.user.id,
      // collectionID: ,
    });
  }

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/explicit-module-boundary-types
  async submit() {
    await collectionsService.create({
      // create sample collection just for testing purposes
      name: this.collectionName,
    });
  }
}
</script>

<style scoped lang="scss"></style>
