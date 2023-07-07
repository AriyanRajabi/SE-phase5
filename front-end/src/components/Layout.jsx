import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./menu";
import { useState } from "react";
import { Box } from "@mui/material";

export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="wrapper">
      <Header openMenu={() => setOpen(true)} />
      <Menu open={open} setOpen={setOpen} />
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Outlet />
      </Box>
    </div>
  );
}
