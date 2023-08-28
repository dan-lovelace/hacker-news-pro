import { ReactNode } from "react";

import { browser } from "@hnp/core";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import BackButton from "../../components/BackButton/BackButton";
import { PAGE_CONTENT_WIDTH } from "../../lib/vars";

const bmacSrc = browser.runtime.getURL("img/bmac.png");

function Section({
  children,
  heading,
}: {
  children: ReactNode;
  heading: string;
}) {
  return (
    <Box>
      <Typography variant="body1">{heading}</Typography>
      <Box sx={{ mt: 0.5 }}>{children}</Box>
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
      <Stack spacing={1}>
        <Typography variant="caption">Contact</Typography>
        <Section heading="Need help or have a suggestion? Drop us a line by opening a GitHub issue. We're here to listen and make things better!">
          <a
            href="https://github.com/dan-lovelace/hacker-news-pro/issues/new"
            target="_blank"
          >
            <Button variant="outlined">Create GitHub issue</Button>
          </a>
        </Section>
        <Section heading="Need instant help or want to chat with the community? Join us on Discord for quick assistance and friendly discussions.">
          <a href="https://discord.gg/4RaYMCJQWV" target="_blank">
            <Button variant="outlined">Join Discord</Button>
          </a>
        </Section>
      </Stack>
      <Divider />
      <Stack spacing={1}>
        <Typography variant="caption">Contributing</Typography>
        <Section heading="If coding's your forte, your contributions are more than welcome. Get involved by diving into the codebase.">
          <a
            href="https://github.com/dan-lovelace/hacker-news-pro"
            target="_blank"
          >
            <Button variant="outlined">Start collaborating</Button>
          </a>
        </Section>
        <Section heading="If you're finding the extension helpful and considering a monetary contribution, the easiest way is through Buy Me a Coffee.">
          <a href="https://www.buymeacoffee.com/danlovelace" target="_blank">
            <img
              src={bmacSrc}
              alt="Buy Me A Coffee"
              style={{
                aspectRatio: "1 / .276",
                height: "40px",
              }}
            />
          </a>
        </Section>
      </Stack>
    </Stack>
  );
}
