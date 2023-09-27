import * as Scrivito from "scrivito";
import { insideFormContainerValidation } from "../FormContainerWidget/utils/validations/insideFormContainerValidation";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";

Scrivito.provideEditingConfig("FormStepWidget", {
  title: "Form Step",
  titleForContent: (widget) => {
    return "Step " + widget.get("stepNumber");
  },
  attributes: {
    items: {
      title: "Items",
    },
  },
  properties: ["items"],

  validations: [
    insideFormContainerValidation,
    [
      "items",
      (items) => {
        if (items.length < 1) {
          return {
            message: "The step must include at least one item.",
            severity: "error",
          };
        }
      },
    ],
    customFieldNameValidation,
  ],
});
