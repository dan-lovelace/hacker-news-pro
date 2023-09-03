import { ReactNode } from "react";

import { TOptions } from "@hnp/types";
import {
  Box,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import BackButton from "../../components/BackButton";
import { useAppContext } from "../../contexts/app";
import { PAGE_CONTENT_WIDTH } from "../../lib/vars";

function Section({
  control,
  children,
}: {
  control: ReactNode;
  children: ReactNode;
}) {
  return (
    <Box>
      {control}
      <Box sx={{ ml: 6 }}>
        <Typography variant="subtitle2">{children}</Typography>
      </Box>
    </Box>
  );
}

export default function OptionsPage() {
  const { options, handleOptionChange } = useAppContext();

  const handleChange =
    (option: keyof TOptions) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleOptionChange(option, event.target.checked);
    };

  return (
    <Stack
      className="options-page"
      spacing={1}
      sx={{ width: PAGE_CONTENT_WIDTH }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <BackButton />
        <Typography variant="h6">Options</Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="caption">Basic</Typography>
        <Section
          control={
            <FormControlLabel
              control={
                <Switch
                  checked={options.developerMode}
                  onChange={handleChange("developerMode")}
                />
              }
              label="Developer mode"
            />
          }
        >
          {/* Enables printing of useful information to the console such as the
          current view's context. This saves time debugging and developing new
          themes. */}
          Enhance debugging and theme development with valuable console
          insights, including the current view's context.
        </Section>
      </Stack>
    </Stack>
  );
}
