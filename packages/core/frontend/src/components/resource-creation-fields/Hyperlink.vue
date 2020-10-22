<template>
  <v-text-field
    :value="resourceData"
    label="URL"
    :rules="urlValidators"
    @input="(e) => $emit('input', e)"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Model, PropSync, Vue } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";

@Component
export default class HyperlinkCreationFields extends Vue {
  urlValidators = [
    (val: string) => !!val || "URL is required",
    (val: string) =>
      (val && (val.startsWith("http://") || val.startsWith("https://"))) ||
      "URL must start with http:// or https://",
  ];

  @Model("input") readonly resourceData!: string;
}
</script>
