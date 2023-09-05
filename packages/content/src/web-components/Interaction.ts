/**
 * Some actions taken by users on Hacker News perform an inline document update
 * without refreshing the page. When upvoting a comment, for example, the
 * display of the vote button immediately changes to reflect the user's action.
 * This works in the default Hacker News pages through use of Javascript that
 * gets executed whenever a document click event occurs. Their JS looks for
 * elements with the `clicky` class to know when to do an inline update.
 *
 * The `Interaction` component leverages the default JS by creating a new
 * element from an HTML string that retains its attributes, including the
 * `clicky` class. Children are stripped away so users may supply their own.
 * @example
 * <hnp-interaction from="{{interactions.voteUp}}">
 *   <i class="material-icons">arrow_up</i>
 * </hnp-interaction>
 */
export class Interaction extends HTMLElement {
  constructor() {
    super();

    const className = this.className;
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

  /**
   * Class name to append to the original element's class list.
   * @remarks Sample usage:
   * ```
   * <hnp-interaction className="fw-bold" from="{{interactions.hide}}">
   *   Hide
   * </hnp-interaction>
   * ```
   */
  get className() {
    return this.getAttribute("className") || "";
  }

  /**
   * HTML string to generate the interaction.
   * @example `<a href="hide?id=37190743&amp;auth=abcd1234&amp;goto=news" class="clicky hider"></a>`
   */
  get from() {
    return this.getAttribute("from") || "";
  }
}

customElements.define("hnp-interaction", Interaction);
