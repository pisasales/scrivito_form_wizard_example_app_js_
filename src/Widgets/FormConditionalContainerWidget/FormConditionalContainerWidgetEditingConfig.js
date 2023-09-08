import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";
import { FormConditionWidget } from "../FormConditionWidget/FormConditionWidgetClass";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { FormSelectWidget } from "../FormSelectWidget/FormSelectWidgetClass";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";

Scrivito.provideEditingConfig("FormConditionalContainerWidget", {
  title: "Form Conditional Container",
  titleForContent(obj) {
    return  "Container for: " + obj.get("title");
  },
  attributes: {
    headerType: {
      title: "Input type",
      values: [
        { value: "dropdown", title: "Dropdown" },
        { value: "radio", title: "Radio buttons" }
      ],
    },
    title: { title: "Add title" },
    customFieldName: { title: "Field name" },
    required: { title: "Mandatory" },
    helpText: { title: "Help text" },
    conditions: {
      title: "Conditions",
    }
  },
  properties: ["headerType", "title", "required", "customFieldName", "conditions", "helpText"],
  initialContent: {
    headerType: "dropdown",
    title: "Select your vehicle type:",
    customFieldName: "custom_vehicle_selection",
    conditions: [new FormConditionWidget({
      title: "Car",
      content: [
        new FormSelectWidget({
          title: "Select your car model",
          customFieldName: "custom_car_model",
          items: [
            "Audi", "BMW", "Porsche"
          ],
          selectionType: "dropdown"
        }),
        new FormSelectWidget({
          selectionType: "radio",
          title: "Do you have a valid driving license?",
          customFieldName: "custom_has_license",
          required: true,
          items: [
            "Yes", "No", "Not sure"
          ]
        })
      ]
    }),
    new FormConditionWidget({
      title: "Boat",
      content: [
        new FormSelectWidget({
          title: "Select your boat type",
          customFieldName: "custom_boat_type",
          items: [
            "Canoe", "Fishing vessel", "Schooner", "Yacht"
          ],
          selectionType: "dropdown"
        }),
        new FormInputFieldWidget({
          label: "Please describe your boat",
          type: "custom",
          customType: "multi_line",
          customFieldName: "custom_boat_description",
          placeholder: "",
          required: true
        })
      ]
    })
    ],
  },
  validations: [
    insideFormOrStepContainerValidation,
    customFieldNameValidation
  ],
});

