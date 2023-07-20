import * as Scrivito from "scrivito";

const formWidgets = ["TextWidget", "DividerWidget", "FormRadioButtonsWidget", "FormMultiSelectWidget", "FormRatingWidget", "FormCheckboxWidget", "FormInputFieldWidget", "FormDropdownWidget"];
export const FormStepWidget = Scrivito.provideWidgetClass(
  "FormStepWidget",
  {
    // onlyInside:  "FormWizardWidget",
    attributes: {
      questions: ["widgetlist", { only: formWidgets }],
    },
  }
);