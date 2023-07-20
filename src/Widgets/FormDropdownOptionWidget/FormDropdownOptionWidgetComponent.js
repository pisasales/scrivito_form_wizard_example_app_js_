import * as React from "react";
export const FormDropdownOptionWidget = (({ widget, value }) => {
  return (
    <option
      required={widget.get("required")}
      value={value}
    >
      {value}
    </option>
  );
});