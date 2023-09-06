import { TTheme } from "@hnp/types";

export const DEFAULT_THEME_ID = "_default";

const theme: TTheme = {
  id: DEFAULT_THEME_ID,
  inputs: {
    components: [
      {
        id: "comment_list_item",
        label: "CommentListItem",
        template:
          '<div class="list-group-item container-fluid py-2 px-0">\n  <div class="row d-flex align-items-center g-0 gap-2">\n    <div class="col-auto align-self-start">\n      {{> vote_buttons}}\n    </div>\n    <div class="col">\n      <div class="fs-sm">\n        {{age.humanized}}\n        {{#ifnoteq user undefined}}\n          by\n          <a href="{{../user.link}}">\n            <span class="fw-bold">\n              {{../user.id}}\n            </span>\n          </a>\n        {{/ifnoteq}}\n        on\n        <a class="fw-bold" href="{{links.story}}">{{story.title}}</a>\n      </div>\n      <div class="body-html py-2 fs-sm">\n        {{{bodyHTML}}}\n      </div>\n      <div class="d-flex gap-2 fs-sm">\n        {{#ifnoteq links.flag undefined}}\n          <a href="{{../links.flag}}">flag</a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.unflag undefined}}\n          <a href="{{../links.unflag}}">unflag</a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.parent undefined}}\n          <a href="{{../links.parent}}">parent</a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.next undefined}}\n          <a href="{{../links.next}}">next</a>\n        {{/ifnoteq}}\n      </div>\n    </div>\n    <div class="col-auto text-end d-flex">\n      {{#ifnoteq links.item undefined}}\n        <a class="float-end text-orange" href="{{../links.item}}">\n          <div class="comment-count">   \n            <i class="float-start material-icons">chat</i>\n            {{../commentsCount}}\n          </div>\n        </a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "comment_tree",
        label: "CommentTree",
        template:
          '{{#each comments}}\n  <div class="anchor" id="{{data.id}}"></div>\n  <div class="comment-root accordion depth-mod-{{mod depth 2}}" id="accordion-{{data.id}}">\n    <div class="accordion-item fs-sm">\n      <div class="accordion-header">\n        <div class="d-flex align-items-center gap-2 actions text-nowrap py-2">\n          {{#with data}}\n            {{> vote_buttons}}\n          {{/with}}\n          <a href="{{data.user.link}}">\n            {{data.user.id}}\n          </a>\n          {{data.age.humanized}}\n          <hnp-interaction from="{{data.interactions.next}}">\n            next\n          </hnp-interaction>\n          <button\n            aria-controls="collapseOne"\n            aria-expanded="true"\n            class="accordion-button p-0"\n            data-bs-toggle="collapse"\n            data-bs-target="#collapse-{{data.id}}"\n            type="button"\n          ></button>\n        </div>\n      </div>\n      <div id="collapse-{{data.id}}" class="accordion-collapse collapse show" data-bs-parent="#accordion-{{data.id}}">\n        <div class="accordion-body px-2 py-0">\n          <div class="body-html">\n            {{{data.bodyHTML}}}\n          </div>\n          <div class="py-2">\n            {{#ifnoteq data.links.reply undefined}}\n              <a class="text-primary" href="{{../data.links.reply}}">reply</a>\n            {{/ifnoteq}}\n          </div>\n          {{> comment_tree}}\n        </div>\n      </div>\n    </div>\n  </div>\n{{/each}}',
      },
      {
        id: "comment_tree_container",
        label: "CommentTreeContainer",
        template:
          '<div class="comments-container">\n  {{> comment_tree}}\n</div>',
      },
      {
        id: "header",
        label: "Header",
        template:
          '<header class="row">\n  <div class="col-auto d-flex align-items-center">\n    <a href="/">\n      <img class="logo" src="{{assets.images.hnLogo_256}}" />\n    </a>\n  </div>\n  <nav class="d-none d-lg-flex col align-items-center gap-3">\n    <div class="d-flex">\n      {{#> header_nav_link href="/newest"}}New{{/header_nav_link}}\n      {{#> header_nav_link href="/front"}}Past{{/header_nav_link}}\n      {{#> header_nav_link href="/newcomments"}}Comments{{/header_nav_link}}\n      {{#> header_nav_link href="/ask"}}Ask{{/header_nav_link}}\n      {{#> header_nav_link href="/show"}}Show{{/header_nav_link}}\n      {{#> header_nav_link href="/jobs"}}Jobs{{/header_nav_link}}\n      {{#> header_nav_link href="/submit"}}Submit{{/header_nav_link}}\n    </div>\n  </nav>\n  {{#ifnoteq pageData.currentUser.isLoggedIn undefined}}\n    <div class="col d-flex align-items-center justify-content-end gap-1">\n      {{#ifeq ../pageData.currentUser.isLoggedIn true}}\n        {{#with ../pageData.currentUser}}\n          <a href="{{links.profile}}">\n            {{id}}\n            <span class="bg-secondary rounded px-2 fs-sm d-flex align-items-center justify-content-center ms-2">\n              {{karma}}\n            </span>\n          </a>\n          <a aria-label="logout" class="d-none d-lg-block" href="{{links.logout}}" title="Logout">\n            <i class="material-icons ms-2">logout</i>\n          </a>\n        {{/with}}\n      {{else}}\n        <a href="{{../pageData.currentUser.links.login}}">\n          Login\n        </a>\n      {{/ifeq}}\n    </div>\n  {{/ifnoteq}}\n  \n  {{!--Mobile menu--}}\n  <div class="col-auto d-lg-none text-end">\n    <div class="dropdown text-nowrap my-2">\n      <button\n        aria-expanded="false"\n        aria-label="menu"\n        class="btn btn-dark dropdown-toggle text-uppercase fw-bold text-nav p-2 rounded-pill"\n        data-bs-toggle="dropdown"\n        title="Menu"\n        type="button"\n      >\n        <i class="material-icons">menu</i>\n      </button>\n      <ul class="dropdown-menu">\n        <li><a class="dropdown-item" href="/newest">New</a></li>\n        <li><a class="dropdown-item" href="/front">Past</a></li>\n        <li><a class="dropdown-item" href="/newcomments">Comments</a></li>\n        <li><a class="dropdown-item" href="/ask">Ask</a></li>\n        <li><a class="dropdown-item" href="/show">Show</a></li>\n        <li><a class="dropdown-item" href="/jobs">Jobs</a></li>\n        <li><a class="dropdown-item" href="/submit">Submit</a></li>\n        {{#ifnoteq pageData.currentUser.isLoggedIn undefined}}\n          {{#ifeq ../pageData.currentUser.isLoggedIn true}}\n            <li><hr class="dropdown-divider"></li>\n            <li>\n              <a class="dropdown-item" href="{{../pageData.currentUser.links.logout}}">\n                <i class="material-icons me-3">logout</i>Logout\n              </a>\n            </li>\n          {{/ifeq}}\n        {{/ifnoteq}}\n      </ul>\n    </div>\n  </div>\n</header>',
      },
      {
        id: "header_nav_link",
        label: "HeaderNavLink",
        template:
          '<a\n  class="px-2 py-3 {{#ifeq config.pathname href}} active{{/ifeq}}"\n  href="{{href}}"\n>\n  {{> @partial-block}}\n</a>',
      },
      {
        id: "job_list_item",
        label: "JobListItem",
        template:
          '<div class="list-group-item container-fluid py-2 px-0">\n  <div class="row d-flex align-items-center g-0 gap-2">\n    <div class="col">\n      <a\n        href="{{#ifnoteq site undefined}}{{../site.url}}{{else}}{{../links.item}}{{/ifnoteq}}"\n      >\n        {{title}}\n      </a>\n      <div class="fs-sm">\n        {{age.humanized}}\n      </div>\n      <div class="d-flex gap-2 fs-sm">\n        {{#ifnoteq links.from undefined}}\n          <a href="{{../links.from}}">{{../site.name}}</a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.hide undefined}}\n          <a href="{{../links.hide}}">\n            hide\n          </a>\n        {{/ifnoteq}}\n      </div>\n    </div>\n  </div>\n</div>',
      },
      {
        id: "more_link",
        label: "MoreLink",
        template:
          '{{#ifnoteq links.more undefined}}\n  <div class="mt-3">\n    <a href="{{../links.more}}">\n      <button class="btn btn-primary">\n        Next\n        <i class="material-icons">chevron_right</i>\n      </button>\n    </a>\n  </div>\n{{/ifnoteq}}\n',
      },
      {
        id: "page_layout",
        label: "PageLayout",
        template:
          '<div class="bg-dark border-bottom position-sticky top-0 z-1 shadow-sm">\n  <div class="container-fluid container-page mx-auto">\n    {{> header}}\n  </div>\n</div>\n<main class="container-fluid container-page py-3">\n  {{> @partial-block}}\n</main>',
      },
      {
        id: "poll_option_item",
        label: "PollOptionItem",
        template:
          '<div class="list-group-item row d-flex align-items-center g-0 gap-2">\n  <div class="col-auto align-self-start">\n    {{> vote_buttons}}\n  </div>\n  <div class="col">\n    {{title}}\n  </div>\n</div>',
      },
      {
        id: "reply_form",
        label: "ReplyForm",
        template:
          '{{#ifnoteq forms.comment.action undefined}}\n  {{#with ../forms.comment}}\n    <form class="row" action="{{action}}" method="{{method}}">\n      {{{hiddenInputsHTML}}}\n      <div class="col">\n        <textarea class="form-control mb-2" name="text" rows="5"></textarea>\n        <input class="btn btn-primary" type="submit" value="{{../../submitText}}" />\n      </div>\n    </form>\n  {{/with}}\n{{/ifnoteq}}',
      },
      {
        id: "story_list_item",
        label: "StoryListItem",
        template:
          '<div class="list-group-item container-fluid py-2 px-0">\n  <div class="row d-flex align-items-center g-0 gap-2">\n    <div class="col-auto">\n      {{> vote_buttons}}\n    </div>\n    <div class="col">\n      <div>\n        {{#ifnoteq site undefined}}\n          <a class="fw-bold" href="{{../site.url}}">{{../title}}</a>\n        {{else}}\n          <a href="{{../links.item}}">\n            {{../title}}\n          </a>\n        {{/ifnoteq}}\n      </div>\n      <div class="fs-sm">\n        {{age.humanized}}\n        {{#ifnoteq user undefined}}\n          by\n          <a href="{{../user.link}}">\n            <span class="fw-bold">\n              {{../user.id}}\n            </span>\n          </a>\n        {{/ifnoteq}}\n      </div>\n      <div class="d-flex gap-2 fs-sm">\n        {{#ifnoteq links.flag undefined}}\n          <a href="{{../links.flag}}">flag</a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.unflag undefined}}\n          <a href="{{../links.unflag}}">unflag</a>\n        {{/ifnoteq}}\n        {{#ifnoteq interactions.hide undefined}}\n          <hnp-interaction from="{{../interactions.hide}}">\n            hide\n          </hnp-interaction>\n        {{/ifnoteq}}\n        {{#ifnoteq links.past undefined}}\n          <a href="{{../links.past}}">past</a>\n        {{/ifnoteq}}\n        {{#ifnoteq links.favorite undefined}}\n          <a href="{{../links.favorite}}">favorite</a>\n        {{/ifnoteq}}\n        {{#ifnoteq site undefined}}\n          <i class="material-icons fs-sm mt-1">chevron_right</i>\n          <span>\n            <a href="{{../links.from}}">{{../site.name}}</a>\n          </span>\n        {{/ifnoteq}}\n      </div>\n    </div>\n    <div class="col-auto text-end d-flex">\n      {{#ifnoteq links.item undefined}}\n        <a class="float-end text-orange" href="{{../links.item}}">\n          <div class="comment-count">   \n            <i class="float-start material-icons">chat</i>\n            {{../commentsCount}}\n          </div>\n        </a>\n      {{/ifnoteq}}\n    </div>\n  </div>\n</div>',
      },
      {
        id: "vote_buttons",
        label: "VoteButtons",
        template:
          '<div class="vote-buttons fs-sm">\n  {{#ifnoteq voted "up"}}\n    <hnp-interaction from="{{../interactions.voteUp}}">\n      <span aria-label="vote up" class="vote-button">\n        <i class="material-icons fs-sm">thumb_up</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-up">\n      <i class="material-icons fs-sm">thumb_up</i>\n    </span>\n  {{/ifnoteq}}\n  {{#ifnoteq score undefined}}\n    {{../score}}\n  {{/ifnoteq}}\n  {{#ifnoteq voted "down"}}\n    <hnp-interaction from="{{../interactions.voteDown}}">\n      <span aria-label="vote down" class="vote-button">\n        <i class="material-icons fs-sm">thumb_down</i>\n      </span>\n    </hnp-interaction>\n  {{else}}\n    <span class="vote-button voted-down">\n      <i class="material-icons fs-sm">thumb_down</i>\n    </span>\n  {{/ifnoteq}}\n</div>',
      },
    ],
    style: {
      options: {
        darkMode: true,
      },
      template:
        ':root {\n  --header-height: 58px;\n  --theme-primary-color: rgb(239, 48, 84);\n  --theme-primary-color-dark: rgb(209, 16, 51);\n  --theme-secondary-color: rgb(43, 192, 22);\n  --theme-secondary-color-dark: rgb(32, 146, 17);\n  --vote-button-width: 40px;\n}\n\na {\n  color: var(--bs-body-color);\n  text-decoration: none;\n  transition: color 0.2s ease-in-out;\n}\n\na:hover {\n  color: var(--bs-emphasis-color);\n}\n\nbody {\n  font-family: -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    Helvetica,\n    Arial,\n    sans-serif,\n    "Apple Color Emoji",\n    "Segoe UI Emoji",\n    "Segoe UI Symbol";\n}\n\ncode {\n  white-space: pre-wrap;\n}\n\nheader {\n  height: var(--header-height);\n}\n\nheader .logo {\n  aspect-ratio: 1 / 1;\n  border-radius: 6px;\n  border-top-left-radius: 0;\n  width: 32px;\n}\n\nheader a {\n  align-items: center;\n  color: var(--bs-gray-500);\n  display: flex;\n  font-weight: bold;\n  position: relative;\n}\n\nheader a:hover {\n  color: var(--bs-white);\n}\n\nheader nav a {\n  height: 100%;\n}\n\nheader a.active:after {\n  border-bottom: 2px solid var(--theme-primary-color);\n  bottom: -1px;\n  content: " ";\n  left: 0;\n  position: absolute;\n  width: 100%;\n}\n\np {\n  margin-top: 1rem;\n}\n\np:last-child {\n  margin-bottom: 0;\n}\n\ntextarea {\n  max-width: 100%;\n  min-width: 250px;\n  resize: both;\n}\n\n/* Bootstrap overrides ------------------------------------------------------ */\n\n.accordion {\n  --bs-accordion-btn-icon: url(\'{{assets.icons.expandDown_dark}}\');\n  --bs-accordion-btn-active-icon: url(\'{{assets.icons.expandDown_dark}}\');\n}\n\n[data-bs-theme=dark] .accordion-button:after {\n  --bs-accordion-btn-icon: url(\'{{assets.icons.expandDown_dark}}\');\n  --bs-accordion-btn-active-icon: url(\'{{assets.icons.expandDown_dark}}\');\n}\n\n.accordion-body {\n  margin-left: var(--vote-button-width);\n}\n\n.accordion-button {\n  background-color: unset;\n  pointer-events: none;\n}\n\n.accordion-button:after {\n  margin-left: 0;\n  pointer-events: auto;\n  filter: grayscale(1);\n}\n\n.accordion-button:focus {\n  box-shadow: unset;\n}\n\n.accordion-button:not(.collapsed) {\n  background-color: unset;\n  color: unset;\n  box-shadow: unset;\n}\n\n.accordion-item {\n  background-color: unset;\n  border: none;\n  color: var(--text-color);\n}\n\n.bg-secondary {\n  background-color: var(--bs-gray-700) !important;\n}\n\n.btn-primary {\n  --bs-btn-bg: var(--theme-primary-color);\n  --bs-btn-border-color: var(--theme-primary-color);\n  --bs-btn-hover-bg: var(--theme-primary-color-dark);\n  --bs-btn-hover-border-color: var(--theme-primary-color-dark);\n  --bs-btn-active-bg: var(--theme-primary-color-dark);\n  --bs-btn-active-border-color: var(--theme-primary-color-dark);\n}\n\n.collapsing {\n  transition: none !important;\n}\n\n.dropdown-item.active, .dropdown-item:active {\n  background-color: var(--theme-primary-color);  \n}\n\n.dropdown-toggle:after {\n  display: none;\n}\n\n.dropdown-toggle {\n  color: var(--bs-gray-500);\n}\n\n.text-primary {\n  color: var(--theme-primary-color) !important;\n}\n\n/* Utilities ---------------------------------------------------------------- */\n\n.fs-sm {\n  font-size: 0.8rem !important;\n}\n\n.gap-1 {\n  gap: 0.25rem;\n}\n\n.gap-2 {\n  gap: 0.5rem;\n}\n\n.gap-3 {\n  gap: 1rem;\n}\n\n/* Theme -------------------------------------------------------------------- */\n\n.anchor {\n  display: block;\n  position: relative;\n  top: calc(var(--header-height) * -1);\n  visibility: hidden;\n}\n\n.body-html a {\n  text-decoration: underline;\n}\n\n.comments-container .comment-root {\n  margin-bottom: 0.25rem;\n}\n\n.comments-container .comment-root:last-child {\n  margin-bottom: 0;\n}\n\n.comment-count {\n  width: 75px;\n}\n\n.comment-root.depth-mod-0 {\n  background: color-mix(in srgb, var(--bs-border-color) 50%, var(--bs-body-bg));\n}\n\n.comment-root.depth-mod-1 {\n  background: var(--bs-body-bg);\n}\n\n.container-page {\n  max-width: 1200px;\n}\n\n.vote-buttons {\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  min-width: var(--vote-button-width);\n}\n\n.vote-button {\n  align-items: center;\n  border-radius: 100%;\n  display: flex;\n  font-size: 24px;\n  height: 18px;\n  justify-content: center;\n  visibility: hidden;\n  width: 18px;\n}\n\na .vote-button, .voted-down, .voted-up {\n  color: var(--theme-primary-color);\n  visibility: visible;\n}\n\na .vote-button:hover {\n  color: var(--theme-primary-color-dark);\n}\n\n.voted-down, .voted-up {\n  color: var(--theme-secondary-color);\n}\n',
    },
    views: {
      commentItem: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{> comment_list_item}}\n    </div>\n    <div class="ms-5">\n      {{> reply_form submitText="Reply"}}\n    </div>\n    {{> comment_tree_container}}\n    {{> more_link}}\n  {{/with}}\n{{/page_layout}}',
      },
      commentList: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{#each items}}\n        {{> comment_list_item}}\n      {{/each}}\n    </div>\n    {{> more_link}}\n  {{/with}}\n{{/page_layout}}',
      },
      jobItem: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{> job_list_item}}\n    </div>\n    {{#ifnoteq bodyHTML undefined}}\n      <div class="body-html pt-2 pb-3 fs-sm border-top">\n        {{{../bodyHTML}}}\n      </div>\n    {{/ifnoteq}}\n  {{/with}}\n{{/page_layout}}',
      },
      jobList: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{#each items}}\n        {{> job_list_item}}\n      {{/each}}\n    </div>\n    {{> more_link}}\n  {{/with}}\n{{/page_layout}}',
      },
      pollItem: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="mb-2">\n      <div class="container-fluid">\n        {{> story_list_item}}\n      </div>\n      <div class="list-group ps-5 ms-2 py-3">\n        {{#each options}}\n          {{#with this}}\n            {{> poll_option_item}}\n          {{/with}}\n        {{/each}}\n      </div>\n    </div>\n    {{> comment_tree_container}}\n  {{/with}}\n{{/page_layout}}',
      },
      reply: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{> comment_list_item}}\n    </div>\n    <div class="ms-5">\n      {{> reply_form submitText="Reply"}}\n    </div>\n  {{/with}}\n{{/page_layout}}',
      },
      storyItem: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{> story_list_item}}\n    </div>\n    {{#ifnoteq bodyHTML undefined}}\n      <div class="body-html ms-5 pt-2 pb-3 fs-sm border-top">\n        {{{../bodyHTML}}}\n      </div>\n    {{/ifnoteq}}\n    <div class="ms-5">\n      {{> reply_form submitText="Add comment"}}\n    </div>\n    {{> comment_tree_container}}\n    {{> more_link}}\n  {{/with}}\n{{/page_layout}}',
      },
      storyList: {
        template:
          '{{#> page_layout}}\n  {{#with pageData}}\n    <div class="list-group list-group-flush">\n      {{#each items}}\n        {{> story_list_item}}\n      {{/each}}\n    </div>\n    {{> more_link}}\n  {{/with}}\n{{/page_layout}}',
      },
      submit: {
        template:
          '{{#> page_layout}}\n  {{#with pageData.forms.submit}}\n    <form action="{{action}}" method="{{method}}">\n      {{{hiddenInputsHTML}}}\n      <div class="row mb-2">\n        <div class="col-12 col-lg-5">\n          <label class="form-label mb-1" for="title">Title</label>\n          <input id="title" class="form-control w-100" name="title" type="text" maxlength="80" />\n        </div>\n      </div>\n      <div class="row mb-2">\n        <div class="col-12 col-lg-5">\n          <label class="form-label mb-1" for="url">Url</label>\n          <input id="url" class="form-control w-100" name="url" type="url" />\n        </div>\n      </div>\n      <div class="row mb-2">\n        <div class="col">\n          <label class="form-label mb-1" for="text">Text</label>\n          <textarea id="text" class="form-control" name="text" rows="4" cols="49" wrap="virtual"></textarea>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-12 col-lg-5">\n          <input class="btn btn-secondary" type="submit" value="Submit" />\n        </div>\n      </div>\n      <div class="row mt-4">\n        <div class="col-12 col-lg-8">\n          Leave url blank to submit a question for discussion. If there is no\n          url, text will appear at the top of the thread. If there is a url,\n          text is optional.\n        </div>\n      </div>\n    </form>\n  {{/with}}\n{{/page_layout}}',
      },
    },
  },
  label: "Hacker News Pro",
  options: {
    disableHNStyle: true,
  },
  type: "premade",
  version: "1.0.0",
};

export default theme;
