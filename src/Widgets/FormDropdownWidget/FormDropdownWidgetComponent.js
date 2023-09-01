import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";

import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormDropdownWidget.scss";
import { FormDropdownWidget } from "./FormDropdownWidgetClass"
import { DropdownOption } from "./DropdownOption";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";

Scrivito.provideComponent(FormDropdownWidget, ({ widget }) => {
  const options = widget.get("options");

  if (!options.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select options in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="mb-3 dropdown-container">
      <label htmlFor={widget.id()}>
        {widget.get("title")}
        {widget.get("required") && RequiredPopOver()}
        {widget.get("helpText") && HelpTextPopOver(widget)}
      </label>
      <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")}>
        {
          <DropdownOption
            value={""}
            id={"empty-option"}
            key={"empty-option"}
          />
        }
        {options.map((optionValue, index) => (
          <DropdownOption
            value={optionValue}
            id={index}
            key={index}
          />
        ))}
      </select>
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
  </OverlayTrigger>);
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
  );
}
