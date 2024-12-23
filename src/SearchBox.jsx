import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SearchBox = ({updateInfo}) => {
   const [error, setError] = useState(false);
   const [city, setCity] = useState("");
    const API_URL =
      "https://api.openweathermap.org/data/2.5/weather";

    const API_KEY = "1e1aa1875cf3df39d052eaa0c37bbaf2";

    let getWeatherInfo = async () => {
         try {
           let response = await fetch(
             `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
           );
           const jsonResponse = await response.json();

           let result = {
             city: city,
             temp: jsonResponse.main.temp,
             tempMin: jsonResponse.main.temp_min,
             tempMax: jsonResponse.main.temp_max,
             humidity: jsonResponse.main.humidity,
             feelsLike: jsonResponse.main.feels_like,
             weather: jsonResponse.weather[0].description,
           };
           console.log(result);
           return result;
         } catch (error) {
            throw error;
         }
    }


    const handleChange = (e) => {
        setCity(e.target.value)
    };

    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
        setCity("");
        let newinfo = await getWeatherInfo();
        updateInfo(newinfo)
        }catch(error){
            setError("No such place in our API");
        }
    }

  return (
    <>
      <div className="SearchBox">
        <form onSubmit={handleSubmit}>
          <TextField
            id="city"
            label="City Name"
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
          />
          <br />
          <br />
          <Button variant="contained" type="submit">
            Search
          </Button>
          {error && <p style={{color: "red"}}>No such place exist!</p>}
        </form>
       
      </div>
    </>
  );
}

export default SearchBox