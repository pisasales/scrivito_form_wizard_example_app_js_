import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { scrollIntoView } from "../FormContainerWidget/utils/scrollIntoView";
import { getHistory } from "../../config/history";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormWizardWidget.scss";

Scrivito.provideComponent("FormWizardWidget", ({ widget }) => {
  const formEndpoint = `https://api.justrelate.com/neoletter/instances/${process.env.SCRIVITO_TENANT}/form_submissions`;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);
  const [submissionFailed, setSubmissionFailed] = React.useState(false);
  const [currentStep, setCurrentStepnumber] = React.useState(1);
  const [browserLocation, setBrowserLocation] = React.useState(null);
  const stepsLength = widget.get("steps").length;
  const isLastPage = currentStep == stepsLength;

  React.useEffect(() => {
    const history = getHistory();
    if (!history) return;
    setBrowserLocation(locationToUrl(history.location));

    return history.listen(({ location }) =>
      setBrowserLocation(locationToUrl(location))
    );
  }, []);

  if (stepsLength < 2) {
    return (
      <InPlaceEditingPlaceholder center>
        Select steps in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  const onPageChange = (next) => {
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
    const stepNumber = next ? Math.min(currentStep + 1, stepsLength) : Math.max(currentStep - 1, 1);
    setCurrentStepnumber(stepNumber);
    const formElement = document.getElementById(widget.get("formId"));
    scrollIntoView(formElement);
  }

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
    <div className="form-wizard-widget">
      <form method="post" id={widget.get("formId")} >
        <input type="hidden" name="form_id" value={widget.get("formId")} />
        <input
          type="hidden"
          name="url"
          value={browserLocation || Scrivito.urlFor(widget.obj())}
        />
        {widget.get("hiddenFields").map((hiddenField) => (
          <HiddenField key={hiddenField.id()} widget={hiddenField} />
        ))}

        <HoneypotField />

        <Scrivito.ContentTag content={widget} attribute="steps" widgetProps={{
          getData: stepId => {
            const steps = widget.get("steps");
            let cssClasses = "";
            let stepNumber = 0;
            steps.some((step, index) => {
              if (step.id() == stepId) {
                stepNumber = index + 1;
                cssClasses = (stepNumber == currentStep || Scrivito.isInPlaceEditingActive()) ? "" : "hide";
                return true;
              }
            });
            return { stepNumber, cssClasses }
          }
        }} />
      </form>
      <div className="form-buttons">
        <button
          className="btn btn-primary backward-button"
          onClick={() => onPageChange(false)}
          hidden={(currentStep == 1 && !Scrivito.isInPlaceEditingActive())}
        >
          {widget.get("backwardButtonText")}
        </button>
        <div className="step-counter">
          {currentStep + " / " + stepsLength}
        </div>
        <button
          className="btn btn-primary forward-button"
          onClick={isLastPage ? onSubmit : () => onPageChange(true)}
        >
          {isLastPage ? widget.get("submitButtonText") : widget.get("forwardButtonText")}
        </button>

      </div>
    </div>
  );

  function validateCurrentStep() {
    return doValidate(widget.get("formId"), currentStep)
  }

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
      await submit(formElement, formEndpoint);
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


});

async function submit(formElement, formEndpoint) {
  const data = new FormData(formElement);
  const dataToSend = new FormData();
  // workaround to send all field-names with equal name 
  // as a comma separated string
  for (const [name, value] of data) {
    if (dataToSend.has(name)) {
      continue;
    } else {
      dataToSend.set(name, data.getAll(name).join(", "));
    }
  }

  const body = new URLSearchParams(dataToSend);
  //console.log("submitting", Object.fromEntries(body.entries()));
  const response = await fetch(formEndpoint, { method: "post", body });
  if (!response.ok) {
    throw new Error(
      `Response was not successful. Status code: ${response.status}.`
    );
  }
}

const HiddenField = Scrivito.connect(({ widget }) => {
  const name = getFieldName(widget);
  if (!name) {
    return null;
  }

  return <input type="hidden" name={name} value={widget.get("hiddenValue")} />;
});

const HoneypotField = () => (
  <div aria-hidden="true" className="winnie-the-pooh">
    <input autoComplete="off" name="fax" tabIndex="-1" />
  </div>
);

function locationToUrl(location) {
  return `${window.location.origin}${location.pathname}${location.search}`;
}

function doValidate(formId, currentStep) {
  let isValid = true;
  const form = document.getElementById(formId);
  if (form) {
    const step = form.querySelectorAll(`[data-step-number='${currentStep}']`);
    if (step) {
      const allStepInputs = step.item(0).querySelectorAll("input, select");
      for (const node of allStepInputs.values()) {
        if (!node.checkValidity()) {
          node.reportValidity();
          return isValid = false;
        }
      }
    }
    return isValid;
  }
}