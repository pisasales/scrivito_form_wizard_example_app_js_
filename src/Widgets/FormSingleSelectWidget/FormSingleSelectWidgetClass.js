import * as Scrivito from "scrivito";

export const FormSingleSelectWidget = Scrivito.provideWidgetClass(
  "FormSingleSelectWidget",
  {
    onlyInside: "FormMultiSelectWidget",
    attributes: {
      text: "string",
    },
  }
);