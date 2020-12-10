<template>
  <div>
    <v-toolbar flat>
      <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"> Today </v-btn>
      <v-btn fab text small color="grey darken-2" @click="prev">
        <v-icon small> mdi-chevron-left </v-icon>
      </v-btn>
      <v-btn fab text small color="grey darken-2" @click="next">
        <v-icon small> mdi-chevron-right </v-icon>
      </v-btn>
      <v-toolbar-title v-if="$refs.calendar">
        {{ calendar.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
            <span>{{ typeToLabel.get(type) }}</span>
            <v-icon right> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'">
            <v-list-item-title>Day</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'week'">
            <v-list-item-title>Week</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = 'month'">
            <v-list-item-title>Month</v-list-item-title>
          </v-list-item>
          <v-list-item @click="type = '4day'">
            <v-list-item-title>4 days</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :type="type"
        :events="events"
        @click:date="viewDay"
        @click:event="openEvent"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Ref } from "vue-property-decorator";
import api from "@/api";
import EditResourceButton from "@/components/EditResourceButton.vue";
import EditCollectionButton from "@/components/EditCollectionButton.vue";
import router from "@/router";
import { VCalendar } from "vuetify/lib";

const resourceService = api.service("resources");
@Component({
  components: { EditCollectionButton, EditResourceButton },
})
export default class BrowseList extends Vue {
  @Ref() calendar!: VCalendar;

  resources: { name: string; date: string; id: string }[] = [];

  events: { name: string; start: string; id: string }[] = [];

  type = "month";

  focus = "";

  typeToLabel = new Map([
    ["month", "Month"],
    ["week", "Week"],
    ["day", "Day"],
    ["4day", "4 Days"],
  ]);

  viewDay({ date }: never): void {
    this.focus = date;
    this.type = "day";
  }

  setToday(): void {
    this.focus = "";
  }

  prev(): void {
    this.calendar.prev();
  }

  next(): void {
    this.calendar.next();
  }

  // eslint-disable-next-line
  openEvent(event: any): void {
    router.push(`/app/resource/${event.event.id}`);
  }

  @Watch("$route")
  async pullResources(): Promise<void> {
    const authRes = await api.get("authentication");
    this.resources = (
      await resourceService.find({
        query: {
          ownerID: authRes.user.id,
        },
      })
    ).data;
    this.events = [];
    for (let i = 0; i < this.resources.length; i += 1) {
      const item = this.resources[i];
      this.events.push({
        name: item.name,
        start: item.date,
        id: item.id,
      });
    }
  }

  mounted(): void {
    this.pullResources();
    this.$root.$on("resource-refresh-needed", () => {
      this.pullResources();
    });
  }
}
</script>
