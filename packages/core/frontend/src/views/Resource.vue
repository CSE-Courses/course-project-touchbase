<template>
  <div style="margin: 1rem">
    <v-row>
      <v-col>
        <component
          :is="resourceComponent"
          v-if="resourceComponent"
          :data="resourceData"
          :name="resourceName"
          @changed="updateResource"
        ></component>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import api from "@/api";

const resourceService = api.service("resources");

@Component
export default class Resource extends Vue {
  path: {
    disabled?: boolean;
    exact?: boolean;
    href?: string;
    link?: boolean;
    text?: string | number;
    to?: string | Record<string, unknown>;
  }[] = [];

  resourceName = "";

  resourceData?: string;

  resourceComponent: typeof Vue | null = null;

  async created() {
    await this.fetchData();
  }

  async updateResource(JSON: string) {
    resourceService.patch(this.$route.params.id, { data: JSON });
    await this.fetchData();
  }

  @Watch("$route")
  async fetchData() {
    const resource = await resourceService.get(this.$route.params.id);
    // TODO: Update with full collection path
    this.path = [{ text: resource.name }];
    this.resourceName = resource.name;
    this.resourceData = resource.data;
    this.resourceComponent = (await import(`./resources/${resource.type}`)).default;
  }
}
</script>
