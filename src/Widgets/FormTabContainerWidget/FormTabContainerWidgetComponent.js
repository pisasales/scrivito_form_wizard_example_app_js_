import * as React from "react";
import * as Scrivito from "scrivito";
import "./FormTabContainerWidget.scss";
import { TabHeader } from "./HeaderComponent";

Scrivito.provideComponent("FormTabContainerWidget", ({ widget }) => {
  const [selectedTabId, setSelectedTabId] = React.useState("");
  const isDropdownHeader = widget.get("headerType") == "dropdown";
  const onChangeSelected = (e) => {
    const selectedId = isDropdownHeader ? e.target.options[e.target.selectedIndex].id : e.target.id;
    setSelectedTabId(selectedId);
  }

  return (
    <>
      <TabHeader
        widget={widget}
        onChangeSelected={onChangeSelected}
      />
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
