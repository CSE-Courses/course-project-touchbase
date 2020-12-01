<template>
  <v-calendar color="background" :events="events" @click:event="openEvent"></v-calendar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import api from "@/api";
import EditResourceButton from "@/components/EditResourceButton.vue";
import EditCollectionButton from "@/components/EditCollectionButton.vue";
import router from "@/router";

const resourceService = api.service("resources");
@Component({
  components: { EditCollectionButton, EditResourceButton },
})
export default class BrowseList extends Vue {
  resources: { name: string; date: string; id: string }[] = [];

  events: { name: string; start: string; id: string }[] = [];
  // eslint-disable-next-line
  openEvent(event: any): void {
    router.push(`/app/resource/${event.event.id}`);
  }

  @Watch("$route")
  async pullResources(): Promise<void> {
    const authRes = await api.get("authentication");
    this.resources = (
      await resourceService.find({
        query: {
          ownerID: authRes.user.id,
        },
      })
    ).data;
    this.events = [];
    for (let i = 0; i < this.resources.length; i += 1) {
      const item = this.resources[i];
      this.events.push({
        name: item.name,
        start: item.date,
        id: item.id,
      });
    }
  }

  mounted(): void {
    this.pullResources();
    this.$root.$on("resource-refresh-needed", () => {
      this.pullResources();
    });
  }
}
</script>
