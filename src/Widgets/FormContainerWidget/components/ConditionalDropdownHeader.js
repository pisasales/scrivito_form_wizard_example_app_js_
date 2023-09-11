import * as React from "react";
import * as Scrivito from "scrivito";
import { Mandatory } from "./MandatoryComponent";
import { HelpText } from "./HelpTextComponent";
import { getFieldName } from "../utils/getFieldName";
import { DropdownOption } from "./DropdownOption";
export const DropdownHeader = Scrivito.connect(
  ({ widget, onChangeSelected }) => {
    return (
      <div
        className={`mb-3 dropdown-container ${
          Scrivito.isInPlaceEditingActive() ? "condition-wrapper" : ""
        }`}
      >
        <div className="select-title">
          <span>{widget.get("title")}</span>
          {widget.get("required") && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </div>
        <select
          name={getFieldName(widget)}
          id={widget.id()}
          required={widget.get("required")}
          onChange={onChangeSelected}
        >
          <EmptyOption />
          {widget.get("conditions").map((condition, index) => (
            <DropdownOption
              value={condition.get("title")}
              id={condition.id()}
              key={index}
            />
          ))}
        </select>
      </div>
    );
  }
);

const EmptyOption = () => {
  return <DropdownOption value={""} id={"empty-option"} key={"empty-option"} />;
};
