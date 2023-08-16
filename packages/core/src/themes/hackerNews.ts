import { TTheme } from "@hnp/types";

const theme: TTheme = {
  id: "hacker-news",
  label: "Hacker News",
  type: "premade",
  inputs: {
    comments: {
      partials: [
        {
          label: "Comments partial",
          name: "comments",
          template: `
{{#each children}}
  <div class="comments-partial">
    {{#if data.author}}
      <details class="comments-partial__details" open>
        <summary id="{{data.created_utc}}">
          •
          <a href="/user/{{data.author}}">
            {{data.author}}
          </a>
          {{prettyDate data.created_utc}}
        </summary>
        <div class="comments-partial__body">
          {{{data.body}}}
        </div>
        {{#with data.replies.data}}
          <div class="comments-partial__children">
            {{> comments}}
          </div>
        {{/with}}
      </details>
    {{else}}
      <a href="{{data.id}}">
        more replies...
      </a>
    {{/if}}
  </div>
{{/each}}
      `,
        },
      ],
      template: `
<div class="page-layout">
  <header class="page-header">
    <div class="page-header__logo">
      <a href="/">
        <img src={{logo.white}} />
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
    <div class="post-layout">
      {{#with data.post.data.children.0.data}}
        <div class="post-layout__title">
          <a href="{{permalink}}">
            {{{title}}}
          </a>
          <span class="post-result__url">
            (<a href="{{url}}">
              {{~truncate url~}}
            </a>)
          </span>
        </div>
        <div class="post-result__meta">
          {{ups}}
          points by
          <a href="/user/{{author}}">
            {{author}}
          </a>
          {{prettyDate created_utc}}
          |
          <a href="{{this.data.permalink}}">
            {{num_comments}} comments
          </a>
        </div>
        {{#if thumbnail}}
          <div class="post-result__thumbnail">
            <a href="{{url}}">
              <img src="{{thumbnail}}" />
            </a>
          </div>
        {{/if}}
      {{/with}}
    </div>
    <div class="comments-layout">
      {{#with data.comments.data}}
        <div class="comments-layout__container">
          {{> comments}}
        </div>
      {{/with}}
    </div>
  </div>
</div>
      `,
    },
    style: `
@media (min-width: 768px) {
  #rts-root {
    padding: 8px;
  }
}

.page-layout {
  margin-left: auto;
  margin-right: auto;
  color: #828282;
  font-size: 10pt;
  font-family: Verdana, Geneva, sans-serif;
  background-color: #f6f6ef;
}

@media (min-width: 768px) {
  .page-layout {
    width: 85%;
  }
}

.page-layout a {
  color: #828282;
  text-decoration: none;
}

.page-layout__body {
  padding: 5px;
}

.page-header {
  display: flex;
  align-items: center;
  padding: 2px;
  background-color: #ff6600;
  color: #000000;
  font-size: 10pt;
  overflow: hidden;
}

.page-header a {
  color: #000000;
}

.page-header__logo a {
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
}

.page-header__logo img {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}

.page-header__subreddit {
  display: flex;
}

.page-header__subreddit__link {
  color: #000000;
  text-transform: lowercase;
}

.page-header__subreddit__separator {
  margin-left: 3px;
  margin-right: 3px;
}

.page-footer {
  padding: 0 0 10px 30px;
}

.post-layout {
  margin-bottom: 30px;
}

.post-layout__title {
  margin-bottom: 2px;
}

.post-layout__title a {
  color: #000000;
}

.post-list__list {
  list-style: auto;
  padding-inline-start: 25px;
  margin-top: 0;
}

.post-result {
  margin-bottom: 5px;
}

.post-result__meta {
  font-size: 8pt;
}

.post-result__thumbnail {
  margin-top: 15px;
}

.post-result__thumbnail img {
  max-width: 400px;
}

.post-result__title {
  color: #000000;
}

.post-result__title a {
  color: #000000;
}

.post-result__url {
  font-size: 8pt;
}

.post-result__url a {
  color: #828282;
}

.comments-partial {
  font-size: 8pt;
  margin-bottom: 10px;
}

.comments-partial__body {
  font-size: 9pt;
  color: #000000;
  margin-bottom: 10px;
  margin-left: 10px;
}

.comments-partial__children {
  margin-left: 42px;
}

.comments-partial__details summary {
  margin-bottom: 2px;
  cursor: pointer;
  display: inline;
  pointer-events: none;
}

.comments-partial__details summary * {
  pointer-events: auto;
}

.comments-partial__details > summary:after {
  content: "[+]";
  pointer-events: auto;
}

.comments-partial__details[open] > summary:after {
  content: "[-]";
  pointer-events: auto;
}
    `,
    subreddit: {
      partials: [],
      template: `
<div class="page-layout">
  <header class="page-header">
    <div class="page-header__logo">
      <a href="/">
        <img src={{logo.white}} />
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
      <ol
        class="post-list__list"
        start="{{add (times data.data.limit data.data.page) 1}}"
      >
        {{#each data.data.children}}
          <li class="post-result">
            <span class="post-result__title">
              <a href="{{this.data.permalink}}">
                {{{this.data.title}}}
              </a>
            </span>
            <span class="post-result__url">
              (<a href="{{this.data.url}}">
                {{~truncate this.data.url~}}
              </a>)
            </span>
            <div class="post-result__meta">
              {{this.data.ups}}
              points by
              <a href="/user/{{this.data.author}}">
                {{this.data.author}}
              </a>
              {{prettyDate this.data.created_utc}}
              |
              <a href="{{this.data.permalink}}">
                {{this.data.num_comments}}
                comments
              </a>
            </div>
          </li>
        {{/each}}
      </ol>
    </div>
  </div>
  <footer class="page-footer">
    {{#if data.data.after}}
      <a href="{{data.data.nextUrl}}">
        More
      </a>
    {{/if}}
  </footer>
</div>
      `,
    },
  },
};

export default theme;
