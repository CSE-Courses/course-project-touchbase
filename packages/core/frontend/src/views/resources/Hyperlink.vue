<template>
  <div>
    <v-subheader>Hyperlinks</v-subheader>
    <v-btn
      v-for="link in items2"
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

const fakeServerReply = [
  {
    name: "Google",
    type: "Hyperlink",
    data: "http://www.google.com",
    ownerID: 1,
  },
  {
    name: "Github",
    type: "Hyperlink",
    data: "github.com",
    ownerID: 1,
  },
  {
    name: "YouTube",
    type: "Hyperlink",
    data: "youtube.com",
    ownerID: 1,
  },
];

@Component
export default class Hyperlink extends Vue {
  items: { data: [] } = { data: [] };

  items2 = fakeServerReply;

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
