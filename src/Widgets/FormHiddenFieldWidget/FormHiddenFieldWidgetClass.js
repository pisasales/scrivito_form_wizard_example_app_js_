import * as Scrivito from "scrivito";

export const FormHiddenFieldWidget = Scrivito.provideWidgetClass(
  "FormHiddenFieldWidget",
  {
    onlyInside: ["FormContainerWidget", "FormWizardWidget"],
    attributes: {
      customFieldName: "string",
      hiddenValue: "string",
    },
  }
);
