import * as Scrivito from "scrivito";

export const FormDropdownWidget = Scrivito.provideWidgetClass(
  "FormDropdownWidget",
  {
    attributes: {
      title: "string",
      options: "stringlist",
      customFieldName: "string",
      required: "boolean",
      helpText: "html",
    },
  }
);