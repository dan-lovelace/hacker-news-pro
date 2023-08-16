import { TTheme } from "@hnp/types";

const theme: TTheme = {
  id: "mako",
  label: "Mako",
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
<div class="page-wrapper">
  <aside class="page-wrapper__sidebar">
    <a href="/">
      <img class="logo" src="{{logo.color}}" />
    </a>
    <div class="subreddits">
      {{#each subreddits}}
        <a href="//{{../config.hostname}}/{{this.to}}">
          {{this.text}}
        </a>
      {{/each}}
    </div>
  </aside>
  <article class="page-wrapper__content">
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
  </article>
</div>
      `,
    },
    style: `
/*
  Palette:
  https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500
*/

html, #rts-root, #rts-content, .page-wrapper {
  height: 100%;
  overflow: hidden;
}

a {
  color: #219EBC !important;
  text-decoration: none;
}

button {
  border: none;
  padding: 10px 20px;
  background-color: #023047;
  color: #FFB703;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 150ms;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  cursor: pointer;
}

button:hover {
  background-color: #034464;
}

.page-wrapper {
  display: grid;
  grid-template-columns: 250px auto;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !important;
  overflow: hidden;
}

.page-wrapper__sidebar {
  grid-row: 1 / 3;
  border-right: 1px solid #F0F0F0;
  padding: 16px;
  overflow-y: auto;
}

.page-wrapper__sidebar .logo {
  width: 36px;
  height: 36px;
  margin-right: 16px;
  margin-bottom: 16px;
}

.page-wrapper__sidebar .subreddits a {
  display: block;
  padding: 4px 8px;
  border-radius: 4px !important;
  transition: background-color 150ms;
  white-space: inherit;
  font: inherit;
  height: auto;
}

.page-wrapper__sidebar .subreddits a:hover {
  background-color: #F0F0F0;
}

.page-wrapper__content {
  overflow-y: auto;
  padding: 16px;
}

.page-wrapper__footer {
  grid-column: 2 / -1;
  padding: 16px;
  border-top: 1px solid #F0F0F0;
  text-align: right;
}

.post-result {
  margin-bottom: 8px;
}

.post-result__container {
  display: flex;
}

.post-result__thumbnail {
  min-width: 70px;
  height: 50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 8px;
}

.post-result__meta {
  font-size: 0.75rem;
}

.comments-layout__container > .comments-partial {
  background-color: #F0F0F0;
  padding: 4px;
  border-radius: 4px !important;
}

.comments-partial {
  margin-bottom: 8px;
  font-size: 0.75rem;
}

.comments-partial__body {
  color: #000000;
  margin-bottom: 16px;
  margin-left: 18px;
  font-size: 0.8rem;
}

.comments-partial__body a {
  color: blue;
}

.comments-partial__body p {
  margin: 4px 0;
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

.comments-partial__details[open] > summary:before,
.comments-partial__details > summary:before {
  display: inline-flex;
  justify-content: center;
  pointer-events: auto;
  background-color: #023047;
  color: #FFB703;
  width: 14px;
  height: 14px;
  line-height: 14px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.comments-partial__details > summary:before {
  content: "+";
}

.comments-partial__details[open] > summary:before {
  content: "-";
  font-size: 14px;
  line-height: 12px;
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
<div class="page-wrapper">
  <aside class="page-wrapper__sidebar">
    <a href="/">
      <img class="logo" src="{{logo.color}}" />
    </a>
    <div class="subreddits">
      {{#each subreddits}}
        <a href="//{{../config.hostname}}/{{this.to}}">
          {{this.text}}
        </a>
      {{/each}}
    </div>
  </aside>
  <article class="page-wrapper__content">
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
  </article>
  <footer class="page-wrapper__footer">
    {{#if data.data.before}}
      <a href="{{data.data.prevUrl}}">
        <button>
          prev
        </button>
      </a>
    {{/if}}
    {{#if data.data.after}}
      <a href="{{data.data.nextUrl}}">
        <button>
          next
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
