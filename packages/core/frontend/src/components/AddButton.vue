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
      <v-tooltip top>
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
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Add Resource</span>
      </v-tooltip>
      <v-btn fab dark small color="primary" @click="showCollectionDialog = !showCollectionDialog">
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
    </v-speed-dial>

    <!-- Add collection dialog -->
    <v-dialog v-model="showCollectionDialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-form ref="collectionForm">
            <v-text-field
              v-model="collectionName" label="Collection name"
              :rules="[val => !!val || 'Collection name is required']"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="submitCollection"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  Add resource dialog -->
    <v-dialog v-model="showResourceDialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-form ref="resourceForm">
            <v-text-field
              v-model="resourceName" label="Resource name"
              :rules="[val => !!val || 'Resource name is required']"
            ></v-text-field>
            <v-select
              v-model="resourceType" label="Resource type" :items="resourceTypes"
              :rules="[val => !!val || 'Resource type is required']"
            ></v-select>
            <component v-if="resourceFieldsComponent" :is="resourceFieldsComponent" v-model="resourceData"></component>
          </v-form>
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
import { Component, Ref, Vue, Watch } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";
import { VForm } from 'vuetify/lib';

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
  
  showResourceDialog = false;

  resourceName = "";

  resourceTypes = ["Hyperlink"];

  resourceType = "";

  resourceData = "";

  resourceFieldsComponent: Vue | null = null;

  @Watch('resourceType')
  async onTypeChanged() {
    if (this.resourceType) this.resourceFieldsComponent = (await import(`./resource-creation-fields/${this.resourceType}`)).default;
    else this.resourceFieldsComponent = null;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async submitResource() {
    if (!this.resourceForm.validate()) return;

    const userID = await api.reAuthenticate();
    this.$root.$emit("resource-refresh-needed");
    const resource = await resourceService.create({
      name: this.resourceName,
      type: this.resourceType,
      data: this.resourceData,
      ownerID: userID.user.id,
      // collectionID: ,
    });
    this.showResourceDialog = false;
    this.resourceForm.reset();
    this.$router.push(`/app/resource/${resource.id}`)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async submitCollection() {
    if (!this.collectionForm.validate()) return;

    this.showCollectionDialog = false;
    this.$root.$emit("file-tree-refresh-needed");
    await collectionsService.create({
      // create sample collection just for testing purposes
      name: this.collectionName,
    });
    this.collectionForm.reset();
  }
}
</script>

<style scoped lang="scss"></style>
