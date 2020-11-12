declare module "vuetify/lib" {
  interface VForm extends HTMLFormElement {
    validate(): boolean;
    reset(): boolean;
  }
}
