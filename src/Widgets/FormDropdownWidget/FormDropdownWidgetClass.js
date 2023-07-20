import * as Scrivito from "scrivito";

export const FormDropdownWidget = Scrivito.provideWidgetClass(
  "FormDropdownWidget",
  {
    attributes: {
      title: "string",
      options: ["widgetlist", { only: "FormDropdownOptionWidget" }],
      customFieldName: "string",
      required: "boolean",
      emptyOption: "boolean",
      helpText: "html",
    },
  }
);