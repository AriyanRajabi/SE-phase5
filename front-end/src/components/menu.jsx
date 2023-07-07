import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export default function Menu({ open, setOpen }) {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["درخواست پکیچ درمانی", "سوابق درمانی", "ارتباط با متحصص سلامت"].map(
          (text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} sx={{ textAlign: "right" }} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["پیام ها", "پشتیبانی"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} sx={{ textAlign: "right" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
      {list()}
    </Drawer>
  );
}
