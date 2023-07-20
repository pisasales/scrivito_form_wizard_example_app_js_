import * as Scrivito from "scrivito";

export const FormDropdownOptionWidget = Scrivito.provideWidgetClass(
  "FormDropdownOptionWidget",
  {
    onlyInside: "FormDropdownWidget",
    attributes: {
      text: "string",
    },
  }
);