import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormSingleSelectWidget", {
  title: "Form Single Select",
  attributes: {
    radios: {
      title: "Radio buttons",
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
      "Yes", "No", "Maybe"
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