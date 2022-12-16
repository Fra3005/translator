import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Translator(){

const [input, setInput] = useState('');
const [selectedLanguage, setSelectedLanguage] = useState('');

const translateText = () =>{
    axios.post(`https://libretranslate.de/detect`, {
        q:input
    }).then((response) =>{
        setSelectedLanguage(response.data);
    })
}

useEffect(()=>{
    translateText()
}, [input]);


    return(
        <>

        <div>
           
        </div>
        </>
    )
}