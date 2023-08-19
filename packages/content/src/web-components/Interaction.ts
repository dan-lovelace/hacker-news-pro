export default function () {
  class Interaction extends HTMLElement {
    constructor() {
      super();

      /**
       * HTML string to generate the interaction from
       * @example `<a href="hide?id=37190743&amp;auth=7cdcf5048da5b58c8058a9452fcca9c64b415225&amp;goto=news" class="clicky hider"></a>`
       */
      const from = this.from;

      const shadow = this.attachShadow({ mode: "open" });

      // convert the `from` attribute to a node
      const template = document.createElement("template");
      template.innerHTML = from;
      const element = template.content.firstChild;

      if (!element) return;

      // create a slot to insert the `hnp-interaction` element's children
      const slot = document.createElement("slot");
      element.appendChild(slot);

      /**
       * At this point, `element` is of type `ChildNode` which does not have an
       * `outerHTML` property so we append it to a ghost to get its raw HTML
       * before injecting it into a container.
       */
      const elementGhost = document.createElement("div");
      elementGhost.appendChild(element.cloneNode(true));
      const container = document.createElement("span");
      container.innerHTML = elementGhost.innerHTML;

      shadow.appendChild(container);

      this.removeAttribute("from");
    }

    get from() {
      return this.getAttribute("from") || "";
    }
  }

  customElements.define("hnp-interaction", Interaction);
}
