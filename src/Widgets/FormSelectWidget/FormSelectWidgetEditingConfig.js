import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormContainerWidget/utils/validations/insideFormContainerValidation";
Scrivito.provideEditingConfig("FormSelectWidget", {
  title: "Form Select",
  attributes: {
    selectionType: {
      title: "Input type",
      values: [
        { value: "radio", title: "Radio buttons" },
        { value: "dropdown", title: "Dropdown" },
        { value: "multi", title: "Checkboxes" },
      ],
    },
    items: {
      title: "Items",
    },
    title: { title: "Label" },
    customFieldName: { title: "Field name" },
    required: { title: "Mandatory" },
    helpText: { title: "Help text" },
  },
  properties: (obj) => [
    "selectionType",
    "title",
    "items",
    "customFieldName",
    ["required", { enabled: obj.get("selectionType") !== "multi" }],
    "helpText",
  ],
  initialContent: {
    selectionType: "radio",
    title: "Please choose",
    items: ["Yes", "No"],
    customFieldName: "custom_",
  },
  validations: [
    [
      "items",

      (items) => {
        if (items.length < 2) {
          return {
            message: "The widget must include at least two items.",
            severity: "error",
          };
        }
      },
    ],
    customFieldNameValidation,
    insideFormContainerValidation,
  ],
});
