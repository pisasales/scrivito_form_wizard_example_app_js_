import * as Scrivito from "scrivito";

/** Returns the first `FormStepWidget` container it can find. `null` otherwise. */
export function getPageContainer(childWidget) {
  let candidate = childWidget.container();
  while (candidate instanceof Scrivito.Widget) {
    if (candidate.objClass() === "FormStepWidget") {
      return candidate;
    }
    candidate = candidate.container();
  }

  return null;
}
