import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import data from "./battle.json";
import { Button } from "@mui/material";
import swal from "sweetalert";

const Battleground = () => {
  const fields = {
    variant: "outlined",
    fullWidth: true,
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    mobile: "",
    game: "",
  });
  const Validation = (arr) => {
    if (
      arr.name === "" ||
      arr.email === "" ||
      arr.mobile === "" ||
      arr.game === ""
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Validation(values)) {
      swal("Enter all details", "", "error");
      return;
    } else {
      const { name, email, mobile, game } = values;
      const res = await fetch(
        "https://advik-cb2ad-default-rtdb.firebaseio.com/Battleground.json",
        {
          method: "POST",
          Headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            mobile,
            game,
          }),
        }
      );
      if (res.status === 200) {
        swal("Submitted", "", "success");
        setValues({ name: "", email: "", mobile: "", game: "" });
      } else {
        swal("Error Happeend", "Try Again", "error");
      }
      console.log(res);
    }
  };
  return (
    <div>
      <h1>BattleGround Registration</h1>
      <Grid
        container
        pt={4}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <TextField
            name="name"
            label="Name"
            {...fields}
            onChange={handleChange}
            value={values.name}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="email"
            label="Email"
            {...fields}
            onChange={handleChange}
            value={values.email}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            name="mobile"
            label="Mobile No"
            {...fields}
            onChange={handleChange}
            value={values.mobile}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="funzone">Game</InputLabel>
            <Select
              labelId="funzone"
              name="game"
              label="Game"
              value={values.game}
              onChange={handleChange}
            >
              {data.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={handleSubmit}>
            submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Battleground;
