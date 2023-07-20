import { getFormContainer } from "../getFormContainer";
import { getPageContainer } from "../getPageContainer";

export function insideFormContainerValidation(widget) {
  if (!getFormContainer(widget) || !getPageContainer(widget)) {
    return "Needs to be inside a form or a page.";
  }
}