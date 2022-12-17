import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Navigations from "./AppBar";
import Alert from "@mui/material/Alert";

export default function Translator() {
  const [input, setInput] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectLanguage, setSelectedLanguage] = useState("en");
  const [selectLanguageOut, setSelectedLanguageOut] = useState("it");


  const detectLanguage = async () => {
    const response = await axios.post(`https://libretranslate.de/detect`, {
      q: input,
    });

    setSelectedLanguage(response.data[0].language);
    setDetectedLanguage(response.data[0].language);
  };

  const url = {
    countries: "https://disease.sh/v3/covid-19/countries/",
  };

  const translateSentences = async () => {
    const response = await axios.post(`https://libretranslate.de/translate`, {
      q: input,
      source: selectLanguage,
      target: selectLanguageOut,
    });

    setTranslation(response.data.translatedText);
  };

  const handleChangeInput = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleChangeOutput = (e) => {
    setSelectedLanguageOut(e.target.value);
  };

  useEffect(() => {
    detectLanguage().then(translateSentences());
  }, [input]);

  useEffect(() => {
    translateSentences();
  }, [selectLanguageOut]);

  useEffect(() => {
    translateSentences();
  }, [selectLanguage]);

  useEffect(() => {
    if (detectLanguage != selectLanguage) {
      <Alert severity="info">This is an info alert — check it out!</Alert>;
    }
  }, [input, translation]);

  return (
    <>
      <Navigations />
      <div></div>
      <Box>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={8}>
            <Card sx={{ maxWidth: 600 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  src={`https://flagcdn.com/${selectLanguage}.svg`}
                  srcset={[
                    `https://flagcdn.com/${selectLanguage}.svg 2x`,
                    `https://flagcdn.com/${selectLanguage}.svg 3x`,
                  ]}
                />
                <CardContent>
                  <FormControl sx={{ m: 3 }} variant="standard">
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={selectLanguage}
                      onChange={handleChangeInput}
                    >
                      <MenuItem value={"it"}>it</MenuItem>
                      <MenuItem value={"en"}>en</MenuItem>
                      <MenuItem value={"de"}>de</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
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
                  src={`https://flagcdn.com/${selectLanguageOut}.svg`}
                  srcset={[
                    `https://flagcdn.com/${selectLanguageOut}.svg 2x`,
                    `https://flagcdn.com/${selectLanguageOut}.svg 3x`,
                  ]}
                />
                <CardContent>
                  <FormControl sx={{ m: 2 }} variant="standard">
                    <InputLabel id="demo-customized-select-label"></InputLabel>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={selectLanguageOut}
                      onChange={handleChangeOutput}
                    >
                      <MenuItem value={"it"} defaultChecked>
                        it
                      </MenuItem>
                      <MenuItem value={"en"}>en</MenuItem>
                      <MenuItem value={"de"}>de</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label=""
                    variant="outlined"
                    value={translation}
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
