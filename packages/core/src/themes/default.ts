import { TTheme } from "@hnp/types";

const theme: TTheme = {
  version: "1.0.0",
  options: {
    disableHNStyle: true,
  },
  id: "default",
  label: "Hacker News Pro Default",
  type: "premade",
  inputs: {
    style: {
      options: {
        darkMode: false,
      },
      template: `body {
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
}`,
    },
    components: [],
    views: {
      commentItem: {
        template: "",
      },
      commentList: {
        template: "",
      },
      jobItem: {
        template: "",
      },
      jobList: {
        template: "",
      },
      pollItem: {
        template: "",
      },
      storyItem: {
        template: "",
      },
      storyList: {
        template: `<div>
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
</div>`,
      },
      submit: {
        template: "",
      },
      user: {
        template: "",
      },
    },
  },
};

export default theme;
