import * as React from "react";
import * as Scrivito from "scrivito";
import { Review } from "./ReviewComponent";
import { getFieldName } from "../utils/getFieldName";
import { map, uniq } from "lodash-es";
export const FormFooterMultiSteps = Scrivito.connect(
  ({
    widget,
    onPageChange,
    onSubmit,
    currentStep,
    isLastPage,
    stepsLength,
    showReview,
  }) => {
    const [show, setShow] = React.useState(false);
    const [reviewData, setReviewData] = React.useState([]);
    const doShowReview = isLastPage && showReview;

    return (
      <>
        <div className="form-buttons">
          <button
            className="btn btn-primary backward-button"
            onClick={() => onPageChange(false)}
            hidden={currentStep == 1 && !Scrivito.isInPlaceEditingActive()}
          >
            {widget.get("backwardButtonText")}
          </button>
          <div className="step-counter">
            {currentStep + " / " + stepsLength}
          </div>
          {doShowReview && (
            <button
              className="btn btn-primary review-button"
              onClick={() => onShowReview(widget, setReviewData, setShow)}
            >
              {widget.get("reviewButtonText")}
            </button>
          )}
          <button
            className="btn btn-primary forward-button"
            onClick={isLastPage ? onSubmit : () => onPageChange(true)}
          >
            {isLastPage
              ? widget.get("submitButtonText")
              : widget.get("forwardButtonText")}
          </button>
        </div>
        {doShowReview && show && (
          <Review
            widget={widget}
            reviewData={reviewData}
            onHide={() => setShow(false)}
          />
        )}
      </>
    );
  }
);


function onShowReview(widget, setReviewData, setShow) {
  const form = document.getElementById(widget.get("formId"));
  const data = new FormData(form);
  const joinedFormData = new FormData();
  // show all field-names with equal name as a comma separated string
  for (const [name, value] of data) {
    console.log(name)
    if (joinedFormData.has(name)) {
      continue;
    } else {
      joinedFormData.set(name, data.getAll(name).join(", "));
    }
  }

  const steps = widget.get("steps");
  const widgets = steps.flatMap((s) => s.widgets());
  const showEmptyAnswers = widget.get("showEmptyAnswers");
  const inputs = Array.from(form.querySelectorAll("input, select, textarea"));
  const inputNames = uniq(map(inputs,i=>i.name))
  const reviewData = [];

  for (const key of inputNames) {
    const answer = joinedFormData.get(key);
    if (answer == undefined || answer == "") {
      // do not show empty answers
      if (!showEmptyAnswers) {
        continue;
      }
    }
    // check if is hidden
    const input = inputs.find((i) => i.name == key);
    // remove fax if possible
    if (key == "fax" || input.type == "hidden" && !input.classList.contains("show-in-review")) {
      // do not show hidden inputs
      continue;
    }
    // get title && step number
    const widget = widgets.find((w) => getFieldName(w) == key);
    if (widget) {
      const step = steps.find(s=>s.widgets().find(w=>getFieldName(w) == key));
      const stepNumber = step.get("stepNumber");
      const title = widget.get("label") || widget.get("title");

      if(!reviewData[stepNumber]) {
        reviewData[stepNumber] = [];
      }
      reviewData[stepNumber].push({
        title: title,
        value: getValue(answer, widget)
      });
    }
  }
  setReviewData(reviewData);
  setShow(true);
}
function getValue(answer, widget) {
  const emptyValue = "-";
  if (!answer || answer.length <= 0) {
    return emptyValue;
  }
  const className = widget.objClass();
  if (className != "FormDateWidget") {
    return answer;
  }
  const type = widget.get("dateType");
  if (type == "date") {
    return new Date(answer).toLocaleDateString();
  } else if (type == "datetime-local") {
    return new Date(answer).toLocaleString();
  }
  return answer;
}