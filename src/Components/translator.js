import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";


export default function Translator(){

const [input, setInput] = useState('');
const [selectedLanguage, setSelectedLanguage] = useState('');

const translateText = () =>{
    axios.post(`https://libretranslate.de/detect`, {
        q:input
    }).then((response) =>{
        setSelectedLanguage(response.data[0].language);
    })
}

useEffect(()=>{
    translateText()
}, [input]);


    return(
        <>

        <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={input} onChange={(e) =>{
            setInput(e.target.value)
        }} />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={selectedLanguage} />
        </div>
        </>
    )
}