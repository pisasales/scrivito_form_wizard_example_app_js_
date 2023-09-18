import * as React from "react";
import * as Scrivito from "scrivito";
import { InPlaceEditingPlaceholder } from "../../Components/InPlaceEditingPlaceholder";
import "./FormStepWidget.scss";

Scrivito.provideComponent("FormStepWidget", ({ widget, getData }) => {
  const data = getData
    ? getData(widget.id())
    : { stepNumber: 0, cssClasses: "" };
  const items = widget.get("items");

  if (!items.length) {
    return (
      <InPlaceEditingPlaceholder center>
        Select some items in the widget properties.
      </InPlaceEditingPlaceholder>
    );
  }

  return (
    <div
      className={getClassNames(data.cssClasses)}
      data-step-number={data.stepNumber}
    >
      {Scrivito.isInPlaceEditingActive() && (
        <span className="step-preview-count">{"Step: " + data.stepNumber}</span>
      )}
      <div className="row">
        <Scrivito.ContentTag content={widget} attribute="items" />
      </div>
    </div>
  );
});

function getClassNames(cssClasses) {
  let classNames = "";
  if (cssClasses) {
    classNames += " " + cssClasses;
  }
  if (Scrivito.isInPlaceEditingActive()) {
    classNames += " step-border";
  }
  return classNames;
}
