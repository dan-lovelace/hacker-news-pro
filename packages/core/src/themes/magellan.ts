import { TTheme } from "@hnp/types";

const theme: TTheme = {
  id: "_magellan",
  inputs: {
    components: [
      {
        id: "comment_list_item",
        label: "Comment List Item",
        template:
          '{{#> item_container}}\n  {{> vote_buttons variant="comment"}}\n  <div>\n    <a href="{{user.link}}">{{user.id}}</a>\n    {{age.humanized}} |\n    {{#ifnoteq links.parent undefined}}\n      <a href="{{../links.parent}}">parent</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.context undefined}}\n      <a href="{{../links.context}}">context</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.next undefined}}\n      <a href="{{../links.next}}">next</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.flag undefined}}\n      <a href="{{../links.flag}}">flag</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.favorite undefined}}\n      <a href="{{../links.favorite}}">favorite</a> |\n    {{/ifnoteq}}\n    on:\n    <a href="{{links.story}}">{{story.title}}</a>\n    <div class="my-2">\n      {{{bodyHTML}}}\n    </div>\n  </div>\n{{/item_container}}',
      },
      {
        id: "comments",
        label: "Comments",
        template:
          '{{#each comments}}\n  <div class="comment-root row g-0" id="{{data.id}}">\n    <div class="col-auto d-flex flex-column align-items-center">\n      {{#with data}}\n        {{> vote_buttons variant="comment"}}\n      {{/with}}\n      <div class="border-start border-1 flex-fill me-2 my-2"></div>\n    </div>\n    <details class="col" open>\n      <summary>\n        <a href="{{data.authorUrl}}">\n          {{data.author}}\n        </a>\n        {{data.age.humanized}}\n        {{#ifnoteq data.interactions.next undefined}}\n          |\n        {{/ifnoteq}}\n        <hnp-interaction from="{{data.interactions.next}}">\n          next\n        </hnp-interaction>\n      </summary>\n      <div class="comment-body">\n        {{{data.bodyHTML}}}\n      </div>\n      <div class="py-2">\n        {{#ifnoteq data.links.reply undefined}}\n          <a href="{{../data.links.reply}}">reply</a>\n        {{/ifnoteq}}\n      </div>\n      {{> comments}}\n    </details>\n  </div>\n{{/each}}',
      },
      {
        id: "item_container",
        label: "Item Container",
        template: '<div class="d-flex mb-2">\n  {{> @partial-block}}\n</div>',
      },
      {
        id: "job_list_item",
        label: "Job List Item",
        template:
          '{{#> item_container}}\n  <div>\n    <a\n      href="{{#ifnoteq site undefined}}{{../site.url}}{{else}}{{../links.item}}{{/ifnoteq}}"\n    >\n      {{title}}\n    </a>\n    <div class="fs-sm">\n      {{age.humanized}}\n      {{#ifnoteq links.from undefined}}\n        (<a href="{{../links.from}}">{{../site.name}}</a>)\n      {{/ifnoteq}}\n      <div class="d-flex gap-md">\n        {{#ifnoteq links.hide undefined}}\n          <a href="{{../links.hide}}">\n            hide\n          </a>\n        {{/ifnoteq}}\n      </div>\n    </div>\n  </div>\n{{/item_container}}',
      },
      {
        id: "layout",
        label: "Layout",
        template:
          '<div class="container-fluid">\n  <div class="row h-100">\n    <div class="col-auto h-100 d-flex flex-column position-fixed">\n      <aside class="d-flex flex-column flex-fill py-2 overflow-auto">\n        <a href="/">\n          <img class="logo" src="{{assets.baseURL}}/hn_logo_256.png" />\n        </a>\n        <div class="d-flex flex-column flex-fill py-2">\n          <a href="/newest">/newest</a>\n          <a href="/front">/front</a>\n          <a href="/ask">/ask</a>\n          <a href="/asknew">/asknew</a>\n          <a href="/show">/show</a>\n          <a href="/shownew">/shownew</a>\n          <a href="/pool">/pool</a>\n          <a href="/invited">/invited</a>\n          <a href="/best">/best</a>\n          <a href="/active">/active</a>\n          <a href="/noobstories">/noobstories</a>\n          <hr />\n          <a href="/newcomments">/newcomments</a>\n          <a href="/bestcomments">/bestcomments</a>\n          <a href="/noobcomments">/noobcomments</a>\n          <hr />\n          <a href="/jobs">/jobs</a>\n          <a href="/launches">/launches</a>\n          <hr />\n          <a class="btn btn-outline-warning mb-2" href="/submit">\n            New topic\n          </a>\n        </div>\n        {{#ifnoteq pageData.currentUser.isLoggedIn undefined}}\n          <div>\n            {{#ifeq ../pageData.currentUser.isLoggedIn true}}\n              {{#with ../pageData.currentUser}}\n                <a href="{{links.profile}}">\n                  <i class="material-icons">account_circle</i>\n                </a>\n                ({{karma}}) |\n                <a href="{{links.logout}}">logout</a>\n              {{/with}}\n            {{else}}\n              <a href="{{../pageData.currentUser.links.login}}">login</a>\n            {{/ifeq}}\n          </div>\n        {{/ifnoteq}}\n      </aside>\n    </div>\n    <div class="col">\n      <main class="py-2">\n        {{> @partial-block}}\n      </main>\n    </div>\n  </div>\n</div>',
      },
      {
        id: "poll_option_item",
        label: "Poll Option Item",
        template:
          '<div class="list-group-item">\n  {{#> item_container}}\n    {{> vote_buttons}}\n    <div class="d-flex align-items-center">\n      {{title}}\n    </div>\n  {{/item_container}}\n</div>',
      },
      {
        id: "reply_form",
        label: "Reply Form",
        template:
          '{{#ifnoteq forms.comment.action undefined}}\n  {{#with ../forms.comment}}\n    <form class="row" action="{{action}}" method="{{method}}">\n      {{{hiddenInputsHTML}}}\n      <div class="col col-lg-8 ms-4">\n        {{> reply_form_text_field}}\n        <input class="btn btn-secondary mt-2" type="submit" value="{{../../submitText}}" />\n      </div>\n    </form>\n  {{/with}}\n{{/ifnoteq}}',
      },
      {
        id: "reply_form_text_field",
        label: "Reply Form Text Field",
        template:
          '<textarea id="text" class="form-control w-100 rounded-bottom-0" name="text" rows="4" cols="49" wrap="virtual"></textarea>\n<div class="accordion" id="accordionExample">\n  <div class="accordion-item rounded-top-0 border-top-0">\n    <div class="accordion-header">\n      <button class="accordion-button collapsed px-3 py-2 fs-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">\n        Formatting rules\n      </button>\n    </div>\n    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">\n      <div class="accordion-body px-3 fs-sm">\n        <p>Blank lines separate paragraphs.</p>\n        <p>Text surrounded by asterisks is italicized. To get a literal asterisk, use \\* or **.</p>\n        <p>Text after a blank line that is indented by two or more spaces is reproduced verbatim (this is intended for code).</p>\n        <p>Urls become links, except in the text field of a submission.</p>\n        <p>If your url gets linked incorrectly, put it in &lt;angle brackets&gt; and it should work.</p>\n      </div>\n    </div>\n  </div>\n</div>',
      },
      {
        id: "story_list_item",
        label: "Story List Item",
        template:
          '{{#> item_container}}\n  {{> vote_buttons}}\n  <div>\n    <div>\n      {{#ifnoteq site undefined}}\n        <a href="{{../site.url}}">{{../title}}</a>\n      {{else}}\n        <a href="{{../links.item}}">\n          {{../title}}\n        </a>\n      {{/ifnoteq}}\n    </div>\n    <div class="fs-sm">\n      <div>\n        submitted\n        {{createdHumanized}}\n        {{#ifnoteq user undefined}}\n          by <a href="{{../user.link}}">{{../user.id}}</a>\n        {{/ifnoteq}}\n        {{#ifnoteq site undefined}}\n          (<a href="{{../links.from}}">{{../site.name}}</a>)\n        {{/ifnoteq}}\n      </div>\n      <div class="d-flex gap-md divide-first">\n        {{#ifnoteq links.item undefined}}\n          <a href="{{../links.item}}">\n            {{#ifeq ../commentsCount 0}}\n              discuss\n            {{else}}\n              {{../commentsCount}}\n              comments\n            {{/ifeq}}\n          </a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.flag undefined}}\n          <span>\n            <a href="{{../links.flag}}">flag</a>\n          </span>\n        {{/ifnoteq}}\n        {{#ifnoteq interactions.hide undefined}}\n          <span>\n            <hnp-interaction from="{{../interactions.hide}}">\n              hide\n            </hnp-interaction>\n          </span>\n        {{/ifnoteq}}\n        {{#ifnoteq links.past undefined}}\n          <span>\n            <a href="{{../links.past}}">past</a>\n          </span>\n        {{/ifnoteq}}\n        {{#ifnoteq links.favorite undefined}}\n          <span>\n            <a href="{{../links.favorite}}">favorite</a>\n          </span>\n        {{/ifnoteq}}\n      </div>\n    </div>\n  </div>\n{{/item_container}}',
      },
      {
        id: "vote_buttons",
        label: "Vote Buttons",
        template:
          '<div class="vote-buttons fs-sm{{#ifeq variant "comment"}} comment me-2{{/ifeq}}">\n  {{#ifnoteq voted "up"}}\n    <hnp-interaction from="{{../interactions.voteUp}}">\n      <span class="vote-button">\n        <i class="material-icons">arrow_drop_up</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-up">\n      <i class="material-icons">arrow_drop_up</i>\n    </span>\n  {{/ifnoteq}}\n  {{#ifnoteq score undefined}}\n    {{../score}}\n  {{/ifnoteq}}\n  {{#ifnoteq voted "down"}}\n    <hnp-interaction from="{{../interactions.voteDown}}">\n      <span class="vote-button">\n        <i class="material-icons">arrow_drop_down</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-down">\n      <i class="material-icons">arrow_drop_down</i>\n    </span>\n  {{/ifnoteq}}\n</div>',
      },
    ],
    style: {
      options: {
        darkMode: true,
      },
      template:
        ":root {\n  --hn-orange: #ff6600;\n  --sidebar-width: 180px;\n  --vote-button-width: 50px;\n}\n\nbody {\n  font-family: Verdana, Geneva, sans-serif;\n}\n\na {\n  text-decoration: none;\n}\n\naside {\n  background-color: var(--bs-body-bg);\n  width: var(--sidebar-width);\n}\n\nfooter {\n  margin-left: var(--vote-button-width);\n}\n\nhr {\n  margin: 0.5rem 0;\n}\n\nmain {\n  margin-left: calc(var(--sidebar-width) + 15px);\n  max-width: 1024px;\n}\n\np:last-child {\n  margin-bottom: 0;\n}\n\npre {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n}\n\n.accordion {\n  --bs-accordion-btn-icon: url('{{assets.baseURL}}/icons/chevron_down_light.svg');\n  --bs-accordion-btn-active-icon: url('{{assets.baseURL}}/icons/chevron_down_light.svg');\n}\n\n[data-bs-theme=dark] .accordion-button::after {\n  --bs-accordion-btn-icon: url('{{assets.baseURL}}/icons/chevron_down_dark.svg');\n  --bs-accordion-btn-active-icon: url('{{assets.baseURL}}/icons/chevron_down_dark.svg');\n}\n\n.accordion-button:not(.collapsed),\n.accordion-button:focus {\n  background-color: unset;\n  box-shadow: unset;\n  color: unset;\n}\n\n.comment-root details summary {\n  cursor: pointer;\n  display: inline;\n}\n\n.comment-root details summary * {\n  pointer-events: auto;\n}\n\n.comment-root details > summary:after {\n  content: \"[+]\";\n  pointer-events: auto;\n}\n\n.comment-root details[open] > summary:after {\n  content: \"[-]\";\n  pointer-events: auto;\n}\n\n.divide-first > :nth-child(2):before {\n  content: \"|\";\n  margin-right: 0.25rem;\n}\n\n.fs-sm {\n  font-size: 0.8rem;\n}\n\n.gap-sm {\n  gap: 0.25rem;\n}\n\n.gap-md {\n  gap: 0.5rem;\n}\n\n.logo {\n  aspect-ratio: 1 / 1;\n  border-radius: 4px;\n  width: 32px;\n}\n\n.vote-buttons {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: var(--vote-button-width);\n}\n\n.vote-buttons.comment {\n  min-width: unset;\n}\n\n.vote-button {\n  align-items: center;\n  border-radius: 100%;\n  display: flex;\n  font-size: 24px;\n  height: 18px;\n  justify-content: center;\n  visibility: hidden;\n  width: 18px;\n}\n\na .vote-button, .voted-down, .voted-up {\n  color: rgb(var(--bs-warning-rgb));\n  visibility: visible;\n}\n\n.voted-down {\n  color: rgb(var(--bs-danger-rgb));;\n}\n\n.voted-up {\n  color: rgb(var(--bs-success-rgb));;\n}",
    },
    views: {
      commentItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> comment_list_item}}\n    {{> reply_form submitText="Add comment"}}\n    {{> comments}}\n  {{/with}}\n{{/layout}}',
      },
      commentList: {
        template:
          '{{#> layout}}\n  <div>\n    {{#each pageData.items}}\n      {{#with this}}\n        {{> comment_list_item}}\n      {{/with}}\n    {{/each}}\n  </div>\n  <footer class="ms-4">\n    <a href="{{pageData.links.more}}">More</a>\n  </footer>\n{{/layout}}',
      },
      jobItem: {
        template:
          "{{#> layout}}\n  {{#with pageData}}\n    {{> job_list_item}}\n    {{{bodyHTML}}}\n  {{/with}}\n{{/layout}}",
      },
      jobList: {
        template:
          '{{#> layout}}\n  <div class="mb-3 text-body-secondary">\n    These are jobs at YC startups. See more at\n    <span class="d-inline-flex">\n      <a href="https://www.ycombinator.com/jobs">\n        ycombinator.com/jobs\n      </a>.\n    </span>\n  </div>\n  {{#each pageData.items}}\n    {{#with this}}\n      {{> job_list_item}}\n    {{/with}}\n  {{/each}}\n  <a href="{{pageData.links.more}}">More</a>\n{{/layout}}',
      },
      pollItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> story_list_item}}\n    <div class="ms-5 mb-3 list-group">\n      {{#each options}}\n        {{#with this}}\n          {{> poll_option_item}}\n        {{/with}}\n      {{/each}}\n    </div>\n    {{> comments}}\n  {{/with}}\n{{/layout}}',
      },
      reply: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> comment_list_item}}\n    {{> reply_form submitText="Reply"}}\n  {{/with}}\n{{/layout}}',
      },
      storyItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> story_list_item}}\n    {{{bodyHTML}}}\n    {{> reply_form submitText="Add comment"}}\n    {{> comments}}\n  {{/with}}\n{{/layout}}',
      },
      storyList: {
        template:
          '{{#> layout}}\n  <div>\n    {{#each pageData.items}}\n      {{#with this}}\n        {{> story_list_item}}\n      {{/with}}\n    {{/each}}\n  </div>\n  <footer>\n    <a href="{{pageData.links.more}}">More</a>\n  </footer>\n{{/layout}}',
      },
      submit: {
        template:
          '{{#> layout}}\n  {{#with pageData.forms.submit}}\n    <div class="container-fluid">\n      <form action="{{action}}" method="{{method}}">\n        {{{hiddenInputsHTML}}}\n        <div class="row mb-2">\n          <div class="col-12 col-xl-6">\n            <label class="form-label mb-1" for="title">Title</label>\n            <input id="title" class="form-control w-100" name="title" type="text" maxlength="80" />\n          </div>\n        </div>\n        <div class="row mb-2">\n          <div class="col-12 col-xl-6">\n            <label class="form-label mb-1" for="url">Url</label>\n            <input id="url" class="form-control w-100" name="url" type="url" />\n          </div>\n        </div>\n        <div class="row mb-2">\n          <div class="col-12 col-xl-6">\n            <label class="form-label mb-1" for="text">Text</label>\n            {{> reply_form_text_field}}\n          </div>\n        </div>\n        <div class="row">\n          <div class="col-auto">\n            <input class="btn btn-secondary align-self-start" type="submit" value="Submit" />\n          </div>\n        </div>\n        <div class="row mt-4">\n          <div class="col-12 col-xl-8 text-body-secondary">\n            Leave url blank to submit a question for discussion. If there is no\n            url, text will appear at the top of the thread. If there is a url,\n            text is optional.\n          </div>\n        </div>\n      </form>\n    </div>\n  {{/with}}\n{{/layout}}',
      },
    },
  },
  label: "Magellan",
  options: {
    disableHNStyle: true,
  },
  type: "premade",
  version: "1.0.0",
};

export default theme;
