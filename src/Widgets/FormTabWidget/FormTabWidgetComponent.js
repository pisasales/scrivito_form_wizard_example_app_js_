import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormTabWidget.scss";

Scrivito.provideComponent("FormTabWidget", ({ widget, getData }) => {
  const data = getData ? getData(widget.id()) : { isActive: false };
  
  if (!data.isActive && !Scrivito.isInPlaceEditingActive()) {
    return null;
  }

  if (!widget.get("content").length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select widgets in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <>
      {Scrivito.isInPlaceEditingActive() &&
        <span className="tab-info">{"Tab: " + widget.get("title")}</span>
      }
      {
        (widget.get("content") && widget.get("content").length > 0)
        &&
        <Scrivito.ContentTag content={widget} attribute="content" className={Scrivito.isInPlaceEditingActive() ? "conditional-content" : ""} />
      }
    </>
  );
});

