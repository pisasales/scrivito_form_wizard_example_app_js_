import * as React from "react";
import * as Scrivito from "scrivito";
export const FormSingleSelectWidget = (({ name, value, id }) => {
  return (<label className="form-check-label" htmlFor={id} >
    <input
      className="form-check-input"
      name={name}
      type="checkbox"
      value={value}
      id={id}
      key={id}
    />
    <span>{value}</span>
  </label>);
});