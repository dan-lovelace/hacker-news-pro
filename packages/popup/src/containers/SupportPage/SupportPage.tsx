import { ReactNode } from "react";

import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import BackButton from "../../components/BackButton/BackButton";
import { PAGE_CONTENT_WIDTH } from "../../lib/vars";

function Section({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <Box sx={{ ":not(:last-child)": { mb: 2 } }}>
      <Typography variant="body1">{heading}</Typography>
      <Box sx={{ mt: 1 }}>{children}</Box>
    </Box>
  );
}

export default function SupportPage() {
  return (
    <Stack
      className="support-page"
      spacing={1}
      sx={{ width: PAGE_CONTENT_WIDTH }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <BackButton />
        <Typography variant="h6">Support</Typography>
      </Stack>
      <Box>
        <Typography variant="caption">Contact</Typography>
        <Section heading="Need help or have a suggestion? Drop us a line by opening a GitHub issue. We're here to listen and make things better!">
          <a
            href="https://github.com/dan-lovelace/hacker-news-pro/issues/new"
            target="_blank"
          >
            <Button variant="outlined">Create new GitHub issue</Button>
          </a>
        </Section>
      </Box>
      <Divider />
      <Box>
        <Typography variant="caption">Contributing</Typography>
        <Section heading="If you're finding the extension helpful and considering a monetary contribution, the easiest way is through Buy Me a Coffee.">
          <a href="https://www.buymeacoffee.com/danlovelace" target="_blank">
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{
                aspectRatio: "1 / .276",
                height: "36.5px",
              }}
            />
          </a>
        </Section>
        <Section heading="If coding's your forte, your contributions are more than welcome. Get involved by diving into the codebase.">
          <a
            href="https://github.com/dan-lovelace/hacker-news-pro"
            target="_blank"
          >
            <Button variant="outlined">Start collaborating</Button>
          </a>
        </Section>
      </Box>
    </Stack>
  );
}
