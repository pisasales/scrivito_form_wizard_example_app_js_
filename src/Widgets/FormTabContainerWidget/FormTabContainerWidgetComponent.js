import * as React from "react";
import * as Scrivito from "scrivito";
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { DropdownOption } from "../FormDropdownWidget/DropdownOption";
import "./FormTabContainerWidget.scss";
import { Select } from "../FormSelectWidget/SelectComponent";

Scrivito.provideComponent("FormTabContainerWidget", ({ widget }) => {
  const [selectedTabId, setSelectedTabId] = React.useState("");
  const isDropdownHeader = widget.get("headerType") == "dropdown";
  const onChangeSelected = (e) => {
    const selectedId = isDropdownHeader ? e.target.options[e.target.selectedIndex].id : e.target.id;
    setSelectedTabId(selectedId);
  }

  return (
    <>
      {Scrivito.isInPlaceEditingActive() &&
        <span className="header-info">TAB HEADER</span>
      }
      {widget.get("headerType") == "dropdown" ?
        renderDropdownHeader(widget, onChangeSelected)
        :
        renderRadioButtonsHeader(widget, onChangeSelected)
      }

      <Scrivito.ContentTag content={widget} attribute="tabs" widgetProps={{
        getData: tabId => {
          const tabs = widget.get("tabs");
          let isActive = false;
          tabs.some((tab) => {
            if (tab.id() == tabId) {
              isActive = selectedTabId == tabId;
              return true;
            }
          });
          return { isActive }
        }
      }} />
    </>
  );
});


const renderDropdownHeader = (widget, onChangeSelected) => {
  return (
    <div className={getClassNames(widget)}>
      <label htmlFor={widget.id()}>
        {widget.get("title")}
        {widget.get("required") && getRequired()}
        {widget.get("helpText") && getHelpText(widget)}
      </label>
      <select name={getFieldName(widget)} id={widget.id()} required={widget.get("required")} onChange={onChangeSelected}>
        {
          <DropdownOption
            value={""}
            id={"empty-option"}
          />
        }
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

const renderRadioButtonsHeader = (widget, onChangeSelected) => {
  return (

    <div className={getClassNames(widget)}>
      <div className="select-title">
        <p>{widget.get("title")}
          {widget.get("required") && getRequired()}
          {widget.get("helpText") && getHelpText(widget)}
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

}

const getClassNames = (widget) => {
  let classNames = "mb-3 ";
  classNames += widget.get("headerType") == "dropdown" ? "dropdown-container " : "select-container";
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
