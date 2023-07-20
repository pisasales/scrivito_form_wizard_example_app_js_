import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";

Scrivito.provideEditingConfig("FormRatingWidget", {
  title: "Form Rating",
  attributes: {
    title: { title: "Title" },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" }
  },
  properties: ["title", "customFieldName", "helpText"],
  initialContent: {
    title: "Please rate us",
    customFieldName: "custom_"
  },
  validations: [
    insideFormOrStepContainerValidation,
    customFieldNameValidation
  ],
});