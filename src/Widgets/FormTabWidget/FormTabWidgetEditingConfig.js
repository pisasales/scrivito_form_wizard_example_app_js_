import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormTabWidget", {
  title: "Form Tab",
  attributes: {
    title: { title: "Title" },
    content: { title: "Content" },
  },
  properties: ["title", "content"],
  validations: [
    insideFormOrStepContainerValidation
  ],
});