import { getFormContainer } from "../../../FormContainerWidget/utils/getFormContainer";
import { getFormWizardContainer } from "../getFormWizardContainer";
import { getWizardStepContainer } from "../getWizardStepContainer";

export function insideFormOrStepContainerValidation(widget) {
  // order is important!
  if (getWizardStepContainer(widget)) {
    return null;
  }
  const formWizardcontainer = getFormWizardContainer(widget);
  if (formWizardcontainer) {
    const children = formWizardcontainer.widgets();
    const hasSteps = children.some((child) => {
      return child.objClass() == "FormStepWidget";
    });
    return hasSteps ? "Needs to be inside the wizard step" : null;
  }

  if (getFormContainer(widget)) {
    return null;
  }
  return "Needs to be inside a form or a wizard step.";
}
