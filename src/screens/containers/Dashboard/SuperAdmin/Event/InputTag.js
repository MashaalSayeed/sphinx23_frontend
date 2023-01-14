import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { getUsersId } from "../../../../../api";

const Tags = ({ data, handleDelete }) => {
  return (
    <Box
      sx={{
        background: "#DFDFDF",
        height: "100%",
        padding: "0.4rem",
        margin: "0 0.5rem 0.5rem 0",
        justifyContent: "center",
        alignContent: "center",
        color: "black",
        borderRadius: "5px",
      }}
    >
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: "pointer" }}
          onClick={() => {
            handleDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};

export default function InputTag({ setEventCoor }) {
  const [tags, SetTags] = useState([]);
  const tagRef = useRef();
  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    SetTags(newtags);
    setEventCoor(newtags);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    SetTags([...tags, tagRef.current.value]);
    setEventCoor([...tags, tagRef.current.value]);
    tagRef.current.value = "";
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleOnSubmit}>
        <TextField
          inputRef={tagRef}
          fullWidth
          variant="standard"
          size="small"
          sx={{ margin: "1rem 0" }}
          margin="none"
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  margin: "0 0.2rem 0 0",
                  display: "flex",
                }}
              >
                {tags.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })}
              </Box>
            ),
          }}
        />
      </form>
    </Box>
  );
}
