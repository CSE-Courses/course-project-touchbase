<template>
  <div>
    <h1>{{ name }}</h1>
    <v-btn :href="data">Go To {{ name }}</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";

const resourceService = api.service("resources");

@Component
export default class Hyperlink extends Vue {
  @Prop({ required: true }) name!: string;

  @Prop() data!: string;
}
</script>
