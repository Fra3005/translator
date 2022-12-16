import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Navigations from "./AppBar";
export default function Translator() {
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");


  const detectLanguage = async () => {
    const response = await axios
      .post(`https://libretranslate.de/detect`, {
        q: input,
      });
      
      setSelectedLanguage(response.data[0].language);
     
  };


  useEffect(() => {
    detectLanguage();
  }, [input]);

  return (
    <>
      <Navigations />
      <div></div>
      <Box>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={8}>
            <Card sx={{ maxWidth: 600 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="./download.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel id="demo-customized-select-label"></InputLabel>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card sx={{ maxWidth: 600 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="src\Components\download.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <InputLabel id="demo-customized-select-label"></InputLabel>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={selectedLanguage}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
