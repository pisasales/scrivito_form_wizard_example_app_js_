import * as Scrivito from "scrivito";

export const FormRadioButtonsWidget = Scrivito.provideWidgetClass(
  "FormRadioButtonsWidget",
  {
    attributes: {
      title: "string",
      radios: ["widgetlist", { only: "FormRadioButtonWidget" }],
      customFieldName: "string",
      required: "boolean",
      helpText: "html",
    },
  }
);