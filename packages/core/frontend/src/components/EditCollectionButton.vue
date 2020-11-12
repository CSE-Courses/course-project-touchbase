<template>
  <div>
    <v-btn icon @click.stop.prevent="dialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="collectionForm">
          <v-card-text>
            <v-text-field
              v-model="collectionName"
              label="Collection name"
              :rules="[(val) => !!val || 'Collection name is required']"
              @keydown.enter="updateCollection"
            ></v-text-field>
          </v-card-text>
          <!--v-autocomplete
            v-model="parentCollection"
            :items="collectionNames"
            dense
            filled
            label="Parent Collection"
          ></v-autocomplete-->
          <v-card-actions>
            <v-btn depressed color="red" text @click="deleteCollection"> Delete </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              depressed
              color="primary"
              :disabled="collectionName === ''"
              @click="updateCollection"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import api from "@/api";

const collectionsService = api.service("collections");

@Component
export default class EditCollectionButton extends Vue {
  @Prop() id!: number;

  dialog = false;

  collectionName = "";

  async created(): Promise<void> {
    await this.fetchData();
  }

  async updateCollection(): Promise<void> {
    await collectionsService.patch(this.id, {
      name: this.collectionName,
    });
    this.dialog = false;
    this.$root.$emit("collection-refresh-needed");
  }

  async deleteCollection(): Promise<void> {
    await collectionsService.remove(this.id);
    this.dialog = false;
    this.$root.$emit("collection-refresh-needed");
  }

  @Watch("$route")
  async fetchData(): Promise<void> {
    const resource = await collectionsService.get(this.id);
    // TODO: Update with full collection path
    this.collectionName = resource.name;
  }
}
</script>
