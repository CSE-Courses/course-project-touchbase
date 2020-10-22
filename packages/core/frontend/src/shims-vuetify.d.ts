import { VDialog, VDialog } from "vuetify/lib";

declare module "vuetify/lib" {
  interface VForm extends HTMLFormElement {
    validate(): boolean;
    reset(): boolean;
  }
}
