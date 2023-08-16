// WARNING: import MESSAGE_ACTIONS using absolute path because
// webextension-polyfill will throw an error otherwise
import { MESSAGE_ACTIONS } from "@hnp/core/src/message";
import { TSandboxMessage } from "@hnp/types";
import Handlebars from "handlebars";

import "./helpers";

window.addEventListener("message", (message) => {
  const { data, origin, source } = message;
  const { context, event }: TSandboxMessage<any> = data;

  if (event.value === null) {
    return source?.postMessage(event, { targetOrigin: origin });
  }

  switch (event.action) {
    case MESSAGE_ACTIONS.UPDATE_THEME: {
      const inputValue = event.value.inputs[context.config.view];

      for (const partial of inputValue.partials) {
        Handlebars.registerPartial(partial.name, partial.template);
      }

      const compiled = Handlebars.compile(inputValue.template)(context);

      source?.postMessage(
        {
          action: event.action,
          value: {
            style: event.value.inputs.style,
            compiled,
          },
        },
        { targetOrigin: origin }
      );
      break;
    }
  }
});
