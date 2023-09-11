import * as Scrivito from "scrivito";

export const FormWizardWidget = Scrivito.provideWidgetClass(
  "FormWizardWidget",
  {
    attributes: {
      content: "widgetlist",
      formId: "string",
      failedMessage: "string",
      submittedMessage: "string",
      submittingMessage: "string",
      hiddenFields: ["widgetlist", { only: "FormHiddenFieldWidget" }],
      steps: ["widgetlist", { only: "FormStepWidget" }],
      forwardButtonText: "string",
      backwardButtonText: "string",
      submitButtonText: "string",
    },
    extractTextAttributes: ["content"],
  }
);
