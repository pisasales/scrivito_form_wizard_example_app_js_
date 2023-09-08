import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { DropdownOption } from "../FormContainerWidget/components/DropdownOption";
import { Select } from "../FormContainerWidget/components/SelectComponent";
import { Mandatory } from "../FormContainerWidget/components/MandatoryComponent";
import { HelpText } from "../FormContainerWidget/components/HelpTextComponent";

export const ConditionalHeader = ({ widget, onChangeSelected }) => {
    const isDropdownHeader = widget.get("headerType") == "dropdown";

    return (
        <>
            {Scrivito.isInPlaceEditingActive() &&
                <span className="header-info">TAB HEADER</span>
            }
            {isDropdownHeader ?
                <DropdownHeader
                    widget={widget}
                    onChangeSelected={onChangeSelected}
                />
                :
                <RadioButtonsHeader
                    widget={widget}
                    onChangeSelected={onChangeSelected}
                />
            }
        </>
    );
}

const EmptyOption = () => {
    return (
        <DropdownOption
            value={""}
            id={"empty-option"}
            key={"empty-option"}
        />
    )
}

const DropdownHeader = Scrivito.connect(({ widget, onChangeSelected }) => {
    return (
        <div className={getClassNames(widget)}>
            <label htmlFor={widget.id()}>
                {widget.get("title")}
                {widget.get("required") && <Mandatory />}
                {widget.get("helpText") && <HelpText widget={widget} />}
            </label>
            <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")} onChange={onChangeSelected}>
                <EmptyOption />
                {
                    widget.get("conditions").map((condition, index) => (
                        <DropdownOption
                            value={condition.get("title")}
                            id={condition.id()}
                            key={index}
                        />
                    ))
                }
            </select>
        </div>
    )

}
)
const RadioButtonsHeader = Scrivito.connect(({ widget, onChangeSelected }) => {
    return (

        <div className={getClassNames(widget)}>
            <div className="select-title">
                <p>{widget.get("title")}
                    {widget.get("required") && <Mandatory />}
                    {widget.get("helpText") && <HelpText widget={widget} />}
                </p>
            </div>

            <div className="row ">
                {widget.get("conditions").map((condition, index) => (
                    <Select
                        selectionType={"single"}
                        name={getFieldName(widget)}
                        onChange={onChangeSelected}
                        value={condition.get("title")}
                        id={condition.id()}
                        required={widget.get("required")}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )

});

const getClassNames = (widget) => {
    let classNames = "mb-3 ";
    classNames += widget.get("headerType") == "dropdown" ? "dropdown-container " : "select-container";
    if (Scrivito.isInPlaceEditingActive()) {
        classNames += " condition-wrapper";
    }
    return classNames;
}
