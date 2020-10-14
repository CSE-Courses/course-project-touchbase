<template>
  <v-card id="create">
    <v-speed-dial
      v-model="fab"
      direction="top"
      transition="slide-y-reverse-transition"
      fixed
      bottom
      right
    >
      <template v-slot:activator>
        <v-btn v-model="fab" dark fab color="primary">
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="primary">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn fab dark small color="primary" @click="dialog = !dialog">
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-alert v-if="collectionSuccess" type="success"
          >Your collection has been created successfully!</v-alert
        >
        <v-alert v-if="collectionFail" type="error"
          >Collection creation has failed! Please make sure you are logged in.</v-alert
        >
        <v-card-text>
          <v-text-field id="collectionName" label="Collection name" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="submit"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class AddButton extends Vue {
  fab = false;

  dialog = false;

  collectionSuccess = false;

  collectionFail = false;

  collectionName = "";

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/explicit-module-boundary-types
  submit() {
    // eslint-disable-next-line no-console
    console.log("Hi");
  }
}
</script>

<style scoped lang="scss"></style>
