import * as React from "react";
import * as Scrivito from "scrivito";
import { DropdownOption } from "./DropdownOption";
import { RadioButtonsHeader } from "./ConditionalRadioButtonsHeader";
import { DropdownHeader } from "./ConditionalDropdownHeader";
export const ConditionalHeader = ({ widget, onChangeSelected }) => {
    const isDropdownHeader = widget.get("headerType") == "dropdown";
    return (
        <>
            {Scrivito.isInPlaceEditingActive() &&
                <span className="header-info">Conditional Header</span>
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

// const DropdownHeader = Scrivito.connect(({ widget, onChangeSelected }) => {
//     return (
//         <div className={getClassNames(widget)}>
//             {/* <label htmlFor={widget.id()}> */}
//             <span>  {widget.get("title")} </span>
//             {widget.get("required") && <Mandatory />}
//             {widget.get("helpText") && <HelpText widget={widget} />}
//             {/* </label> */}
//             <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")} onChange={onChangeSelected}>
//                 <EmptyOption />
//                 {
//                     widget.get("conditions").map((condition, index) => (
//                         <DropdownOption
//                             value={condition.get("title")}
//                             id={condition.id()}
//                             key={index}
//                         />
//                     ))
//                 }
//             </select>
//         </div>
//     )

// }
// )


const getClassNames = (widget) => {
    let classNames = "mb-3 ";
    classNames += widget.get("headerType") == "dropdown" ? "dropdown-container " : "select-container";
    if (Scrivito.isInPlaceEditingActive()) {
        classNames += " condition-wrapper";
    }
    return classNames;
}
