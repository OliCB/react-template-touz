import { Box, Button, Stack, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: "#f6f7f9", minHeight: "100vh" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ backgroundColor: "#444444", color: "#cdcdcd", padding: 2 }}
      >
        <Typography variant="h4">Monitoring</Typography>
        <Stack direction="row" gap={1}>
          <Button
            variant="text"
            sx={{ textDecoration: "underline", color: "#cdcdcd" }}
            onClick={() => navigate("/")}
          >
            Processus
          </Button>
          <Button
            variant="text"
            sx={{ textDecoration: "underline", color: "#cdcdcd" }}
            onClick={() => navigate("/email")}
          >
            Courriel
          </Button>
          <Button
            variant="text"
            sx={{ textDecoration: "underline", color: "#cdcdcd" }}
            onClick={() => navigate("/email-sendgrid")}
          >
            SendGrid
          </Button>
        </Stack>
      </Stack>
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
