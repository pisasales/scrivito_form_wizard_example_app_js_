import * as React from "react";

export const MultiSelectCheckbox = (({ name, value }) => {
  return (
    <label className="form-check-label">
      <input
        className="form-check-input"
        name={name}
        type="checkbox"
        value={value}
      />
      <span>{value}</span>
    </label>
  );
});