<template>
  <v-app :style="{ background: $vuetify.theme.themes[isDark].background }">
    <v-app-bar app color="primary" flat dark clipped-left clipped-right>
      <v-tabs centered background-color="primary">
        <v-tab to="/" text outlined rounded>
          <span>Timeline</span>
        </v-tab>

        <v-tab to="/calendar" text outlined rounded>
          <span>Calendar</span>
        </v-tab>
      </v-tabs>

      <v-btn to="/about" icon 
          src="./assets/logo.svg">
        <v-img
          alt="TouchBase Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.svg"
          transition="scale-transition"
          width="40"
          absolute
          right
        />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      color="secondary"
      absolute
      dark
      clipped
      transition
      open-on-click
      activatable
    >
      <v-treeview :items="items" dense activatable hoverable> </v-treeview>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped lang="scss"></style>

<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        name: "home@gmail.com",
        children: [
          { id: 2, name: "Calendar : app" },
          { id: 3, name: "Chrome : app" },
          { id: 4, name: "Webstorm : app" },
        ],
      },
      {
        id: 5,
        name: "work@business.com",
        children: [
          {
            id: 6,
            name: "vuetify :",
            children: [
              {
                id: 7,
                name: "src :",
                children: [
                  { id: 8, name: "index : ts" },
                  { id: 9, name: "bootstrap : ts" },
                ],
              },
            ],
          },
          {
            id: 10,
            name: "material2 :",
            children: [
              {
                id: 11,
                name: "src :",
                children: [
                  { id: 12, name: "v-btn : ts" },
                  { id: 13, name: "v-card : ts" },
                  { id: 14, name: "v-window : ts" },
                ],
              },
            ],
          },
        ],
      },
    ],
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
};
</script>
