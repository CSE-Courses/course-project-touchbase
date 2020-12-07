<template>
  <div>
    <v-menu offset-y :close-on-content-click="false" @input="$emit('time', resourceTime)">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-clock</v-icon>
        </v-btn>
        {{ resourceTime }}
      </template>
      <v-card>
        <v-time-picker v-model="resourceTime" format="24hr"></v-time-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="resourceTime = ''">clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DatePicker extends Vue {
  @Model() time!: "";

  resourceTime = this.time;

  menu = false;
}
</script>

<style scoped lang="scss"></style>
