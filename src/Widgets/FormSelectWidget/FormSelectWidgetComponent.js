import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormSelectWidget.scss";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Select } from "./SelectComponent";
import { Mandatory } from "../FormContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormContainerWidget/components/HelpTextComponent";

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
          {(isSingleSelect && widget.get("required")) && <Mandatory />}
          {widget.get("helpText") && <HelpText widget={widget} />}
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
