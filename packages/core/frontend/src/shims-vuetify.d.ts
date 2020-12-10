declare module "vuetify/lib" {
  interface VForm extends HTMLFormElement {
    validate(): boolean;
    reset(): boolean;
  }
  interface VCalendar extends HTMLFormElement {
    title(): string;
    prev(): void;
    next(): void;
  }
}
