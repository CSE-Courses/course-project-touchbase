<template>
  <div>
    <h1>{{ name }}</h1>
    <v-btn :href="data" target="_blank">Go To {{ name }}</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Hyperlink extends Vue {
  @Prop({ required: true }) name!: string;

  @Prop() data!: string;
}
</script>
