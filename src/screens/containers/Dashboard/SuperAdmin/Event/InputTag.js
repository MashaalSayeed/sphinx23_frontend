import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState, useEffect } from "react";
import { getUsersId } from "../../../../../api";

const Tags = ({ disabled, data, handleDelete }) => {
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
        {!disabled && (
          <Cancel
            sx={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(data);
            }}
          />
        )}
      </Stack>
    </Box>
  );
};

export default function InputTag({ disabled, useData, setEventCoor }) {
  // //console.log(useData);
  const [tags, SetTags] = useState(useData);
  // useEffect(() => {
  //   SetTags(useData);
  //   // if (submitV) post_Create();
  // }, []);
  //console.log(tags);
  const tagRef = useRef();
  const handleDelete = (value) => {
    const newtags = tags.filter((val) => val !== value);
    // useData = useData.filter((val) => val !== value);
    SetTags(newtags);
    setEventCoor(newtags);
  };
  const [inputEmail, setEmail] = useState("");
  const handleChange = (e) => {
    ////console.log(e.target.value);
    if (e.target.value[e.target.value.length - 1] === " ") {
      handleOnSubmit(e);
      setEmail("");
      return;
    }
    setEmail(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (inputEmail === "") return;
    SetTags([...tags, tagRef.current.value]);
    setEventCoor([...tags, tagRef.current.value]);
    tagRef.current.value = "";
    setEmail("");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <form onSubmit={handleOnSubmit}> */}
      <TextField
        inputRef={tagRef}
        fullWidth
        variant="standard"
        size="small"
        onChange={handleChange}
        value={inputEmail}
        disabled={disabled}
        onBlur={(event) => handleOnSubmit(event)}
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
              {useData.map((data, index) => {
                return (
                  <Tags
                    disabled={disabled}
                    data={data}
                    handleDelete={handleDelete}
                    key={index}
                  />
                );
              })}
              {/* {useData &&
                useData.map((data, index) => {
                  return (
                    <Tags data={data} handleDelete={handleDelete} key={index} />
                  );
                })} */}
            </Box>
          ),
        }}
      />
      {/* </form> */}
    </Box>
  );
}
