<template>
  <div>
    <v-btn icon @click.stop.prevent="dialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-form ref="resourceForm">
          <v-card-text>
            <v-text-field
              v-model="resourceName"
              label="Resource name"
              :rules="[(val) => !!val || 'Resource name is required']"
              @keydown.enter="updateResource"
            ></v-text-field>
            <component
              :is="resourceFieldsComponent"
              v-if="resourceFieldsComponent"
              v-model="resourceData"
              @submit="updateResource"
            ></component>
          </v-card-text>
          <v-card-actions>
            <v-btn depressed color="red" text @click="deleteResource"> Delete </v-btn>

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
              @click="updateResource"
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

const resourceService = api.service("resources");

@Component
export default class EditResourceButton extends Vue {
  @Prop() id!: number;

  dialog = false;

  resourceName = "";

  resourceData?: string;

  resourceType = "";

  resourceComponent: typeof Vue | null = null;

  resourceFieldsComponent: Vue | null = null;

  async created(): Promise<void> {
    await this.fetchData();
  }

  async updateResource(): Promise<void> {
    await resourceService.patch(this.id, {
      name: this.resourceName,
      data: this.resourceData,
    });
    this.dialog = false;
    this.$root.$emit("resource-refresh-needed");
  }

  async deleteResource(): Promise<void> {
    await resourceService.remove(this.id);
    this.dialog = false;
    this.$root.$emit("resource-refresh-needed");
  }

  @Watch("$route")
  async fetchData(): Promise<void> {
    const resource = await resourceService.get(this.id);
    // TODO: Update with full collection path
    this.resourceName = resource.name;
    this.resourceData = resource.data;
    this.resourceType = resource.type;
    this.resourceComponent = (await import(`../views/resources/${resource.type}`)).default;
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
}
</script>
