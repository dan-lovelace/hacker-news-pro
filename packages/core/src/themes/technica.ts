import { TTheme } from "packages/types/src";

const theme: TTheme = {
  id: "_technica",
  inputs: {
    components: [
      {
        id: "comment_list_item",
        label: "Comment List Item",
        template:
          '<div class="list-item row">\n  <div class="col">\n    <div class="d-flex align-items-center">\n      <div class="pe-3 align-self-start mt-1">\n        {{> vote_buttons}}\n      </div>\n      <div>\n        <div>\n          {{{bodyHTML}}}\n        </div>\n        <div class="d-flex gap-sm fs-sm">\n          {{#ifnoteq links.parent undefined}}\n            <a href="{{../links.parent}}">parent</a>\n          {{/ifnoteq}}\n          {{#ifnoteq links.next undefined}}\n            <a href="{{../links.next}}">next</a>\n          {{/ifnoteq}}\n          {{#ifnoteq links.flag undefined}}\n            <a href="{{../links.flag}}">flag</a>\n          {{/ifnoteq}}\n          {{#ifnoteq links.favorite undefined}}\n            <a href="{{../links.favorite}}">favorite</a>\n          {{/ifnoteq}}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="col-2 fs-sm">\n    <a href="{{links.story}}">{{story.title}}</a>\n  </div>\n  <div class="col-2 fs-sm text-end">\n    <div>{{age.humanized}}</div>\n    <div>\n      {{#ifnoteq user undefined}}\n        <a class="fw-bold" href="{{../user.link}}">{{../user.id}}</a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "comments",
        label: "Comments",
        template:
          '{{#each comments}}\n  <div class="anchor" id="{{data.id}}"></div>\n  <div class="comment-root accordion depth-mod-{{mod depth 2}}" id="accordion-{{data.id}}">\n    <div class="accordion-item">\n      <div class="accordion-header">\n        <div class="d-flex align-items-center gap-sm actions text-nowrap p-2">\n          {{#with data}}\n            {{> vote_buttons}}\n          {{/with}}\n          <a href="{{data.user.link}}">\n            {{data.user.id}}\n          </a>\n          {{data.age.humanized}}\n          <hnp-interaction from="{{data.interactions.next}}">\n            next\n          </hnp-interaction>\n          <button\n            class="accordion-button p-0"\n            type="button"\n            data-bs-toggle="collapse"\n            data-bs-target="#collapse-{{data.id}}"\n            aria-expanded="true"\n            aria-controls="collapseOne"\n          ></button>\n        </div>\n      </div>\n      <div id="collapse-{{data.id}}" class="accordion-collapse collapse show" data-bs-parent="#accordion-{{data.id}}">\n        <div class="accordion-body px-3 py-0">\n          {{{data.bodyHTML}}}\n          <div class="py-2">\n            {{#ifnoteq data.links.reply undefined}}\n              <a href="{{../data.links.reply}}">reply</a>\n            {{/ifnoteq}}\n          </div>\n          {{> comments}}\n        </div>\n      </div>\n    </div>\n  </div>\n{{/each}}',
      },
      {
        id: "comments_container",
        label: "Comments Container",
        template:
          '<div class="comments-container mt-4">\n  {{> comments}}\n</div>',
      },
      {
        id: "header",
        label: "Header",
        template:
          '<div class="header-wrapper position-sticky top-0">\n  <div class="container-page">\n    <header class="d-flex align-items-center row g-0 py-2 text-uppercase fw-bold">\n      <div class="col-auto">\n        <a href="/">\n          <img class="logo me-3 rounded-pill" src="{{assets.images.hnLogo_256}}" />\n        </a>\n      </div>\n      <div class="col">\n        <div class="row g-0 g-lg-2">\n          <div class="col-12 col-lg d-flex gap-md">\n            {{#> header_link href="/newest"}}new{{/header_link}}\n            {{#> header_link href="/front"}}past{{/header_link}}\n            {{#> header_link href="/newcomments"}}comments{{/header_link}}\n            {{#> header_link href="/ask"}}ask{{/header_link}}\n            {{#> header_link href="/show"}}show{{/header_link}}\n            {{#> header_link href="/jobs"}}jobs{{/header_link}}\n            {{#> header_link href="/submit"}}submit{{/header_link}}\n          </div>\n        </div>\n      </div>\n      {{#ifnoteq pageData.currentUser.isLoggedIn undefined}}\n        <div class="col-12 col-md-auto text-end">\n          {{#ifeq ../pageData.currentUser.isLoggedIn true}}\n            {{#with ../pageData.currentUser}}\n              <div class="dropdown text-nowrap">\n                <button\n                  class="btn btn-dark dropdown-toggle text-uppercase fw-bold text-nav p-2 rounded-pill"\n                  type="button"\n                  data-bs-toggle="dropdown"\n                  aria-expanded="false"\n                >\n                  <i class="material-icons">person</i>\n                </button>\n                <ul class="dropdown-menu">\n                  <li>\n                    <span class="dropdown-item disabled">\n                      Welcome, {{id}}\n                    </span>\n                  </li>\n                  <li><hr class="dropdown-divider"></li>\n                  <li>\n                    <a class="dropdown-item" href="{{links.profile}}">\n                      <i class="material-icons me-3">settings</i>\n                      Account\n                    </a>\n                  </li>\n                  <li>\n                    <a class="dropdown-item" href="{{links.logout}}">\n                      <i class="material-icons me-3">logout</i>\n                      Logout\n                    </a>\n                  </li>\n                </ul>\n              </div>\n            {{/with}}\n          {{else}}\n            <a class="text-nav" href="{{../pageData.currentUser.links.login}}">login</a>\n          {{/ifeq}}\n        </div>\n      {{/ifnoteq}}\n    </header>\n  </div>\n</div>\n',
      },
      {
        id: "header_link",
        label: "Header Link",
        template:
          '<a\n  class="text-nav{{#ifeq config.pathname href}} active{{/ifeq}}"\n  href="{{href}}"\n>\n  {{> @partial-block}}\n</a>',
      },
      {
        id: "item_container",
        label: "Item Container",
        template:
          '<div class="mb-2">\n  <div class="container-fluid">\n    {{> @partial-block}}\n  </div>\n  {{#ifnoteq bodyHTML undefined}}\n    <div class="border-start border-end border-bottom px-3 py-2 bg-bs">\n      {{{../bodyHTML}}}\n    </div>\n  {{/ifnoteq}}\n</div>',
      },
      {
        id: "item_list",
        label: "Item List",
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    <div class="container-fluid">\n      {{#each items}}\n        {{#with this}}\n          {{> @partial-block}}\n        {{/with}}\n      {{/each}}\n    </div>\n    {{> more_link}}\n  {{/with}}\n{{/layout}}',
      },
      {
        id: "job_list_item",
        label: "Job List Item",
        template:
          '<div class="list-item row">\n  <div class="col">\n    <a\n      href="{{#ifnoteq site undefined}}{{../site.url}}{{else}}{{../links.item}}{{/ifnoteq}}"\n    >\n      {{title}}\n    </a>\n    <div class="d-flex gap-sm fs-sm links-light">\n      {{#ifnoteq links.from undefined}}\n        <a href="{{../links.from}}">{{../site.name}}</a>\n      {{/ifnoteq}}\n      {{#ifnoteq links.hide undefined}}\n        <a href="{{../links.hide}}">\n          hide\n        </a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n  <div class="col-2 fs-sm text-end">\n    {{age.humanized}}\n  </div>\n</div>',
      },
      {
        id: "layout",
        label: "Layout",
        template:
          '{{> header}}\n<main class="container-page py-3">\n  {{> @partial-block}}\n</main>',
      },
      {
        id: "more_link",
        label: "More Link",
        template:
          '<a class="btn btn-primary mt-2" href="{{links.more}}">\n  <span class="d-flex align-items-center">\n    Next\n    <i class="material-icons ms-2">chevron_right</i>\n  </span>\n</a>',
      },
      {
        id: "poll_option_item",
        label: "Poll Option Item",
        template:
          '<div class="d-flex align-items-center">\n  <div class="pe-3 align-self-start mt-1">\n    {{> vote_buttons}}\n  </div>\n  <div>\n    {{title}}\n    <div class="fw-bold text-success">\n      {{score}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "reply_form",
        label: "Reply Form",
        template:
          '{{#ifnoteq forms.comment.action undefined}}\n  {{#with ../forms.comment}}\n    <form class="row" action="{{action}}" method="{{method}}">\n      {{{hiddenInputsHTML}}}\n      <div class="col">\n        <textarea class="form-control mb-2" name="text" rows="5"></textarea>\n        <input class="btn btn-primary" type="submit" value="{{../../submitText}}" />\n      </div>\n    </form>\n  {{/with}}\n{{/ifnoteq}}',
      },
      {
        id: "reply_form_toggle",
        label: "Reply Form Toggle",
        template:
          '<div class="mb-2">\n  <button\n    id="reply-form-toggle"\n    class="btn btn-primary"\n    onclick="document.getElementById(\'reply-form-toggle\').classList.add(\'d-none\'); document.getElementById(\'reply-form\').classList.remove(\'d-none\');"\n  >\n    <span class="d-flex align-items-center">\n      <i class="material-icons me-2">reply</i>\n      Reply\n    </span>\n  </button>\n</div>\n<div id="reply-form" class="d-none">\n  {{> reply_form submitText="Add reply"}}\n</div>',
      },
      {
        id: "story_list_item",
        label: "Story List Item",
        template:
          '<div class="list-item row">\n  <div class="col">\n    <div class="d-flex align-items-center">\n      <div class="pe-3">\n        {{> vote_buttons}}\n      </div>\n      <div>\n        {{#ifnoteq site undefined}}\n          <a class="fw-bold" href="{{../site.url}}">{{../title}}</a>\n        {{else}}\n          <a href="{{../links.item}}">\n            {{../title}}\n          </a>\n        {{/ifnoteq}}\n        <div class="d-flex gap-sm fs-sm links-light">\n          {{#ifnoteq links.flag undefined}}\n            <a href="{{../links.flag}}">flag</a>\n          {{/ifnoteq}}\n          {{#ifnoteq links.unflag undefined}}\n            <a href="{{../links.unflag}}">unflag</a>\n          {{/ifnoteq}}\n          {{#ifnoteq interactions.hide undefined}}\n            <hnp-interaction from="{{../interactions.hide}}">\n              hide\n            </hnp-interaction>\n          {{/ifnoteq}}\n          {{#ifnoteq links.past undefined}}\n            <a href="{{../links.past}}">past</a>\n          {{/ifnoteq}}\n          {{#ifnoteq links.favorite undefined}}\n            <a href="{{../links.favorite}}">favorite</a>\n          {{/ifnoteq}}\n          {{#ifnoteq site undefined}}\n            •\n            <span>\n              <a href="{{../links.from}}">{{../site.name}}</a>\n            </span>\n          {{/ifnoteq}}\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class="col-2 fs-sm">\n    <div>\n      {{#ifnoteq type "job"}}\n        {{#ifnoteq ../links.item undefined}}\n          Replies:\n          <a class="float-end text-orange" href="{{../links.item}}">\n            {{../commentsCount}}\n          </a>\n        {{/ifnoteq}}\n      {{/ifnoteq}}\n    </div>\n    <div>\n      {{#ifnoteq score undefined}}\n        Points:\n        <span class="float-end">\n          {{../score}}\n        </span>\n      {{/ifnoteq}}\n    </div>\n  </div>\n  <div class="col-2 fs-sm text-end">\n    <div>{{age.humanized}}</div>\n    <div>\n      {{#ifnoteq user undefined}}\n        <a class="fw-bold" href="{{../user.link}}">{{../user.id}}</a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "vote_buttons",
        label: "Vote Buttons",
        template:
          '<div class="vote-buttons">\n  {{#ifnoteq voted "up"}}\n    <hnp-interaction from="{{../interactions.voteUp}}">\n      <span class="vote-button">\n        <i class="material-icons fs-sm">thumb_up</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-up">\n      <i class="material-icons fs-sm">thumb_up</i>\n    </span>\n  {{/ifnoteq}}\n  {{#ifnoteq voted "down"}}\n    <hnp-interaction from="{{../interactions.voteDown}}">\n      <span class="vote-button">\n        <i class="material-icons fs-sm">thumb_down</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-down">\n      <i class="material-icons fs-sm">thumb_down</i>\n    </span>\n  {{/ifnoteq}}\n</div>',
      },
    ],
    style: {
      options: {
        darkMode: false,
      },
      template:
        ":root {\n  --hn-orange: #ff6600;\n  --theme-primary: rgb(1, 205, 116);\n  --theme-primary-dark: rgb(1, 162, 92);\n  \n  --bg-color-dark: rgb(20, 20, 20);\n  --bg-color-light: rgb(233, 234, 237);\n  --nav-color: rgb(137, 140, 155);\n  --nav-active-color: var(--theme-primary);\n  --nav-hover-color: rgb(255, 255, 255);\n  --text-color: color-mix(in srgb, var(--bs-body-color) 70%, var(--bs-body-bg));\n  \n  --bs-border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color);\n  --header-height: 62px;\n  --vote-button-width: 18px;\n}\n\n/* -------------------- Element overrides --------------------*/\n\na {\n  color: var(--bs-body-color);\n  text-decoration: none;\n}\n\nbody {\n  background-color: var(--bg-color-light);\n  color: var(--text-color);\n  font-family: -apple-system,\n    BlinkMacSystemFont,\n    \"Segoe UI\",\n    Roboto,\n    Helvetica,\n    Arial,\n    sans-serif,\n    \"Apple Color Emoji\",\n    \"Segoe UI Emoji\",\n    \"Segoe UI Symbol\";\n}\n\n[data-bs-theme=dark] body {\n  background-color: var(--bg-color-dark);\n}\n\ncode {\n  white-space: pre-wrap;\n}\n\np:last-child {\n  margin-bottom: 0;\n}\n\ntextarea {\n  max-width: 100%;\n  resize: both;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n}\n\n/* -------------------- Bootstrap overrides --------------------*/\n\n.accordion-item {\n  background-color: unset;\n  border: none;\n}\n\n.accordion-button {\n  background-color: unset;\n  pointer-events: none;\n}\n\n.accordion-button:after {\n  margin-left: 0;\n  pointer-events: auto;\n  filter: hue-rotate(273deg);\n}\n\n.accordion-button:not(.collapsed) {\n  background-color: unset;\n  color: unset;\n  box-shadow: unset;\n}\n\n.accordion-button:focus {\n  box-shadow: unset;\n}\n\n.accordion {\n  --bs-accordion-btn-icon: url('{{assets.icons.expandDown_dark}}');\n  --bs-accordion-btn-active-icon: url('{{assets.icons.expandDown_dark}}');\n}\n\n[data-bs-theme=dark] .accordion-button:after {\n  --bs-accordion-btn-icon: url('{{assets.icons.expandDown_dark}}');\n  --bs-accordion-btn-active-icon: url('{{assets.icons.expandDown_dark}}');\n}\n\n.accordion-body {\n  margin-left: var(--vote-button-width);\n}\n\n.accordion-item {\n  color: var(--text-color);\n}\n\n.btn-primary {\n  --bs-btn-bg: var(--theme-primary);\n  --bs-btn-border-color: var(--theme-primary);\n  --bs-btn-hover-bg: var(--theme-primary-dark);\n  --bs-btn-hover-border-color: var(--theme-primary-dark);\n  --bs-btn-active-bg: var(--theme-primary-dark);\n  --bs-btn-active-border-color: var(--theme-primary-dark);\n}\n\n.dropdown-item.active, .dropdown-item:active {\n  background-color: var(--theme-primary);\n}\n\n/* -------------------- Utilities --------------------*/\n\n.bg-bs {\n  background-color: var(--bs-body-bg);\n}\n\n.fs-sm {\n  font-size: 0.8rem !important;\n}\n\n.gap-sm {\n  gap: 0.5rem;\n}\n\n.gap-md {\n  gap: 0.75rem;\n}\n\n.links-light a {\n  color: var(--text-color);\n}\n\n.text-orange {\n  color: var(--bs-orange);\n}\n\n.text-theme-primary {\n  color: var(--theme-primary);\n}\n\n/* -------------------- Custom selectors --------------------*/\n\n.anchor {\n  display: block;\n  position: relative;\n  top: calc(var(--header-height) * -1);\n  visibility: hidden;\n}\n\n.comments-container .comment-root {\n  margin-bottom: 0.25rem;\n}\n\n.comments-container .comment-root:last-child {\n  margin-bottom: 0;\n}\n\n.comment-root.depth-mod-0 {\n  background: var(--bs-body-bg);\n}\n\n.comment-root.depth-mod-1 {\n  background: color-mix(in srgb, var(--bs-border-color) 50%, var(--bs-body-bg));\n}\n\n.container-page {\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 1200px;\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\n.header-wrapper {\n  background-color: rgb(3, 3, 3);\n  color: var(--nav-color);\n  z-index: 1;\n}\n\n.header-wrapper a {\n  transition: color 0.2s ease-in-out;\n}\n\n.header-wrapper a.active {\n  color: var(--nav-active-color);\n  pointer-events: none;\n}\n\n.header-wrapper .dropdown {\n  text-transform: none;\n  user-select: none;\n}\n\n.header-wrapper .dropdown-toggle:after {\n  display: none;\n}\n\n.list-item {\n  background-color: var(--bs-body-bg);\n  border: var(--bs-border);\n  border-bottom: none;\n}\n\n.list-item:last-child {\n  border-bottom: var(--bs-border);\n}\n\n.list-item [class^='col'] {\n  border-right: var(--bs-border);\n  padding-bottom: 0.5rem;\n  padding-top: 0.5rem;\n}\n\n.list-item [class^='col']:last-child {\n  border-right: none;\n}\n\n.logo {\n  aspect-ratio: 1 / 1;\n  width: 46px;\n}\n\n.text-nav {\n  color: var(--nav-color);\n}\n\n.text-nav:hover {\n  color: var(--nav-hover-color);\n}\n\n.vote-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: var(--vote-button-width);\n}\n\n.vote-button {\n  align-items: center;\n  aspect-ratio: 1 / 1;\n  border-radius: 100%;\n  display: flex;\n  justify-content: center;\n  width: var(--vote-button-width);\n  visibility: hidden;\n}\n\na .vote-button, .voted-down, .voted-up {\n  color: var(--bs-orange);\n  visibility: visible;\n}\n\n.voted-down {\n  color: var(--bs-red);\n}\n\n.voted-up {\n  color: var(--bs-green);\n}\n",
    },
    views: {
      commentItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    <div class="container-fluid mb-2">\n      {{> comment_list_item}}\n    </div>\n    {{> reply_form_toggle}}\n    {{> comments_container}}\n  {{/with}}\n{{/layout}}',
      },
      commentList: {
        template: "{{#> item_list}}\n  {{> comment_list_item}}\n{{/item_list}}",
      },
      jobItem: {
        template:
          "{{#> layout}}\n  {{#with pageData}}\n    {{#> item_container}}\n      {{> job_list_item}}\n    {{/item_container}}\n  {{/with}}\n{{/layout}}",
      },
      jobList: {
        template: "{{#> item_list}}\n  {{> job_list_item}}\n{{/item_list}}",
      },
      pollItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    <div class="mb-2">\n      <div class="container-fluid">\n        {{> story_list_item}}\n      </div>\n      <div class="d-flex flex-column gap-md border-bottom border-end border-start px-5 py-2 bg-bs">\n        {{#each options}}\n          {{#with this}}\n            {{> poll_option_item}}\n          {{/with}}\n        {{/each}}\n      </div>\n    </div>\n    {{> comments_container}}\n  {{/with}}\n{{/layout}}',
      },
      reply: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    <div class="container-fluid mb-2">\n      {{> comment_list_item}}\n    </div>\n    {{> reply_form submitText="Reply"}}\n  {{/with}}\n{{/layout}}',
      },
      storyItem: {
        template:
          "{{#> layout}}\n  {{#with pageData}}\n    {{#> item_container}}\n      {{> story_list_item}}\n    {{/item_container}}\n    {{> reply_form_toggle}}\n    {{> comments_container}}\n  {{/with}}\n{{/layout}}",
      },
      storyList: {
        template: "{{#> item_list}}\n  {{> story_list_item}}\n{{/item_list}}",
      },
      submit: {
        template:
          '{{#> layout}}\n  {{#with pageData.forms.submit}}\n    <form action="{{action}}" method="{{method}}">\n      {{{hiddenInputsHTML}}}\n      <div class="row mb-2">\n        <div class="col-12 col-lg-5">\n          <label class="form-label mb-1" for="title">Title</label>\n          <input id="title" class="form-control w-100" name="title" type="text" maxlength="80" />\n        </div>\n      </div>\n      <div class="row mb-2">\n        <div class="col-12 col-lg-5">\n          <label class="form-label mb-1" for="url">Url</label>\n          <input id="url" class="form-control w-100" name="url" type="url" />\n        </div>\n      </div>\n      <div class="row mb-2">\n        <div class="col-12 col-lg-5">\n          <label class="form-label mb-1" for="text">Text</label>\n          <textarea id="text" class="form-control w-100" name="text" rows="4" cols="49" wrap="virtual"></textarea>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-12 col-lg-5">\n          <input class="btn btn-secondary" type="submit" value="Submit" />\n        </div>\n      </div>\n      <div class="row mt-4">\n        <div class="col-12 col-lg-8">\n          Leave url blank to submit a question for discussion. If there is no\n          url, text will appear at the top of the thread. If there is a url,\n          text is optional.\n        </div>\n      </div>\n    </form>\n  {{/with}}\n{{/layout}}',
      },
    },
  },
  label: "Technica",
  options: {
    disableHNStyle: true,
  },
  type: "premade",
  version: "1.0.0",
};

export default theme;
