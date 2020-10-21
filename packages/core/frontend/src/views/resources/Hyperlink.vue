<template>
  <div>
    {{ items }}
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "../../api";

const resourceService = api.service("resources");

@Component
export default class FileTree extends Vue {
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
    this.pullItems();
  }
}
</script>
