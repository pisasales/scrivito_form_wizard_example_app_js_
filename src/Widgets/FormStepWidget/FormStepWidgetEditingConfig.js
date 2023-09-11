import * as Scrivito from "scrivito";
import { insideFormWizardValidation } from "../FormWizardWidget/utils/validations/insideFormWizardValidation";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";

Scrivito.provideEditingConfig("FormStepWidget", {
  title: "Form Step",
  attributes: {
    questions: {
      title: "Questions",
    },
  },
  properties: ["questions"],

  validations: [
    insideFormWizardValidation,
    [
      "questions",
      (questions) => {
        if (questions.length < 1) {
          return {
            message: "The page must include at least one question.",
            severity: "error",
          };
        }
      },
    ],
    customFieldNameValidation,
  ],
});
