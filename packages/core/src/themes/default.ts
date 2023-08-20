import { TTheme } from "@hnp/types";

const theme: TTheme = {
  id: "default",
  label: "Default",
  type: "premade",
  inputs: {
    list: {
      partials: [],
      template: `
<div>
  <img class="logo" src="{{assets.originalLogoUrl}}" />
  <div class="list-container">
    <ul>
      {{#each pageData.items}}
        {{#with this}}
          <li class="item-container">
            <div class="vote-buttons">
              {{#ifeq this.isSponsored true}}
                ★
              {{else}}
                {{#ifnoteq ../voted "up"}}
                  <hnp-interaction from="{{../interactions.voteUp}}">
                    <span class="vote-button">⬆</span>
                  </hnp-interaction>
                {{else}}
                  <span class="vote-button voted">⬆</span>
                {{/ifnoteq}}
                {{#ifnoteq ../voted "down"}}
                  <hnp-interaction from="{{../interactions.voteDown}}">
                    <span class="vote-button">⬇</span>
                  </hnp-interaction>
                {{else}}
                  <span class="vote-button">⬇</span>
                {{/ifnoteq}}
              {{/ifeq}}
            </div>
            <div>
              <div>
                <a href="{{siteUrl}}">
                  {{title}}
                </a>
                (<a href="{{fromUrl}}">{{siteName}}</a>)
              </div>
              <div>
                {{score}} points
                by 
                <a href="{{authorUrl}}">
                  {{author}}
                </a>
                {{createdHumanized}}
                |
                <a href="{{flagUrl}}">
                  <span>flag</span>
                </a>
                |
                <hnp-interaction from="{{interactions.hide}}">
                  <span>hide</span>
                </hnp-interaction>
                |
                <a href="{{itemUrl}}">
                  {{#ifeq this.commentsCount 0}}
                    discuss
                  {{else}}
                    {{../commentsCount}} comments
                  {{/ifeq}}
                </a>
              </div>
            </div>
          </li>
        {{/with}}
      {{/each}}
    </ul>
  </div>
</div>
      `,
    },
    style: `
body {
  font-family: Verdana;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
}

.item-container {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  padding: 0.25rem;
}

.list-container {
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}

.logo {
  height: 32px;
  width: 32px;
}

.vote-buttons {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 1.5rem;
}

.vote-button {
  align-items: center;
  border-radius: 100%;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;
  visibility: hidden;
}

a .vote-button, .voted {
  color: orange;
  visibility: visible;
}

.voted {
  color: green;
}
    `,
    item: {
      partials: [],
      template: `
<div class="page-layout">
  <header class="page-header">
    <div class="page-header__logo">
      <a href="/">
        <img src={{logo.color}} />
        Reddit
      </a>
    </div>
    {{#each subreddits}}
      <div class="page-header__subreddit">
        <a
          class="page-header__subreddit__link"
          href="//{{../config.hostname}}/{{this.to}}"
        >
          {{this.text}}
        </a>
        {{#ifnotend @index ../subreddits.length}}
          <span class="page-header__subreddit__separator">
            |
          </span>
        {{/ifnotend}}
      </div>
    {{/each}}
  </header>
  <div class="page-layout__body">
    <div class="post-list">
      {{#each data.data.children}}
        <div class="post-result">
          <div class="post-result__container">
            {{#if this.data.thumbnail}}
              <a href="{{this.data.url}}">
                <div
                  class="post-result__thumbnail"
                  style="background-image: url({{this.data.thumbnail}})"
                ></div>
              </a>
            {{/if}}
            <div>
              <span class="post-result__title">
                <a href="{{this.data.url}}">
                  {{{this.data.title}}}
                </a>
              </span>
              <div class="post-result__meta">
                submitted
                {{prettyDate this.data.created_utc}}
                by
                <a href="/user/{{this.data.author}}">
                  {{this.data.author}}
                </a>
                to
                <a href="/r/{{this.data.subreddit}}">                  
                  r/{{this.data.subreddit}}
                </a>
                <div>
                  {{this.data.ups}} upvotes •
                  <a href="{{this.data.permalink}}">
                    {{this.data.num_comments}}
                    comments
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      {{/each}}
    </div>
  </div>
  <footer>
    {{#if data.data.before}}
      <a href="{{data.data.prevUrl}}">
        <button>
          Prev
        </button>
      </a>
    {{/if}}
    {{#if data.data.after}}
      <a href="{{data.data.nextUrl}}">
        <button>
          Next
        </button>
      </a>
    {{/if}}
  </footer>
</div>
      `,
    },
    jobs: {
      template: "",
      partials: [],
    },
    other: {
      template: "",
      partials: [],
    },
    submit: {
      template: "",
      partials: [],
    },
    user: {
      template: "",
      partials: [],
    },
  },
};

export default theme;
