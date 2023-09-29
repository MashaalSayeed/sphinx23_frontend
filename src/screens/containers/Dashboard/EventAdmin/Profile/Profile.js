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
  ////console.log(currUser);
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
              <ListItemText primary={`Mobile : ${currUser.phoneNumber}`} />
            </ListItem>
            <Divider />
            <Divider />
            <ListItem>
              <ListItemText
                primary={`College Name : ${currUser.collegeName}`}
              />
            </ListItem>
            <Divider />
          </List>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
