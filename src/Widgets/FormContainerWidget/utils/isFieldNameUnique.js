import { getFormWizardContainer } from "../../FormWizardWidget/utils/getFormWizardContainer";
import { getFieldName } from "./getFieldName";
import { getFormContainer } from "./getFormContainer";

export function isFieldNameUnique(widget) {
  const fieldName = getFieldName(widget);
  if (!fieldName) {
    return true;
  }

  const formWizardcontainer = getFormWizardContainer(widget);
  if (formWizardcontainer) {
    const found = formWizardcontainer
      .widgets()
      .find(
        (child) => getFieldName(child) === fieldName && child.id() !== widget.id()
      );
    if (found) {
      return false;
    }
  }

  const formContainer = getFormContainer(widget);
  if (!formContainer) {
    return true;
  }

  const otherWidget = formContainer
    .widgets()
    .find(
      (child) => getFieldName(child) === fieldName && child.id() !== widget.id()
    );

  return !otherWidget;
}
