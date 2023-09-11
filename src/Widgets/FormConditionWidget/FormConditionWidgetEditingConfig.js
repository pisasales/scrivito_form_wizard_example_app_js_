import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";

Scrivito.provideEditingConfig("FormConditionWidget", {
  title: "Form Condition",
  titleForContent(obj) {
    return "Condition: " + obj.get("title");
  },
  attributes: {
    title: { title: "Title" },
    content: { title: "Content" },
  },
  properties: ["title", "content"],
  validations: [insideFormOrStepContainerValidation],
});
