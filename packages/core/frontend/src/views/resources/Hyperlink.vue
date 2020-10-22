<template>
  <div>
    <v-subheader>Hyperlinks</v-subheader>
    <v-btn
      v-for="link in items.data"
      :key="link"
      dark
      color="primary"
      :href="'//' + link.data.replace('https://', '').replace('http://', '')"
      target="_blank"
    >
      {{ link.name }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "../../api";

const resourceService = api.service("resources");

@Component
export default class Hyperlink extends Vue {
  items: { data: [] } = { data: [] };

  async pullItems(): Promise<void> {
    const authRes = await api.reAuthenticate();

    this.items = await resourceService.find({
      query: {
        ownerID: authRes.user.id,
      },
    });
  }

  mounted(): void {
    this.$root.$on("resource-refresh-needed", () => {
      this.pullItems();
    });
  }
}
</script>
