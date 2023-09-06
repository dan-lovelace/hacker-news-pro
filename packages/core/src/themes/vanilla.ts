import { TTheme } from "@hnp/types";

const theme: TTheme = {
  id: "_vanilla",
  inputs: {
    components: [
      {
        id: "comment_list_item",
        label: "Comment List Item",
        template:
          '<div class="item-container">\n  {{> vote_buttons}}\n  <div>\n    <a href="{{user.link}}">{{user.id}}</a>\n    {{age.humanized}} |\n    {{#ifnoteq links.parent undefined}}\n      <a href="{{../links.parent}}">parent</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.context undefined}}\n      <a href="{{../links.context}}">context</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.next undefined}}\n      <a href="{{../links.next}}">next</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.flag undefined}}\n      <a href="{{../links.flag}}">flag</a> |\n    {{/ifnoteq}}\n    {{#ifnoteq links.favorite undefined}}\n      <a href="{{../links.favorite}}">favorite</a> |\n    {{/ifnoteq}}\n    on:\n    <a href="{{links.story}}">{{story.title}}</a>\n    <div>\n      {{{bodyHTML}}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "comments",
        label: "Comments",
        template:
          '{{#each comments}}\n  <div class="comment-root row g-0" id="{{data.id}}">\n    <div class="col-auto pe-2">\n      {{#with data}}\n        {{> vote_buttons}}\n      {{/with}}\n    </div>\n    <details class="col" open>\n      <summary class="fs-sm">\n        <a href="{{data.user.link}}">\n          {{data.user.id}}\n        </a>\n        {{data.age.humanized}}\n        {{#ifnoteq data.interactions.next undefined}}\n          |\n        {{/ifnoteq}}\n        <hnp-interaction from="{{data.interactions.next}}">\n          next\n        </hnp-interaction>\n      </summary>\n      <div class="comment-body py-2">\n        {{{data.bodyHTML}}}\n      </div>\n      <div class="my-2">\n        {{#ifnoteq data.links.reply undefined}}\n          <a class="fs-sm" href="{{../data.links.reply}}">reply</a>\n        {{/ifnoteq}}\n      </div>\n      {{> comments}}\n    </details>\n  </div>\n{{/each}}',
      },
      {
        id: "header",
        label: "Header",
        template:
          '<header class="d-flex align-items-center row g-0 p-1">\n  <div class="col-auto">\n    <a href="/">\n      <img class="logo" src="{{assets.images.hnLogo}}" />\n    </a>\n  </div>\n  <div class="col">\n    <div class="row g-0 g-lg-2">\n      <a class="col-12 col-lg-auto" href="/news">\n        <strong>Hacker News</strong>\n      </a>\n      <div class="col-12 col-lg">\n        <a href="/newest">new</a> |\n        <a href="/front">past</a> |\n        <a href="/newcomments">comments</a> |\n        <a href="/ask">ask</a> |\n        <a href="/show">show</a> |\n        <a href="/jobs">jobs</a> |\n        <a href="/submit">submit</a>\n      </div>\n    </div>\n  </div>\n  {{#ifnoteq pageData.currentUser.isLoggedIn undefined}}\n    <div class="col-12 col-lg-auto text-end">\n      {{#ifeq ../pageData.currentUser.isLoggedIn true}}\n        {{#with ../pageData.currentUser}}\n          <a href="{{links.profile}}">{{id}}</a>\n          ({{karma}}) |\n          <a href="{{links.logout}}">logout</a>\n        {{/with}}\n      {{else}}\n        <a href="{{../pageData.currentUser.links.login}}">login</a>\n      {{/ifeq}}\n    </div>\n  {{/ifnoteq}}\n</header>',
      },
      {
        id: "job_list_item",
        label: "Job List Item",
        template:
          '<div class="item-container">\n  <div>\n    <a\n      href="{{#ifnoteq site undefined}}{{../site.url}}{{else}}{{../links.item}}{{/ifnoteq}}"\n    >\n      {{title}}\n    </a>\n    {{#ifnoteq links.from undefined}}\n      <span class="fs-sm">\n        (<a href="{{../links.from}}">{{../site.name}}</a>)\n      </span>\n    {{/ifnoteq}}\n    <div class="fs-sm">\n      {{age.humanized}}\n      {{#ifnoteq links.hide undefined}}\n        |\n        <a href="{{links.hide}}">\n          hide\n        </a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "layout",
        label: "Layout",
        template:
          '<div class="container-page mx-auto">\n  {{> header}}\n  <main class="p-2">\n    {{> @partial-block}}\n  </main>\n</div>',
      },
      {
        id: "more_link",
        label: "More Link",
        template:
          '<a class="more-link {{#ifnoteq class undefined}}{{../class}}{{else}}ps-1{{/ifnoteq}}" href="{{pageData.links.more}}">\n  More\n</a>',
      },
      {
        id: "poll_option_item",
        label: "Poll Option Item",
        template:
          '<div class="item-container poll-options">\n  {{> vote_buttons}}\n  <div>\n    {{title}}\n    <div>\n      {{score}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "reply_form",
        label: "Reply Form",
        template:
          '{{#ifnoteq forms.comment.action undefined}}\n  {{#with ../forms.comment}}\n    <form class="row g-0" action="{{action}}" method="{{method}}">\n      {{{hiddenInputsHTML}}}\n      <div class="col-auto">\n        <textarea class="form-control mb-2" name="text" rows="4" cols="80"></textarea>\n        <input class="btn btn-secondary" type="submit" value="{{../../submitText}}" />\n      </div>\n    </form>\n  {{/with}}\n{{/ifnoteq}}',
      },
      {
        id: "story_list_item",
        label: "Story List Item",
        template:
          '<div class="item-container">\n  {{> vote_buttons}}\n  <div>\n    <div>\n      {{#ifnoteq site undefined}}\n        <a href="{{../site.url}}">{{../title}}</a>\n        <span class="fs-sm">\n          (<a href="{{../links.from}}">{{../site.name}}</a>)\n        </span>\n      {{else}}\n        <a href="{{../links.item}}">\n          {{../title}}\n        </a>\n      {{/ifnoteq}}\n    </div>\n    <div class="fs-sm">\n      {{#ifnoteq score undefined}}\n        {{../score}} points\n      {{/ifnoteq}}\n      {{#ifnoteq user undefined}}\n        by\n        <a href="{{../user.link}}">{{../user.id}}</a>\n      {{/ifnoteq}}\n      {{age.humanized}} |\n      {{#ifnoteq links.flag undefined}}\n        <a href="{{../links.flag}}">flag</a> |\n      {{/ifnoteq}}\n      {{#ifnoteq links.unflag undefined}}\n        <a href="{{../links.unflag}}">unflag</a> |\n      {{/ifnoteq}}\n      {{#ifnoteq interactions.hide undefined}}\n        <hnp-interaction from="{{../interactions.hide}}">\n          hide\n        </hnp-interaction> |\n      {{/ifnoteq}}\n      {{#ifnoteq links.past undefined}}\n        <a href="{{../links.past}}">past</a> |\n      {{/ifnoteq}}\n      {{#ifnoteq links.favorite undefined}}\n        <a href="{{../links.favorite}}">favorite</a> |\n      {{/ifnoteq}}\n      {{#ifnoteq links.item undefined}}\n        <a href="{{../links.item}}">\n          {{#ifeq ../commentsCount 0}}\n            discuss\n          {{else}}\n            {{../commentsCount}}\n            comments\n          {{/ifeq}}\n        </a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "vote_buttons",
        label: "Vote Buttons",
        template:
          '<div class="vote-buttons">\n  {{#ifnoteq voted "up"}}\n    <hnp-interaction from="{{../interactions.voteUp}}">\n      <span class="vote-button">\n        <i class="material-icons">keyboard_arrow_up</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-up">\n      <i class="material-icons">keyboard_arrow_up</i>\n    </span>\n  {{/ifnoteq}}\n  {{#ifnoteq voted "down"}}\n    <hnp-interaction from="{{../interactions.voteDown}}">\n      <span class="vote-button">\n        <i class="material-icons">keyboard_arrow_down</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-down">\n      <i class="material-icons">keyboard_arrow_down</i>\n    </span>\n  {{/ifnoteq}}\n</div>',
      },
    ],
    style: {
      options: {
        darkMode: false,
      },
      template:
        ':root {\n  --hn-orange: #ff6600;\n  --hn-off-white: #f6f6ef;\n  --theme-primary: #1098F7;\n  --theme-primary-dark: #0782DA;\n  --vote-button-width: 18px;\n}\n\na {\n  color: var(--bs-body-color);\n  text-decoration: none;\n}\n\nbody {\n  font-family: Verdana, Geneva, sans-serif;\n}\n\ncode {\n  white-space: pre-wrap;\n}\n\ndetails summary {\n  cursor: pointer;\n  display: inline;\n}\n\ndetails summary * {\n  pointer-events: auto;\n}\n\ndetails > summary:after {\n  content: "[+]";\n  pointer-events: auto;\n}\n\ndetails[open] > summary:after {\n  content: "[-]";\n  pointer-events: auto;\n}\n\nheader {\n  background-color: var(--hn-orange);\n  color: var(--bs-black);\n}\n\nheader a {\n  color: var(--bs-black);\n}\n\np {\n  margin-top: 1rem;\n}\n\np:last-child {\n  margin-bottom: 0;\n}\n\ntextarea {\n  max-width: 100%;\n  resize: both;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n}\n\n.comment-body a {\n  text-decoration: underline;\n}\n\n.comment-root .comment-root {\n  margin-left: 1.5rem;\n}\n\n.container-page {\n  background-color: var(--hn-off-white);\n  margin: 0.5rem 0;\n  width: 85%;\n}\n\n[data-bs-theme=dark] .container-page {\n  background-color: color-mix(in srgb, var(--hn-off-white) 10%, var(--bs-body-bg));\n}\n\n@media (max-width: 991px) {\n  .container-page {\n    margin: 0;\n    width: 100%;\n  }\n}\n\n.fs-sm {\n  font-size: 0.8rem !important;\n}\n\n.item-container {\n  display: flex;\n  gap: 0.25rem;\n  margin-bottom: 0.5rem;\n}\n\n.item-details-container {\n  margin-left: calc(var(--vote-button-width) + 0.25rem);\n}\n\n.logo {\n  border: 1px solid var(--bs-light);\n  height: 24px;\n  margin-right: 8px;\n  width: 24px;\n}\n\n.more-link {\n  margin-left: var(--vote-button-width);\n}\n\n.poll-options {\n  margin-left: 2rem;\n}\n\n.vote-buttons {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: var(--vote-button-width);\n}\n\n.vote-button {\n  align-items: center;\n  border-radius: 100%;\n  display: flex;\n  height: var(--vote-button-width);\n  justify-content: center;\n  width: var(--vote-button-width);\n  visibility: hidden;\n}\n\na .vote-button, .voted-down, .voted-up {\n  color: var(--bs-orange);\n  visibility: visible;\n}\n\n.voted-down {\n  color: var(--bs-danger);\n}\n\n.voted-up {\n  color: var(--bs-success);\n}\n',
    },
    views: {
      commentItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> comment_list_item}}\n    {{> reply_form submitText="Add comment"}}\n    <div class="mt-4">\n      {{> comments}}\n    </div>\n  {{/with}}\n{{/layout}}',
      },
      commentList: {
        template:
          "{{#> layout}}\n  {{#each pageData.items}}\n    {{#with this}}\n      {{> comment_list_item}}\n    {{/with}}\n  {{/each}}\n  {{> more_link}}\n{{/layout}}",
      },
      jobItem: {
        template:
          "{{#> layout}}\n  {{#with pageData}}\n    {{> job_list_item}}\n    {{{bodyHTML}}}\n  {{/with}}\n{{/layout}}",
      },
      jobList: {
        template:
          '{{#> layout}}\n  <div class="pb-3 text-secondary-emphasis">\n    These are jobs at YC startups. See more at\n    <span class="d-inline-flex">\n      <a href="https://www.ycombinator.com/jobs">\n        ycombinator.com/jobs\n      </a>.\n    </span>\n  </div>\n  {{#each pageData.items}}\n    {{#with this}}\n      {{> job_list_item}}\n    {{/with}}\n  {{/each}}\n  {{> more_link class="p-0 m-0"}}\n{{/layout}}',
      },
      pollItem: {
        template:
          "{{#> layout}}\n  {{#with pageData}}\n    {{> story_list_item}}\n    {{#each options}}\n      {{#with this}}\n        {{> poll_option_item}}\n      {{/with}}\n    {{/each}}\n    {{> comments}}\n  {{/with}}\n{{/layout}}",
      },
      reply: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> comment_list_item}}\n    <div class="item-details-container">\n      {{> reply_form submitText="Reply"}}\n    </div>\n  {{/with}}\n{{/layout}}',
      },
      storyItem: {
        template:
          '{{#> layout}}\n  {{#with pageData}}\n    {{> story_list_item}}\n    <div class="item-details-container">\n      {{{bodyHTML}}}\n      {{> reply_form submitText="Add comment"}}\n    </div>\n    {{> comments}}\n  {{/with}}\n{{/layout}}',
      },
      storyList: {
        template:
          "{{#> layout}}\n  {{#each pageData.items}}\n    {{#with this}}\n      {{> story_list_item}}\n    {{/with}}\n  {{/each}}\n  {{> more_link}}\n{{/layout}}",
      },
      submit: {
        template:
          '{{#> layout}}\n  <div class="container-fluid">\n    {{#with pageData.forms.submit}}\n      <form action="{{action}}" method="{{method}}">\n        {{{hiddenInputsHTML}}}\n        <div class="row mb-2">\n          <div class="col-12 col-lg-5">\n            <label class="form-label" for="title">Title</label>\n            <input id="title" class="form-control w-100" name="title" type="text" maxlength="80" />\n          </div>\n        </div>\n        <div class="row mb-2">\n          <div class="col-12 col-lg-5">\n            <label class="form-label" for="url">Url</label>\n            <input id="url" class="form-control w-100" name="url" type="url" />\n          </div>\n        </div>\n        <div class="row mb-2">\n          <div class="col-12 col-lg-auto">\n            <label class="form-label" for="text">Text</label>\n            <textarea id="text" class="form-control" name="text" rows="4" cols="49" wrap="virtual"></textarea>\n          </div>\n        </div>\n        <div class="row">\n          <div class="col-12 col-lg-5">\n            <input class="btn btn-secondary" type="submit" value="Submit" />\n          </div>\n        </div>\n        <div class="row mt-4">\n          <div class="col-12 col-lg-8">\n            Leave url blank to submit a question for discussion. If there is no\n            url, text will appear at the top of the thread. If there is a url,\n            text is optional.\n          </div>\n        </div>\n      </form>\n    {{/with}}\n  </div>\n{{/layout}}',
      },
    },
  },
  label: "Vanilla",
  options: {
    disableHNStyle: true,
  },
  type: "premade",
  version: "1.0.0",
};
export default theme;
