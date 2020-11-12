<template>
  <v-text-field
    :value="resourceData"
    label="URL"
    :rules="urlValidators"
    @keyup.enter="$emit('submit')"
    @input="(e) => $emit('input', e)"
  ></v-text-field>
</template>

<script lang="ts">
import { Component, Model, Vue } from "vue-property-decorator";

@Component
export default class HyperlinkCreationFields extends Vue {
  urlValidators = [
    (val: string): boolean | string => !!val || "URL is required",
    (val: string): boolean | string =>
      (val && (val.startsWith("http://") || val.startsWith("https://"))) ||
      "URL must start with http:// or https://",
  ];

  @Model("input") readonly resourceData!: string;
}
</script>
