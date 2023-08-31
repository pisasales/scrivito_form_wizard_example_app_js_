import * as Scrivito from "scrivito";
import { insideFormOrStepContainerValidation } from "../FormWizardWidget/utils/validations/insideFormOrStepContainerValidation";
import { FormTabWidget } from "../FormTabWidget/FormTabWidgetClass";
import { FormDropdownWidget } from "../FormDropdownWidget/FormDropdownWidgetClass";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { FormRadioButtonsWidget } from "../FormRadioButtonsWidget/FormRadioButtonsWidgetClass";
import { FormRadioButtonWidget } from "../FormRadioButtonWidget/FormRadioButtonWidgetClass";
import { customFieldNameValidation } from "../FormContainerWidget/utils/validations/customFieldNameValidation";

Scrivito.provideEditingConfig("FormTabContainerWidget", {
  title: "Form Tab Container",
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
            "Audi","BMW","Porsche"
          ]
        }),
        new FormRadioButtonsWidget({
          title: "Do you have a valid driving license?",
          customFieldName: "custom_has_license",
          required:true,
          radios: [
            new FormRadioButtonWidget({ text: "Yes" }),
            new FormRadioButtonWidget({ text: "No" }),
            new FormRadioButtonWidget({ text: "Not sure" })
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
          placeholder:"",
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

