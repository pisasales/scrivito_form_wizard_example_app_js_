import * as Scrivito from "scrivito";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";
import { insideFormContainerValidation } from "../FormContainerWidget/utils/validations/insideFormContainerValidation";
Scrivito.provideEditingConfig("FormDateWidget", {
  title: "Form Date",
  attributes: {
    title: { title: "Label" },
    dateType: {
      title: "Format",
      values: [
        { value: "date", title: "Date" },
        { value: "datetime-local", title: "Date and time" },
      ],
    },
    customFieldName: { title: "Field name" },
    helpText: { title: "Help text" },
    required: { title: "Mandatory" },
  },
  properties: ["title", "dateType", "customFieldName", "required", "helpText"],
  initialContent: {
    title: "Please enter a date",
    customFieldName: "custom_",
    dateType: "date",
  },
  validations: [insideFormContainerValidation, customFieldNameValidation],
});
