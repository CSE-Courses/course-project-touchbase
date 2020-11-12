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
            <template v-if="collectionTree.length">Parent collection</template>
            <v-treeview
              :active.sync="activeCollections"
              :items="collectionTree"
              :load-children="fetchChildCollections"
              activatable
              color="primary"
              transition
            />
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
            <template v-if="collectionTree.length">Parent collection</template>
            <v-treeview
              :active.sync="activeCollections"
              :items="collectionTree"
              :load-children="fetchChildCollections"
              activatable
              color="primary"
              transition
            />
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

interface CollectionTreeNode {
  name: string;
  id: number;
  children?: CollectionTreeNode[];
}

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

  activeCollections: CollectionTreeNode[] = [];

  collectionTree: CollectionTreeNode[] = [];

  @Watch("showResourceDialog")
  @Watch("showCollectionDialog")
  async refreshTree(): Promise<void> {
    this.activeCollections = [];
    // Immediately clear it, eg in case we've deleted a collection so that we don't have a period
    // with invalid data
    this.collectionTree = [];
    this.collectionTree = (await this.getCollections(null)) || [];
  }

  async fetchChildCollections(collection: CollectionTreeNode): Promise<void> {
    // We need to reassign so that we can mark it as null if there's nothing there,
    // so that the arrow goes away
    // eslint-disable-next-line no-param-reassign
    collection.children = await this.getCollections(collection.id);
  }

  async getCollections(parentID: number | null): Promise<CollectionTreeNode[] | undefined> {
    const authRes = await api.get("authentication");
    const collections: Omit<CollectionTreeNode, "children">[] = (
      await collectionsService.find({
        query: {
          ownerID: authRes.user.id,
          collectionID: parentID,
        },
      })
    ).data;
    return collections.length
      ? collections.map((collection) => ({ ...collection, children: [] }))
      : undefined;
  }

  @Watch("resourceType")
  async onTypeChanged(): Promise<void> {
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

  async submitResource(): Promise<void> {
    if (!this.resourceForm.validate()) return;

    const userID = await api.get("authentication");
    await resourceService.create({
      name: this.resourceName,
      type: this.resourceType,
      data: this.resourceData,
      ownerID: userID.user.id,
      collectionID: this.activeCollections.length ? this.activeCollections[0] : null,
    });
    this.showResourceDialog = false;
    this.resourceForm.reset();
    this.$root.$emit("resource-refresh-needed");
  }

  async submitCollection(): Promise<void> {
    if (!this.collectionForm.validate()) return;

    this.showCollectionDialog = false;
    await collectionsService.create({
      name: this.collectionName,
      collectionID: this.activeCollections.length ? this.activeCollections[0] : null,
    });
    this.collectionForm.reset();
    this.$root.$emit("collection-refresh-needed");
  }
}
</script>

<style scoped lang="scss"></style>
