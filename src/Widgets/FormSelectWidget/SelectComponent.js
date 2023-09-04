import * as React from "react";

export const Select = (({ selectionType, value, id, name, required, onChange }) => {
    return (
        <label className="form-check-label">
            <input
                className="form-check-input"
                name={name}
                required={selectionType == "single" ? required : null}
                type={selectionType == "single" ? "radio" : "checkbox"}
                value={value}
                onChange={onChange}
                id={id}
            />
            <span>{value}</span>
        </label>
    );
});