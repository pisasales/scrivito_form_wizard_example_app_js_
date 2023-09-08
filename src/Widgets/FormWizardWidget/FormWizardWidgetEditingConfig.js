import * as Scrivito from "scrivito";
import loadable from "@loadable/component";
import { pseudoRandom32CharHex } from "../FormContainerWidget/utils/pseudoRandom32CharHex";
import { getFormWizardContainer } from "./utils/getFormWizardContainer";
import { getFormContainer } from "../FormContainerWidget/utils/getFormContainer";
import { FormStepWidget } from "../FormStepWidget/FormStepWidgetClass";
import { FormSelectWidget } from "../FormSelectWidget/FormSelectWidgetClass";
import { FormRatingWidget } from "../FormRatingWidget/FormRatingWidgetClass";

Scrivito.provideEditingConfig("FormWizardWidget", {
  title: "Form Wizard",
  attributes: {
    formId: {
      title: "Form ID",
      description: "This ID identifies the form in Neoletter.",
    },
    submittingMessage: {
      title: "Message shown while the form is being submitted",
    },
    submittedMessage: {
      title: "Message shown after the form was successfully submitted",
    },
    failedMessage: {
      title: "Message shown if the form submission failed",
    },
    hiddenFields: {
      title: "Hidden fields",
    },
    forwardButtonText: {
      title: "Forward button text"
    },
    backwardButtonText: {
      title: "Backward button text"
    },
    submitButtonText: {
      title: "Submit button text"
    }
  },
  properties: ["submittingMessage", "submittedMessage", "failedMessage", "steps"],
  propertiesGroups: [
    {
      title: "Hidden fields",
      key: "FormWizardWidgetHiddenFields",
      properties: ["hiddenFields"],
    },
    {
      title: "Form submissions",
      key: "FormWizardWidgetFormSubmissions",
      properties: ["formId"],
      component: loadable(
        async () => (await import("../FormContainerWidget/FormIdComponent")).FormIdComponent
      ),
    },
    {
      title: "Buttons",
      key: "FormWizardButtons",
      properties: ["forwardButtonText", "backwardButtonText", "submitButtonText"],
    },
  ],
  initialContent: {
    formId: () => pseudoRandom32CharHex(),
    submittingMessage: "Submitting...",
    submittedMessage:
      "Your message has been successfully sent. Thank you for your request. We will get back to you as soon as possible.",
    failedMessage:
      "We are sorry, your request could not be completed. Please try again later.",
    steps: [
      new FormStepWidget({
        questions: [
          new FormSelectWidget({ title: "Please choose", items: ["Car", "Boat"], selectionType: "radio", customFieldName: "custom_please_choose" })
        ]
      }),
      new FormStepWidget({
        questions: [
          new FormRatingWidget({ title: "Please rate us", customFieldName: "custom_rating" })
        ]
      })
    ],
    forwardButtonText: "Forward",
    backwardButtonText: "Backward",
    submitButtonText: "Submit",
  },
  validations: [
    (widget) => {
      if (getFormWizardContainer(widget) || getFormContainer(widget)) {
        return "Needs to be outside of a form.";
      }
      if (widget.get("steps").length < 2) {
        return "Widget must at least contain two steps.";
      }
    },
    [
      "submittingMessage",
      (submittingMessage) => {
        if (!submittingMessage) {
          return "Specify the message to be displayed during form submission.";
        }
      },
    ],

    [
      "submittedMessage",
      (submittedMessage) => {
        if (!submittedMessage) {
          return "Specify the message to be displayed after successful form submission.";
        }
      },
    ],

    [
      "failedMessage",
      (failedMessage) => {
        if (!failedMessage) {
          return "Specify the message to be displayed after form submission failed.";
        }
      },
    ],

    [
      "formId",
      (formId) => {
        if (!formId) {
          return "Specify the form ID.";
        }

        if (formId.match(/^[0-9a-fA-F]{32}$/) === null) {
          return "Specify a valid form ID (32 character hex value).";
        }
      },
    ],
  ],
});
