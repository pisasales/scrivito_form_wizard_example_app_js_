import * as Scrivito from "scrivito";

export const FormTabContainerWidget = Scrivito.provideWidgetClass(
  "FormTabContainerWidget",
  {
   // onlyInside: ["FormContainerWidget","FormStepWidget","FormTabWidget"],
    attributes: {
       headerType: [
        "enum",
        {
          values: [
            "dropdown",
            "radio"
          ],
        },
      ],
      title:"string",
      customFieldName: "string",
      tabs: ["widgetlist", { only: "FormTabWidget" }],
      required: "boolean",
      helpText: "html",
    },
  }
);