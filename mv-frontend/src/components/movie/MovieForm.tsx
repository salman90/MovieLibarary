import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

const MovieForm = () => {
  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [publishedYear, setPublishedYear] = useState("");

  return (
    <form>
      <FormControl>
        <InputLabel>Movie Title</InputLabel>
        <Input id="name" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          Please enter the title of the movie
        </FormHelperText>
      </FormControl>
    </form>
  );
};

export default MovieForm;
