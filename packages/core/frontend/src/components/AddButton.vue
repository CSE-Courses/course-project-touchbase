<template>
  <v-card id="create">
    <!-- The buttons -->
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
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="showResourceDialog = !showResourceDialog"
          >
            <v-icon>mdi-file-document</v-icon>
          </v-btn>
        </template>
        <span>Create Resource</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="primary"
            v-bind="attrs"
            v-on="on"
            @click="showCollectionDialog = !showCollectionDialog"
          >
            <v-icon>mdi-folder</v-icon>
          </v-btn>
        </template>
        <span>Create Collection</span>
      </v-tooltip>
    </v-speed-dial>

    <!-- Add collection dialog -->
    <v-dialog v-model="showCollectionDialog" max-width="500px">
      <v-card>
        <v-form ref="collectionForm">
          <v-card-text>
            <v-text-field
              v-model="collectionName"
              label="Collection name"
              :rules="[(val) => !!val || 'Collection name is required']"
              @keydown.enter="submitCollection"
            ></v-text-field>
            <v-autocomplete
              v-model="parentCollection"
              :items="collectionNames"
              label="Parent Collection"
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              depressed
              color="primary"
              :disabled="collectionName === ''"
              @click="submitCollection"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!--  Add resource dialog -->
    <v-dialog v-model="showResourceDialog" max-width="500px">
      <v-card>
        <v-form ref="resourceForm">
          <v-card-text>
            <v-text-field
              v-model="resourceName"
              label="Resource name"
              :rules="[(val) => !!val || 'Resource name is required']"
              @keydown.enter="submitResource"
            ></v-text-field>
            <v-autocomplete
              v-model="parentCollection"
              :items="collectionNames"
              label="Parent Collection"
            ></v-autocomplete>
            <v-select
              v-model="resourceType"
              label="Resource type"
              :items="resourceTypes"
              :rules="[(val) => !!val || 'Resource type is required']"
              @keydown.enter="submitResource"
            ></v-select>
            <component
              :is="resourceFieldsComponent"
              v-if="resourceFieldsComponent"
              v-model="resourceData"
              @submit="submitResource"
            ></component>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              depressed
              color="primary"
              :disabled="
                !(
                  resourceName !== '' &&
                  resourceType !== null &&
                  (!resourceFieldsComponent || resourceData !== '')
                )
              "
              @click="submitResource"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";
import { VForm } from "vuetify/lib";

const collectionsService = api.service("collections");

const resourceService = api.service("resources");

@Component({
  components: {},
})
export default class AddButton extends Vue {
  @Ref() resourceForm!: VForm;

  @Ref() collectionForm!: VForm;

  fab = false;

  showCollectionDialog = false;

  collectionName = "";

  parentCollection = "";

  showResourceDialog = false;

  resourceName = "";

  resourceTypes = ["Hyperlink", "ToDoList"];

  resourceType = "";

  resourceData = "";

  resourceFieldsComponent: Vue | null = null;

  collections: { name: string; id: number }[] = [];

  get collectionNames(): string[] {
    return this.collections.map((collection) => collection.name);
  }

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

  @Watch("resourceType")
  async onTypeChanged() {
    if (this.resourceType)
      try {
        this.resourceFieldsComponent = (
          await import(`./resource-creation-fields/${this.resourceType}`)
        ).default;
      } catch {
        this.resourceFieldsComponent = null;
      }
    else this.resourceFieldsComponent = null;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async submitResource() {
    if (!this.resourceForm.validate()) return;

    const userID = await api.reAuthenticate();
    const resource = await resourceService.create({
      name: this.resourceName,
      type: this.resourceType,
      data: this.resourceData,
      ownerID: userID.user.id,
      collectionID: this.collections.find((collection) => collection.name === this.parentCollection)
        ?.id,
    });
    this.showResourceDialog = false;
    this.resourceForm.reset();
    this.$root.$emit("resource-refresh-needed");
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async submitCollection() {
    if (!this.collectionForm.validate()) return;

    this.showCollectionDialog = false;
    await collectionsService.create({
      name: this.collectionName,
      collectionID: this.collections.find((collection) => collection.name === this.parentCollection)
        ?.id,
    });
    this.collectionForm.reset();
    this.$root.$emit("collection-refresh-needed");
  }

  mounted(): void {
    this.pullCollections();
    this.$root.$on("collection-refresh-needed", () => {
      this.pullCollections();
    });
  }
}
</script>

<style scoped lang="scss"></style>
