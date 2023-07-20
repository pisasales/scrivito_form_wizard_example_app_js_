import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";

import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormDropdownWidget.scss";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { FormDropdownOptionWidget } from "../FormDropdownOptionWidget/FormDropdownOptionWidgetComponent";
Scrivito.provideComponent("FormDropdownWidget", ({ widget }) => {
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
        {widget.get("required") && getRequired()}
        {widget.get("helpText") && getHelpText(widget)}
      </label>
      <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")}>
        {widget.get("emptyOption") &&
          <FormDropdownOptionWidget
            widget={widget}
            value=""
          />
        }
        {options.map((option, index) => (
          <FormDropdownOptionWidget
            widget={widget}
            value={option.get("text")}
            key={index}
          />
        ))}
      </select>
    </div>
  );
});

const getHelpText = (widget) => {
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

const getRequired = () => {
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