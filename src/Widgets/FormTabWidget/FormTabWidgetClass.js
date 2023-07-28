import * as Scrivito from "scrivito";

export const FormTabWidget = Scrivito.provideWidgetClass(
  "FormTabWidget",
  {
    onlyInside: "FormTabContainerWidget",
    attributes: {
      title: "string",
      content: "widgetlist"
    },
  }
);