import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES, initialRedirectState } from "../../lib/routes";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.state === initialRedirectState) {
      navigate(ROUTES.HOME.path);
    } else {
      navigate(-1);
    }
  };

  return (
    <IconButton aria-label="back" title="Go back" onClick={handleBackClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}
