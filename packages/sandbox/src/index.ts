// WARNING: import MESSAGE_ACTIONS using absolute path because
// webextension-polyfill will throw an error otherwise
import { MESSAGE_ACTIONS } from "@hnp/core/src/message";
import { TSandboxMessage, TStylesheet, TThemeChanged } from "@hnp/types";
import Handlebars from "handlebars";

import "./helpers";

window.addEventListener("message", (message) => {
  const { data, origin, source } = message;
  const { context, event }: TSandboxMessage<unknown> = data;
  const { action, options, value } = event;

  if (value === null) {
    return source?.postMessage(event, { targetOrigin: origin });
  }

  const emptyThemeMessage = () =>
    source?.postMessage(
      {
        action,
        value: {
          style: "",
          compiled: "",
        },
      },
      { targetOrigin: origin },
    );

  if (options?.themesEnabled === false) {
    return emptyThemeMessage();
  }

  switch (action) {
    case MESSAGE_ACTIONS.UPDATE_THEME: {
      const { inputs } = value;
      const viewInputValue = inputs.views[context.config.view];

      if (!viewInputValue) return emptyThemeMessage();

      const {
        components,
        style: { stylesheets },
      } = inputs ?? [];
      for (const component of components) {
        Handlebars.registerPartial(component.id, component.template);
      }

      const compiled = Handlebars.compile(viewInputValue.template, {
        preventIndent: true, // ensure `pre` tags are rendered correctly
      })(context);
      const styleTemplates: TStylesheet[] = stylesheets.map((stylesheet) => ({
        ...stylesheet,
        template: Handlebars.compile(stylesheet.template)(context),
      }));

      const messageValue: TThemeChanged = {
        style: {
          ...inputs.style,
          stylesheets: styleTemplates,
        },
        compiled,
      };

      source?.postMessage(
        {
          action,
          value: messageValue,
        },
        { targetOrigin: origin },
      );
      break;
    }
  }
});
