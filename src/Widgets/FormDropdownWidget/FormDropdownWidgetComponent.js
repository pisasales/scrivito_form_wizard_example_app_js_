import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormDropdownWidget.scss";
import { FormDropdownWidget } from "./FormDropdownWidgetClass"
import { DropdownOption } from "./DropdownOption";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Mandatory } from "../FormContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormContainerWidget/components/HelpTextComponent";

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
        {widget.get("required") && <Mandatory/>}
        {widget.get("helpText") && <HelpText widget={widget} />}
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
