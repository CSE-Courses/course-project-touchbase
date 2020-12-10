<template>
  <div>
    <h1>{{ name }}</h1>
    <v-row>
      <v-col>
        <textarea v-model="data" @input="update"></textarea>
      </v-col>
      <v-col>
        <div v-html="renderedMarkdown"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import showdown from "showdown";

@Component
export default class Markdown extends Vue {
  @Prop({ required: true }) name!: string;

  @Prop() data!: string;

  converter = new showdown.Converter();

  renderedMarkdown = this.converter.makeHtml(this.data);

  update(): void {
    this.renderedMarkdown = this.converter.makeHtml(this.data);
    const toSend = this.data;
    this.$emit("changed", toSend);
  }
}
</script>

<style scoped>
div {
  height: 100%;
}

textarea,
#editor div {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  height: 600px;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: monospace;
  padding: 20px;
}
</style>
