import * as Scrivito from "scrivito";

Scrivito.provideEditingConfig("FormConditionWidget", {
  title: "Form Condition",
  titleForContent(obj) {
    return "Condition: " + obj.get("title");
  },
  attributes: {
    title: { title: "Title" },
    content: { title: "Content" },
  },
  properties: ["title", "content"],
});
