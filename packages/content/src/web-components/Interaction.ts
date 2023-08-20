export default function () {
  class Interaction extends HTMLElement {
    constructor() {
      super();

      /**
       * HTML string to generate the interaction from
       * @example `<a href="hide?id=37190743&amp;auth=7cdcf5048da5b58c8058a9452fcca9c64b415225&amp;goto=news" class="clicky hider"></a>`
       */
      const from = this.from;

      // convert the `from` attribute string to a ChildNode
      const fromTemplate = document.createElement("template");
      fromTemplate.innerHTML = from;
      const fromNode = fromTemplate.content.firstChild;

      if (!fromNode) return;

      // deeply clone `fromNode` to convert it to an Element
      const cloneTemplate = document.createElement("template");
      cloneTemplate.appendChild(fromNode.cloneNode(true));
      const fromElement = cloneTemplate.querySelector(":first-child");

      if (!fromElement) return;

      // transfer the `hnp-interaction` component's HTML into the new element
      fromElement.innerHTML = this.innerHTML;

      // add the new element directly after the `hnp-interaction` component
      this.after(fromElement);

      // delete the `hnp-interaction` component
      this.remove();
    }

    get from() {
      return this.getAttribute("from") || "";
    }
  }

  customElements.define("hnp-interaction", Interaction);
}
