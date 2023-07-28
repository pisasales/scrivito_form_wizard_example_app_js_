import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";

import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormRadioButtonsWidget.scss";
import { FormRadioButtonWidget } from "../FormRadioButtonWidget/FormRadioButtonWidgetComponent";

Scrivito.provideComponent("FormRadioButtonsWidget", ({ widget }) => {
  const radios = widget.get("radios");

  if (!radios.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select radio buttons in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div className="form-radio mb-3">
      <div className="radio-title">
        <p>{widget.get("title")}
          {widget.get("required") && getRequired()}
          {widget.get("helpText") && getHelpText(widget)}
        </p>
      </div>

      <div className="row">
        {radios.map((radio, index) => (
          <FormRadioButtonWidget
            widget={widget}
            value={radio.get("text")}
            id={radio.id()}
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
  )
}