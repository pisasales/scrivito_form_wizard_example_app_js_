import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormSelectWidget.scss";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Select } from "./SelectComponent";

Scrivito.provideComponent("FormSelectWidget", ({ widget }) => {
  const items = widget.get("items");
  const isSingleSelect = widget.get("selectionType") == "single";
  if (!items.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Add items in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="select-container mb-3">
      <div className="select-title">
        <p>{widget.get("title")}
          {isSingleSelect && widget.get("required") && RequiredPopOver()}
          {widget.get("helpText") && HelpTextPopOver(widget)}
        </p>
      </div>

      <div className="row">
        {items.map((itemValue, index) => (
          <Select
            selectionType={isSingleSelect ? "single" : "multi"}
            name={getFieldName(widget)}
            value={itemValue}
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