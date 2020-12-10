<template>
  <div>
    <v-list flat one-line>
      <v-subheader class="text-uppercase">{{ name }}</v-subheader>

      <v-list-item v-for="todo in todos" :key="todo">
        <template>
          <v-list-item-action>
            <v-checkbox
              v-model="todo.checked"
              color="primary"
              @change="notifyUpdate()"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title
              v-if="todo.checked"
              class="text-decoration-line-through text--disabled"
              >{{ todo.title }}</v-list-item-title
            >
            <v-list-item-title v-else-if="!todo.checked" class="text-decoration-none">{{
              todo.title
            }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
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

@Component
export default class ToDoList extends Vue {
  newItemName = "";

  @Prop({ required: true }) name!: string;

  @Prop() data!: string;

  todos: { title: string; checked: boolean }[] = [];

  mounted(): void {
    if (!(this.data === "")) {
      this.todos = JSON.parse(this.data).todos;
    }
  }

  convertDataToJSON(): string {
    return JSON.stringify({ todos: this.todos });
  }

  notifyUpdate(): void {
    const toSend = this.convertDataToJSON();
    this.$emit("changed", toSend);
  }

  async newItem(): Promise<void> {
    this.todos.push({ title: this.newItemName, checked: false });
    this.newItemName = "";
    this.notifyUpdate();
  }
}
</script>
