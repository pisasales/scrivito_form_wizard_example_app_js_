import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormSingleSelectWidget.scss";
import { SingleRadioButton } from "./SingleRadioButton";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";

Scrivito.provideComponent("FormSingleSelectWidget", ({ widget }) => {
  const radios = widget.get("radios");

  if (!radios.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Add radio buttons in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="form-single-select mb-3">
      <div className="single-select-title">
        <p>{widget.get("title")}
          {widget.get("required") && RequiredPopOver()}
          {widget.get("helpText") && HelpTextPopOver(widget)}
        </p>
      </div>

      <div className="row">
        {radios.map((radioValue, index) => (
          <SingleRadioButton
            name={getFieldName(widget)}
            value={radioValue}
            required={widget.get("required")}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});


const HelpTextPopOver = (widget) => {
  return (<OverlayTrigger
    placement="top"
    trigger="hover"
    overlay={
      <Popover>
        <Popover.Body>
          <Scrivito.InPlaceEditingOff>
            <Scrivito.ContentTag content={widget} attribute="helpText" />
          </Scrivito.InPlaceEditingOff>
        </Popover.Body>
      </Popover>
    }
  >
    <i className="fa fa-question-circle-o fa-1x ml-1"></i>
  </OverlayTrigger>)
}

const RequiredPopOver = () => {
  return (
    <OverlayTrigger
      placement="top"
      trigger="hover"
      overlay={
        <Popover>
          <Popover.Body>mandatory</Popover.Body>
        </Popover>
      }
    >
      <span className="text-mandatory">*</span>
    </OverlayTrigger>
  )
}