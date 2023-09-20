import * as Scrivito from "scrivito";
import loadable from "@loadable/component";
import formContainerWidgetIcon from "../../assets/images/form_container_widget.svg";
import { ColumnContainerWidget } from "../ColumnContainerWidget/ColumnContainerWidgetClass";
import { ColumnWidget } from "../ColumnWidget/ColumnWidgetClass";
import { FormInputFieldWidget } from "../FormInputFieldWidget/FormInputFieldWidgetClass";
import { TextWidget } from "../TextWidget/TextWidgetClass";
import { pseudoRandom32CharHex } from "./utils/pseudoRandom32CharHex";
import { getFormContainer } from "./utils/getFormContainer";
import { FormStepWidget } from "../FormStepWidget/FormStepWidgetClass";
import { FormSelectWidget } from "../FormSelectWidget/FormSelectWidgetClass";
import { FormRatingWidget } from "../FormRatingWidget/FormRatingWidgetClass";

Scrivito.provideEditingConfig("FormContainerWidget", {
  title: "Form",
  thumbnail: formContainerWidgetIcon,
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
      title: "Forward button text",
    },
    backwardButtonText: {
      title: "Backward button text",
    },
    submitButtonText: {
      title: "Submit button text",
    },
    formType: {
      title: "Format",
      values: [
        { value: "single-step", title: "Single step" },
        { value: "multi-step", title: "Multi steps" },
      ],
    },
    showBorder: { title: "Show as box" },
    singleSubmitButtonAlignment: {
      title: "Alignment",
      values: [
        { value: "left", title: "Left" },
        { value: "text-center", title: "Center" },
        { value: "text-end", title: "Right" },
        { value: "block", title: "Full width" },
      ],
    },
  },
  properties: [
    "formType",
    "showBorder",
    "submittingMessage",
    "submittedMessage",
    "failedMessage",
  ],
  propertiesGroups: (obj) => {
    const groups = [
      {
        title: "Hidden fields",
        key: "FormContainerWidgetHiddenFields",
        properties: ["hiddenFields"],
      },
      {
        title: "Form submissions",
        key: "FormContainerWidgetFormSubmissions",
        properties: ["formId"],
        component: loadable(
          async () =>
            (await import("./components/FormIdComponent")).FormIdComponent
        ),
      },
      {
        title: "Navigation",
        key: "FormNavigationButtons",
        properties: getNavigationProperties(obj),
      },
    ];
    if (obj.get("formType") == "multi-step")
      groups.unshift({
        title: "Steps",
        key: "FormSteps",
        properties: ["steps"],
      });
    return groups;
  },

  initialContent: {
    formId: () => pseudoRandom32CharHex(),
    submittingMessage: "Submitting...",
    submittedMessage:
      "Your message has been successfully sent. Thank you for your request. We will get back to you as soon as possible.",
    failedMessage:
      "We are sorry, your request could not be completed. Please try again later.",
    formType: "single-step",
    singleStepContent: () => [
      new ColumnContainerWidget({
        columns: [
          new ColumnWidget({
            colSize: 6,
            content: [
              new FormInputFieldWidget({
                type: "given_name",
                label: "First name",
                placeholder: "Your first name",
                required: true,
              }),
            ],
          }),
          new ColumnWidget({
            colSize: 6,
            content: [
              new FormInputFieldWidget({
                type: "family_name",
                label: "Last name",
                placeholder: "Your last name",
                required: true,
              }),
            ],
          }),
        ],
      }),
      new FormInputFieldWidget({
        label: "Email",
        placeholder: "Your email address",
        type: "email",
        required: true,
      }),
      new FormInputFieldWidget({
        type: "company",
        label: "Company",
        placeholder: "Your company",
      }),

      new FormInputFieldWidget({
        type: "custom",
        customType: "multi_line",
        customFieldName: "custom_message",
        label: "Message",
        placeholder: "Your message",
        required: true,
      }),
      new TextWidget({
        text: "<p>By submitting, you agree to the terms and conditions of our privacy policy.</p>",
      }),
    ],
    singleSubmitButtonAlignment: "text-center",
    steps: [
      new FormStepWidget({
        items: [
          new FormSelectWidget({
            title: "Please choose",
            items: ["Car", "Boat"],
            selectionType: "radio",
            customFieldName: "custom_please_choose",
          }),
        ],
      }),
      new FormStepWidget({
        items: [
          new FormRatingWidget({
            title: "Please rate us",
            customFieldName: "custom_rating",
          }),
        ],
      }),
    ],
    forwardButtonText: "Forward",
    backwardButtonText: "Backward",
    submitButtonText: "Submit",
    showBorder: false,
  },
  validations: [
    (widget) => {
      if (getFormContainer(widget)) {
        return "Needs to be outside of a form.";
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

/**
 * Retrieves the properties for the navigation tab
 * @param {*} obj
 * @returns an array of strings containing the properties to be shown
 */
function getNavigationProperties(obj) {
  const p = ["forwardButtonText", "backwardButtonText", "submitButtonText"];
  if (obj.get("formType") == "single-step")
    p.push("singleSubmitButtonAlignment");
  return p;
}
