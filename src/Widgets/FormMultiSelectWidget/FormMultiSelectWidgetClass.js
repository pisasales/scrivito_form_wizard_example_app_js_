import * as Scrivito from "scrivito";

export const FormMultiSelectWidget = Scrivito.provideWidgetClass(
  "FormMultiSelectWidget",
  {
    attributes: {
      title: "string",
      checkboxes: "stringlist",
      helpText: "html",
      customFieldName: "string",
    },
  }
);