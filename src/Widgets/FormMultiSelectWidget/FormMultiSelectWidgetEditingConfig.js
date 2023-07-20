import * as Scrivito from "scrivito";
import { FormSingleSelectWidget } from "../FormSingleSelectWidget/FormSingleSelectWidgetClass";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormMultiSelectWidget", {
  title: "Form Multi Select",
  attributes: {
    checkboxes: {
      title: "Checkboxes",
    },
    title: { title: "Title" },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },

  },
  properties: ["title", "checkboxes", "customFieldName", "helpText"],
  initialContent: {
    title: "Please choose:",
    checkboxes: [
      new FormSingleSelectWidget({ text: "Car" }),
      new FormSingleSelectWidget({ text: "Boat" })
    ],
    customFieldName: "custom_"
  },
  validations: [
    [
      "checkboxes",

      (checkboxes) => {
        if (checkboxes.length < 2) {
          return {
            message: "The widget must include at least two items.",
            severity: "error",
          };
        }
      },
    ],
    insideFormOrStepContainerValidation,
    customFieldNameValidation
  ]
});