import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";

import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormMultiSelectWidget.scss";
import { FormSingleSelectWidget } from "../FormSingleSelectWidget/FormSingleSelectWidgetComponent";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";

Scrivito.provideComponent("FormMultiSelectWidget", ({ widget }) => {
  const checkboxes = widget.get("checkboxes");

  if (!checkboxes.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select some checkboxes in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="form-multi-select mb-3">
      <div className="multi-select-title">
        <p>{widget.get("title")}
          {widget.get("helpText") && getHelpText(widget)}
        </p>
      </div>
      <div className="row">
        {checkboxes.map((checkbox, index) => (
          <FormSingleSelectWidget
            name={getFieldName(widget)}
            value={checkbox.get("text")}
            id={createCheckboxId(checkbox)}
            key={index}
          />
        ))}
      </div>
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
  </OverlayTrigger>)
}

const createCheckboxId = (checkbox) => {
  return `form_checkbox_widget_${checkbox.id()}`;
}