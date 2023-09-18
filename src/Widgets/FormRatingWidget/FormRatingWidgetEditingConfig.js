import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormContainerWidget/utils/validations/insideFormContainerValidation";
Scrivito.provideEditingConfig("FormRatingWidget", {
  title: "Form Rating",
  attributes: {
    title: { title: "Title" },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
  },
  properties: ["title", "customFieldName", "helpText"],
  initialContent: {
    title: "Please rate us",
    customFieldName: "custom_",
  },
  validations: [insideFormContainerValidation, customFieldNameValidation],
});
