class Interaction extends HTMLElement {
  constructor() {
    super();

    /**
     * Class name to append on the original element.
     */
    const className = this.className;

    /**
     * HTML string to generate the interaction.
     * @example `<a href="hide?id=37190743&amp;auth=7cdcf5048da5b58c8058a9452fcca9c64b415225&amp;goto=news" class="clicky hider"></a>`
     */
    const from = this.from;

    // remove the node if no interaction exists
    if (!from) this.remove();

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

    // add additional attributes
    if (className) {
      fromElement.classList.add(className);
    }

    // add the new element directly after the `hnp-interaction` component
    this.after(fromElement);

    // delete the `hnp-interaction` component
    this.remove();
  }

  get className() {
    return this.getAttribute("className") || "";
  }

  get from() {
    return this.getAttribute("from") || "";
  }
}

customElements.define("hnp-interaction", Interaction);