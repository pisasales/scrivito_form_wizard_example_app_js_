import * as React from "react";
export const FormDropdownOptionWidget = (({ widget, value, id }) => {
  return (
    <option
      required={widget.get("required")}
      value={value}
      data-id={id}
    >
      {value}
    </option>
  );
});