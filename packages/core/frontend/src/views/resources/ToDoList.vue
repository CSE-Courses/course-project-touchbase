<template>
  <div>
    <v-list flat one-line>
      <v-list-item-group multiple>
        <v-subheader class="text-uppercase">{{ name }}</v-subheader>

        <v-list-item v-for="(item, index) in items" :key="item">
          <template>
            <v-list-item-action>
              <v-checkbox
                v-model="status[index]"
                color="primary"
                @change="updateStatus(index)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-row cols="3">
      <v-col>
        <v-text-field v-model="newItemName" label="New To-Do Item"></v-text-field>
      </v-col>

      <v-col>
        <v-btn @click="newItem">Submit</v-btn>
      </v-col>

      <v-col></v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
// eslint-disable-next-line import/extensions,import/no-unresolved
import api from "@/api";

const resourceService = api.service("resources");

@Component
export default class ToDoList extends Vue {
  newItemName = "";

  @Prop({ required: true }) name!: string;

  @Prop() data!: string;

  items: string[] = [];

  status: boolean[] = [];

  mounted() {
    if (!(this.data === "")) {
      [this.items, this.status] = JSON.parse(this.data);
    }
  }

  async convertDataToJSON() {
    return JSON.stringify([this.items, this.status]);
  }

  async updateStatus(index: number) {
    const toSend = await this.convertDataToJSON();
    this.$emit("changed", toSend);
  }

  async newItem() {
    this.items.push(this.newItemName);
    this.newItemName = ""
    this.status.push(false);
    const toSend = await this.convertDataToJSON();
    this.$emit("changed", toSend);
  }
}
</script>
