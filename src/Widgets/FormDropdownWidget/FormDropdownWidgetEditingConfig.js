import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormDropdownWidget", {
  title: "Form Dropdown",
  attributes: {
    options: {
      title: "Options",
    },
    title: { title: "Title" },
    customFieldName: { title: "Field name" },
    required: {
      title: "Mandatory",
      description: 'Enable "Add empty option" in order to work'
    },
    emptyOption: {
      title: "Add empty option",
      description: "Add an empty option at the beginning. Needs to be enabled for mandatory check!"
    },
    helpText: { title: "Help text" },
  },
  properties: ["title", "options", "customFieldName", "required", "emptyOption", "helpText"],
  initialContent: {
    title: "Select",
    customFieldName: "custom_"
  },
  validations: [
    [
      "options",

      (options) => {
        if (options.length < 2) {
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
