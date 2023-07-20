import { getFormWizardContainer } from "../getFormWizardContainer";

export function insideFormWizardValidation(widget) {
  if (!getFormWizardContainer(widget)) {
    return "Needs to be inside a form wizard.";
  }
}
