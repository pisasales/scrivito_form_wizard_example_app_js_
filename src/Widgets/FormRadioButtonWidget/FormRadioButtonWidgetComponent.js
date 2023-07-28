import * as React from "react";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
export const FormRadioButtonWidget = (({ widget, value, id, onChange}) => {
  return (<label className="form-check-label" htmlFor={id} >
    <input
      className="form-check-input"
      name={getFieldName(widget)}
      required={widget.get("required")}
      type="radio"
      value={value}
      onChange={onChange}
      id={id}
      data-id={id}
    />
    <span>{value}</span>
  </label>);
});