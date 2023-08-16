import { TTheme } from "@hnp/types";

const theme: TTheme = {
  id: "default",
  label: "Default",
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
          <a href="/user/{{data.author}}">
            {{data.author}}
          </a>
          {{data.ups}} points
          {{prettyDate data.created_utc}}
        </summary>
        <div class="comments-partial__body">
          {{{inject data.body_html}}}
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
    <div class="post-layout">
      {{#with data.post.data.children.0.data}}
        <div class="post-result__container">
          <div>
            <div class="post-layout__title">
              <a href="{{permalink}}">
                {{{title}}}
              </a>
            </div>
            <div class="post-result__meta">
              submitted
              {{prettyDate created_utc}}
              by
              <a href="/user/{{author}}">
                {{author}}
              </a>
              <div>
                {{ups}} upvotes •
                <a href="{{this.data.permalink}}">
                  {{num_comments}}
                  comments
                </a>
              </div>
            </div>
            <div class="comments-post__preview">
              {{#if media.reddit_video.fallback_url}}
                <video
                  autoplay
                  controls
                  muted
                  src="{{media.reddit_video.fallback_url}}"
                ></video>
              {{else}}
                {{#if preview.images.0.source.url}}
                  <a href="{{url}}">
                    <img src="{{{preview.images.0.source.url}}}" />
                  </a>
                {{/if}}
              {{/if}}
            </div>
          </div>
        </div>
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
blockquote {
  margin: 8px;
  padding: 8px;
  background-color: white;
  border: 1px solid lightgrey;
  border-left: 4px solid lightgrey;
}

button {
  border: none;
  padding: 10px 15px;
  margin-right: 4px;
}

.page-layout {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: grey;
  padding: 16px;
}

.page-layout a {
  color: black;
  text-decoration: none;
}

.page-header {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 16px;
}

.page-header__logo a {
  display: flex;
  align-items: center;
  margin-right: 16px;
  font-weight: bold;
}

.page-header__logo img {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.page-header__subreddit {
  display: flex;
  text-transform: lowercase;
}

.page-header__subreddit__separator {
  margin: 0 8px;
}

@media (min-width: 768px) {
  .post-list, footer {
    max-width: 768px;
    margin: 0 auto;
  }
}

.post-list__list {
  list-style: auto;
  margin-top: 16px;
}

.post-result {
  margin-bottom: 16px;
}

.post-result:not(:first-child):before {
  content: " ";
  width: 100%;
  border-top: 1px solid rgb(239, 239, 239);
  display: block;
  margin-bottom: 16px;
}

.post-result__title a {
  color: blue;
}

.post-result__title a:visited {
  color: purple;
}

.post-result__container {
  display: flex;
}

.post-result__meta {
  font-size: 0.75rem;
}

.post-result__points {
  min-width: 68px;
  font-weight: bold;
  margin-left: 8px;
}

.post-result__thumbnail {
  min-width: 70px;
  height: 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 8px;
}

.comments-layout__container > .comments-partial {
  border: 1px solid lightgrey;
  background-color: #FAF9F6;
  padding: 4px;
}

.comments-partial {
  margin-bottom: 8px;
  font-size: 0.75rem;
}

.comments-partial__body {
  color: #000000;
  margin-bottom: 16px;
  margin-left: 18px;
  font-size: 1rem;
}

.comments-partial__body a {
  color: blue;
}

.comments-partial__body p {
  margin: 8px 0;
}

.comments-partial__children {
  margin-left: 18px;
}

.comments-partial__details summary {
  cursor: pointer;
  display: inline;
  pointer-events: none;
}

.comments-partial__details summary * {
  pointer-events: auto;
}

.comments-partial__details > summary:before {
  content: "[+]";
  pointer-events: auto;
}

.comments-partial__details[open] > summary:before {
  content: "[-]";
  pointer-events: auto;
}

.comments-partial__details summary p {
  margin: 4px 0;
}

.comments-post__preview {
  margin: 16px 0;
}

.comments-post__preview img, video {
  width: 100%;
  max-width: 440px;
}
    `,
    subreddit: {
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
  },
};

export default theme;
