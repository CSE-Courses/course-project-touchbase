<template>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import api from "@/api";

@Component
export default class Hyperlink extends Vue {
  @Prop({ required: true }) name!: string;

  @Prop() data!: string;

  mounted(): void {
    window.open(this.data, "_blank");
    this.$router.go(-1);
  }
}
</script>
