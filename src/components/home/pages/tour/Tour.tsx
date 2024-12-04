"use client";

import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const Tour = () => {
  const [price, setPrice] = useState<string>("");
  const [value, setValue] = useState(null);

  const handleChange = (event: SelectChangeEvent) => {
    setPrice(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "50px" }}>
      <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={12}>
          <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Giá 
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={price}
                label="Name"
                onChange={handleChange}
              >
                <MenuItem value={10}>ten </MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Chọn ngày" value={value} />
          </LocalizationProvider>
        </Grid>
        <Grid size={12}></Grid>
      </Grid>
    </Box>
  );
};

export default Tour;
