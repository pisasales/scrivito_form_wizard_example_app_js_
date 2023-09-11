import * as Scrivito from "scrivito";

/** Returns the first `FormWizardWidget` container it can find. `null` otherwise. */
export function getFormWizardContainer(childWidget) {
  let candidate = childWidget.container();
  while (candidate instanceof Scrivito.Widget) {
    if (candidate.objClass() === "FormWizardWidget") {
      return candidate;
    }
    candidate = candidate.container();
  }

  return null;
}
