import { Box, SxProps, useTheme } from "@mui/material";

export default function ModifiedIndicator({
  modified,
  sx,
}: {
  modified: boolean;
  sx?: SxProps;
}) {
  const { transitions } = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "info.main",
        borderRadius: "100%",
        height: 8,
        opacity: modified ? 1 : 0,
        pointerEvents: "none",
        position: "absolute",
        right: "0.5rem",
        top: "50%",
        transform: "translateY(-50%)",
        transition: `all ${transitions.duration.shortest}ms ${transitions.easing.easeInOut}`,
        width: 8,
        ...sx,
      }}
    />
  );
}
