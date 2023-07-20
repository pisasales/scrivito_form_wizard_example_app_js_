import * as Scrivito from "scrivito";

export const FormRadioButtonWidget = Scrivito.provideWidgetClass(
  "FormRadioButtonWidget",
  {
    onlyInside: "FormRadioButtonsWidget",
    attributes: {
      text: "string",
    },
  }
);