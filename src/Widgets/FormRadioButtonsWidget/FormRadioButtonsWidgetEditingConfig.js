import * as Scrivito from "scrivito";
import { FormRadioButtonWidget } from "../FormRadioButtonWidget/FormRadioButtonWidgetClass";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormRadioButtonsWidget", {
  title: "Form Radio-buttons",
  attributes: {
    radios: {
      title: "RADIO BUTTONS",
    },
    title: { title: "Title" },
    customFieldName: { title: "Field name" },
    required: { title: "Mandatory" },
    helpText: { title: "Help text" },
  },
  properties: ["title", "radios", "customFieldName", "required", "helpText"],
  initialContent: {
    title: "Would you like to subscribe?",
    radios: [
      new FormRadioButtonWidget({ text: "Yes" }),
      new FormRadioButtonWidget({ text: "No" }),
      new FormRadioButtonWidget({ text: "Maybe" })
    ],
    customFieldName: "custom_"
  },
  validations: [
    [
      "radios",

      (radios) => {
        if (radios.length < 2) {
          return {
            message: "The widget must include at least two items.",
            severity: "error",
          };
        }
      },
    ],
    customFieldNameValidation,
    insideFormOrStepContainerValidation
  ],
});