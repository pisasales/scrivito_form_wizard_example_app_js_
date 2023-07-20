import * as Scrivito from "scrivito";

export const FormMultiSelectWidget = Scrivito.provideWidgetClass(
  "FormMultiSelectWidget",
  {
    attributes: {
      title: "string",
      checkboxes: ["widgetlist", { only: "FormSingleSelectWidget" }],
      helpText: "html",
      customFieldName: "string",
    },
  }
);