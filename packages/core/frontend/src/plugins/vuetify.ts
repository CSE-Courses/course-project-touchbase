import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        background: "#d7eef4",
        primary: "#164450",
        secondary: "#87cdde",
        accent: "#afdde9",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
      dark: {
        background: "#0b2228",
        primary: "#164450",
        secondary: "#216778",
        accent: "#2c89a0",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
/*
0b2228
164450
216778
2c89a0
37abc8
5fbcd3
87cdde
afdde9
d7eef4
*/
