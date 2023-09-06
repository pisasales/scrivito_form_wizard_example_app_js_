import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { DropdownOption } from "../FormDropdownWidget/DropdownOption";
import { Select } from "../FormSelectWidget/SelectComponent";

export const TabHeader = ({ widget, onChangeSelected }) => {
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
                {widget.get("required") && <RequiredPopOver />}
                {widget.get("helpText") && <HelpTextPopOver widget={widget} />}
            </label>
            <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")} onChange={onChangeSelected}>
                <EmptyOption />
                {
                    widget.get("tabs").map((tab, index) => (
                        <DropdownOption
                            value={tab.get("title")}
                            id={tab.id()}
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
                    {widget.get("required") && <RequiredPopOver />}
                    {widget.get("helpText") && <HelpTextPopOver
                        widget={widget}
                    />
                    }
                </p>
            </div>

            <div className="row ">
                {widget.get("tabs").map((tab, index) => (
                    <Select
                        selectionType={"single"}
                        name={getFieldName(widget)}
                        onChange={onChangeSelected}
                        value={tab.get("title")}
                        id={tab.id()}
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

const HelpTextPopOver = (widget) => {
    return (<OverlayTrigger
        placement="top"
        trigger="hover"
        overlay={
            <Popover>
                <Popover.Body>
                    <Scrivito.InPlaceEditingOff>
                        <Scrivito.ContentTag content={widget} attribute="helpText" />
                    </Scrivito.InPlaceEditingOff>
                </Popover.Body>
            </Popover>
        }
    >
        <i className="fa fa-question-circle-o fa-1x ml-1"></i>
    </OverlayTrigger>);
}

const RequiredPopOver = () => {
    return (
        <OverlayTrigger
            placement="top"
            trigger="hover"
            overlay={
                <Popover>
                    <Popover.Body>mandatory</Popover.Body>
                </Popover>
            }
        >
            <span className="text-mandatory">*</span>
        </OverlayTrigger>
    );
}
