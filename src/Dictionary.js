import React, {useState} from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import "./Dictionary.css";

export default function Dictionary(){
    let [keyword, setKeyword]= useState("");
    let [results, setResults]= useState(null);
    let [photos, setPhotos]= useState(null);

    function handleResponse(response){
console.log(response.data[0]);
setResults(response.data[0])
    }

    function handlePexelsResponse(response){
setPhotos(response.data.photos);
    }
    function search(event){
        event.preventDefault();

        let apiUrl=`https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
        axios.get(apiUrl).then(handleResponse);

        let pexelsApiKey="563492ad6f91700001000001f1c53f55614a4372875b49cf5e81d408";
        let pexelsApiUrl=`https://api.pexels.com/v1/search?query=${keyword}&per_page=9`;
   axios.get(pexelsApiUrl,{headers:{Authorization:`Bearer ${pexelsApiKey}`}}).then(handlePexelsResponse);
    }
    function handleKeywordChange(event){
setKeyword(event.target.value);
    }
    return(
        <div className="Dictionary">
<form onSubmit={search} className="SearchEngine">
    <input type="search" placeholder="Search for a word" onChange={handleKeywordChange} className="SearchForm"/> <input type="submit" value="Search" className="SearchButton"/> 
</form>
<Results results={results}/>
<Photos photos={photos} />
        </div>
    );
}