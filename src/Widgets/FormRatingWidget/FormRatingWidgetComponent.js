import * as React from "react";
import * as Scrivito from "scrivito";
import "./FormRatingWidget.scss";
import { Star } from "./StarComponent"
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";
import { HelpText } from "../FormContainerWidget/components/HelpTextComponent";

Scrivito.provideComponent("FormRatingWidget", ({ widget }) => {
  const [selectedStars, setSelectedStars] = React.useState(0);

  return (
    <div className="form-rating mb-3">
      <div className="rating-title">
        <p>{widget.get("title")}
          {widget.get("helpText") && <HelpText widget={widget} />}
        </p>
      </div>
      {createArray(5).map((n, i) => (
        <Star
          key={i}
          color={"gold"}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <input type="hidden" name={getFieldName(widget)} value={selectedStars == 0 ? "" : selectedStars}></input>
    </div>
  );

});

const createArray = length => [...Array(length)];