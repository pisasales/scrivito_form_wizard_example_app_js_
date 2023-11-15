import * as React from "react";
import * as Scrivito from "scrivito";
import { scrollIntoView } from "./utils/scrollIntoView";
import { FormFooterMultiSteps } from "./components/FormFooterMultiStepsComponent";
import { FormFooterSingleStep } from "./components/FormFooterSingleStepComponent";
import { FormHiddenFields } from "./components/FormHiddenFieldsComponent";
import { submitForm } from "./utils/submitForm";
import "./FormContainerWidget.scss";

Scrivito.provideComponent("FormContainerWidget", ({ widget }) => {
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${process.env.SCRIVITO_TENANT}/form_submissions`;
  const [currentStep, setCurrentStepNumber] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);
  const isSingleStep = widget.get("formType") == "single-step";
  const stepsLength = widget.get("steps").length;
  const isLastPage = currentStep == stepsLength;
  const showReview = widget.get("showReview");

  React.useEffect(() => {
    if (!Scrivito.isInPlaceEditingActive()) {
      return;
    }
    // in order to show step number in the props title of each step
    const steps = widget.get("steps");
    steps.forEach((step, i) => {
      const stepNumber = i + 1;
      step.update({
        stepNumber: stepNumber,
        isSingleStep: isSingleStep,
      });
    });
    if (steps.length > 1 && isSingleStep) {
      widget.update({ formType: "multi-step" });
    } else if (steps.length == 1 && !isSingleStep) {
      widget.update({ formType: "single-step" });
    }
  }, [widget.get("steps")]);

  if (isSubmitting) {
    return (
      <div className="form-container-widget text-center">
        <i className="fa fa-spin fa-spinner fa-2x" aria-hidden="true"></i>{" "}
        <span className="text-super">{widget.get("submittingMessage")}</span>
      </div>
    );
  }

  if (successfullySent) {
    return (
      <div className="form-container-widget text-center">
        <i className="fa fa-check fa-2x" aria-hidden="true"></i>{" "}
        <span className="text-super">{widget.get("submittedMessage")}</span>
      </div>
    );
  }

  if (submissionFailed) {
    return (
      <div className="form-container-widget text-center">
        <i className="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i>{" "}
        <span className="text-super">{widget.get("failedMessage")}</span>
      </div>
    );
  }

  return (
    <div
      className={`form-container-widget ${
        widget.get("showBorder") ? "form-border" : ""
      }`}
    >
      <form method="post" id={widget.get("formId")}>
        <FormHiddenFields widget={widget} />
        <Scrivito.ContentTag
          content={widget}
          attribute={"steps"}
          widgetProps={{
            getData: (stepId) => {
              const steps = widget.get("steps");
              let isActive = false;
              let stepNumber = 0;
              steps.some((step, index) => {
                if (step.id() == stepId) {
                  stepNumber = index + 1;
                  isActive = stepNumber == currentStep;
                  return true;
                }
              });
              return { stepNumber, isActive, isSingleStep };
            },
          }}
        />
      </form>
      {isSingleStep ? (
        <FormFooterSingleStep widget={widget} onSubmit={onSubmit} />
      ) : (
        <FormFooterMultiSteps
          widget={widget}
          onSubmit={onSubmit}
          onPageChange={onPageChange}
          currentStep={currentStep}
          stepsLength={stepsLength}
          isLastPage={isLastPage}
          showReview={showReview}
        />
      )}
    </div>
  );

  async function onSubmit() {
    if (Scrivito.isInPlaceEditingActive()) {
      return;
    }
    const isValid = validateCurrentStep();
    if (!isValid) {
      return;
    }
    const formElement = document.getElementById(widget.get("formId"));
    scrollIntoView(formElement);

    indicateProgress();
    try {
      await submitForm(formElement, formEndpoint, widget);
      indicateSuccess();
    } catch (e) {
      setTimeout(() => {
        throw e;
      }, 0);

      indicateFailure();
    }
  }

  function indicateProgress() {
    setIsSubmitting(true);
    setSuccessfullySent(false);
    setSubmissionFailed(false);
  }

  function indicateSuccess() {
    setIsSubmitting(false);
    setSuccessfullySent(true);
    setSubmissionFailed(false);
  }

  function indicateFailure() {
    setIsSubmitting(false);
    setSuccessfullySent(false);
    setSubmissionFailed(true);
  }

  function validateCurrentStep() {
    return doValidate(widget.get("formId"), currentStep);
  }

  function onPageChange(next) {
    let isValid = true;

    if (Scrivito.isInPlaceEditingActive()) {
      return;
    }
    if (next) {
      isValid = validateCurrentStep();
    }
    if (!isValid) {
      return;
    }
    const stepNumber = next
      ? Math.min(currentStep + 1, stepsLength)
      : Math.max(currentStep - 1, 1);
    setCurrentStepNumber(stepNumber);
    const formElement = document.getElementById(widget.get("formId"));
    scrollIntoView(formElement);
  }
});

function doValidate(formId, currentStep) {
  let isValid = true;
  const form = document.getElementById(formId);
  if (form) {
    const step = form.querySelector(`[data-step-number='${currentStep}']`);
    if (step) {
      const allInputs = step.querySelectorAll("input, select, textarea") || [];
      for (const node of allInputs.values()) {
        if (!node.checkValidity()) {
          node.reportValidity();
          return (isValid = false);
        }
      }
    }
    return isValid;
  }
}
