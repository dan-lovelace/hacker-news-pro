import { useEffect, useState } from "react";

import {
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import { useToastContext } from "../../contexts/toast";

export default function HomePage() {
  const [initialized, setInitialized] = useState<boolean>(false);
  const { notify } = useToastContext();

  useEffect(() => {
    async function init() {
      // TODO: initialize options
      setInitialized(true);
    }

    init();
  }, []);

  return (
    <>
      {initialized && (
        <Stack className="options-page">
          <Typography variant="h6">Options</Typography>
          <Typography variant="caption">Basic</Typography>
          <FormGroup>
            <FormControlLabel control={<Switch />} label="Enable extension" />
            <FormControlLabel
              control={<Switch />}
              label="Block default Hacker News CSS"
            />
          </FormGroup>
          <Typography variant="caption">Advanced</Typography>
        </Stack>
      )}
    </>
  );
}
