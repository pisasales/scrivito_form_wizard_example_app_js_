import * as Scrivito from "scrivito";

export const FormSingleSelectWidget = Scrivito.provideWidgetClass(
  "FormSingleSelectWidget",
  {
    attributes: {
      title: "string",
      radios: "stringlist",
      customFieldName: "string",
      required: "boolean",
      helpText: "html",
    },
  }
);