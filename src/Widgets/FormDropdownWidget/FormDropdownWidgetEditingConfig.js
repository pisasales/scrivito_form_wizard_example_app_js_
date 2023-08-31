import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormDropdownWidget", {
  title: "Form Dropdown",
  attributes: {
    options: {
      title: "Options"
    },
    title: { title: "Title" },
    customFieldName: { title: "Field name" },
    required: {
      title: "Mandatory"
    },
    helpText: { title: "Help text" }
  },
  properties: ["title", "options", "customFieldName", "required", "helpText"],
  initialContent: {
    title: "Select",
    customFieldName: "custom_",
    options: ["A", "B", "C"]
  },
  validations: [
    [
      "options",

      (options) => {
        if (options.length < 2) {
          return {
            message: "The widget must include at least two options.",
            severity: "error"
          };
        }
      },
    ],
    customFieldNameValidation,
    insideFormOrStepContainerValidation
  ],
});
