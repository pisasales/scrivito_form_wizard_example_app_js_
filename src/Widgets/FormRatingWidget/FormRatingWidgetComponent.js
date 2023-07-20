import * as React from "react";
import * as Scrivito from "scrivito";
import { Popover, OverlayTrigger } from "react-bootstrap";
import "./FormRatingWidget.scss";
import { Star } from "./StarComponent"
import { getFieldName } from "../FormContainerWidget/utils/getFieldName";

Scrivito.provideComponent("FormRatingWidget", ({ widget }) => {
  const [selectedStars, setSelectedStars] = React.useState(0);

  return (
    <div className="form-rating mb-3">
      <div className="rating-title">
        <p>{widget.get("title")}
          {widget.get("helpText") && getHelpText(widget)}
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
  </OverlayTrigger>)
}

const createArray = length => [...Array(length)];