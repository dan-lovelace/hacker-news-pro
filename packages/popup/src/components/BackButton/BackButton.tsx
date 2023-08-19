import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../../lib/routes";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(ROUTES.HOME.path);
  };

  return (
    <IconButton aria-label="back" title="Go back" onClick={handleBackClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}
