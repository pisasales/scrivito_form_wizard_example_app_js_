import * as React from "react";

export const SingleRadioButton = (({ value, id, name, required, onChange }) => {
    return (
        <label className="form-check-label">
            <input
                className="form-check-input"
                name={name}
                required={required}
                type="radio"
                value={value}
                onChange={onChange}
                id={id}
            />
            <span>{value}</span>
        </label>
    );
});