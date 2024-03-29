import { Link, useNavigate } from "react-router-dom";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  Avatar,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from "@mui/material";

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const { userInfo } = useContext(UserContext);
  const firstName = userInfo === null ? "" : userInfo.firstName;
  const avatar = userInfo === null ? "" : userInfo.avatar;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const { removeUser, setCartInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    window.localStorage.removeItem("cart");
    setCartInfo(null);
    navigate("/");
  };

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={handleToggle}
        >
          {" "}
          <Avatar alt={firstName} src={avatar} sx={{ width: 32, height: 32 }}>
            {firstName[0]}
          </Avatar>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        to="/profile"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        to="/orders"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Orders
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
