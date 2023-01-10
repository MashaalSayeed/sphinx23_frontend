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

function Profile() {
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
              <ListItemText primary="Name : " secondary="" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Year : " />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Course : " />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Events Enrolled : " />
            </ListItem>
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
