import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { FormDropdownOptionWidget } from "../FormDropdownOptionWidget/FormDropdownOptionWidgetComponent";
import { FormRadioButtonWidget } from "../FormRadioButtonWidget/FormRadioButtonWidgetComponent";

export const TabHeader = ({ widget, onChangeSelected }) => {
  const [tabs, setTabs] = React.useState(widget.get("tabs"));
  // update necessary to show latest added tab title 
  // when user adds/changes it
  React.useEffect(() => {
    setTabs(widget.get("tabs"))
  }, [widget.get("tabs")]);

    return (
        <>
            {Scrivito.isInPlaceEditingActive() &&
                <span className="header-info">TAB HEADER</span>
            }
            {widget.get("headerType") == "dropdown" ?
                renderDropdownHeader(widget,tabs, onChangeSelected)
                :
                renderRadioButtonsHeader(widget,tabs, onChangeSelected)
            }
        </>
    )

}

const renderDropdownHeader = (widget,tabs, onChangeSelected) => {
    return (
        <div className={getClassNames(widget)}>
            <label htmlFor={widget.id()}>
                {widget.get("title")}
                {widget.get("required") && getRequired()}
                {widget.get("helpText") && getHelpText(widget)}
            </label>
            <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")} onChange={onChangeSelected}>
                {
                    <FormDropdownOptionWidget
                        widget={widget}
                        value=""
                        id="empty-option"
                    />
                }
                {
                    tabs.map((tab, index) => (
                    <FormDropdownOptionWidget
                        widget={widget}
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

const renderRadioButtonsHeader = (widget,tabs, onChangeSelected) => {
return (

<div className={getClassNames(widget)}>
<div className="radio-title">
  <p>{widget.get("title")}
    {widget.get("required") && getRequired()}
    {widget.get("helpText") && getHelpText(widget)}
  </p>
</div>

<div className="row">
  {tabs.map((tab, index) => (
    <FormRadioButtonWidget
      widget={widget}
      onChange={onChangeSelected}
      value={tab.get("title")}
      id={tab.id()}
      key={index}
    />
  ))}
</div>
</div>
)

}

const getClassNames = (widget) => {
    let classNames = "mb-3 ";
    classNames += widget.get("headerType") == "dropdown" ? "dropdown-container " : "form-radio";
    if (Scrivito.isInPlaceEditingActive()) {
      classNames += " condition-wrapper";
    }
    return classNames;
  }
  
  const getHelpText = (widget) => {
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
  
  const getRequired = () => {
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