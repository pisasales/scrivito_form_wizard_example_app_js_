import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";
import { FormTabWidget } from "../FormTabWidget/FormTabWidgetClass";
import { FormDropdownWidget } from "../FormDropdownWidget/FormDropdownWidgetClass";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { FormSelectWidget } from "../FormSelectWidget/FormSelectWidgetClass";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";

Scrivito.provideEditingConfig("FormTabContainerWidget", {
  title: "Form Tab Container",
  titleForContent(obj) {
    return  "Tab Container for: " + obj.get("title");
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
    tabs: {
      title: "Tabs",
    }
  },
  properties: ["headerType", "title", "required", "customFieldName", "tabs", "helpText"],
  initialContent: {
    headerType: "dropdown",
    title: "Select your vehicle type:",
    customFieldName: "custom_vehicle_selection",
    tabs: [new FormTabWidget({
      title: "Car",
      content: [
        new FormDropdownWidget({
          title: "Select your car model",
          customFieldName: "custom_car_model",
          options: [
            "Audi", "BMW", "Porsche"
          ]
        }),
        new FormSelectWidget({
          selectionType: "single",
          title: "Do you have a valid driving license?",
          customFieldName: "custom_has_license",
          required: true,
          items: [
            "Yes", "No", "Not sure"
          ]
        })
      ]
    }),
    new FormTabWidget({
      title: "Boat",
      content: [
        new FormDropdownWidget({
          title: "Select your boat type",
          customFieldName: "custom_boat_type",
          options: [
            "Canoe", "Fishing vessel", "Schooner", "Yacht"
          ],
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

