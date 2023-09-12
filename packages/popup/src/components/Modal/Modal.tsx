import { Box, ModalProps, Modal as MuiModal } from "@mui/material";

export default function Modal({ children, ...props }: ModalProps) {
  return (
    <MuiModal {...props}>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "primary.main",
          borderRadius: 1,
          left: "50%",
          padding: 2,
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
}
