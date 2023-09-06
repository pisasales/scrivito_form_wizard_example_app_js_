import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormTabWidget", {
  title: "Form Tab",
  titleForContent(obj) {
    return "Tab: " + obj.get("title");
  },
  attributes: {
    title: { title: "Title" },
    content: { title: "Content" },
  },
  properties: ["title", "content"],
  validations: [
    insideFormOrStepContainerValidation
  ],
});