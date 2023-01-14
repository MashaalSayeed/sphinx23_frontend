import React from "react";

import {
  Card,
  Stack,
  Button,
  TextField,
  ListItem,
  ListItemText,
  Divider,
  List,
} from "@mui/material";
import { useSelector } from "react-redux";

function Profile() {
  const currUser = useSelector((state) => state.auth.curruser.profile);

  return (
    <div className="profile-main">
      <Card variant="outlined">
        {/* <div
          className="tab-line"
          style={{ width: "95%", margin: "8px auto" }}
        ></div> */}
        <div className="user-profile-content">
          <List component="nav" aria-label="mailbox folders">
            <ListItem>
              <ListItemText primary={`Name :  ${currUser.name}`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Email : ${currUser.email}`} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary={`Mobile : ${currUser.mobileNumber}`} />
            </ListItem>
            <Divider />
            <Divider />
            <ListItem>
              <ListItemText primary="Age : " />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Valid till : " />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="OTHER DETAILS" />
            </ListItem>
          </List>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
