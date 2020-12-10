<template>
  <div>
    <v-menu offset-y :close-on-content-click="false" @input="$emit('date', resourceDate)">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
        {{ resourceDate }}
      </template>
      <v-card>
        <v-date-picker v-model="resourceDate"></v-date-picker>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="resourceDate = ''">clear</v-btn>
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
  @Model() date!: "";

  resourceDate = this.date;

  menu = false;
}
</script>

<style scoped lang="scss"></style>
