import React ,{useState} from "react"
import './Weather.css'
const info = {
    key: "b677d67dd3f8f3b50898a46b63f32738",
    base: "http://api.openweathermap.org/data/2.5/"
}
function WeatherApp()
{

    
    const [weather,setWeather] = useState({})
    const [city,setCity]= useState('')
    
        
        const handlechange = (e)=>{
          
                if(e.key === "Enter")
                {
                    fetch(`${info.base}weather?q=${city}&appid=${info.key}`)
                .then(response => response.json())
                .then(data=>
            {  
                 setWeather(data)
                
            //  console.log(data)
            })
                }
                
           
            
        }

        const getDateBuilder = (d)=>{
            const days = ["Monday","Tuesday","wednesday","Thursday","Friday","Saturday","Sunday"]
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            let day = days[d.getDay()]
            let month = months[d.getMonth()]
            let date = d.getDate()
            let year = d.getFullYear()

            return `${date} ${day} ${month} ${year}`
        }
        const Celcius = (temp)=>{
           return (Math.round(temp - 273.15))
        }
         

        return(
        <div className = {(typeof weather.main !="undefined") ? (Celcius(weather.main.temp)>25 ? "background warm":"background"):"background"}> 
            <main>
            <div className="search-box">
                <input type="text" className="search-bar" onChange={e=>setCity(e.target.value)} placeholder="Enter Location" value={city} onKeyPress={handlechange}></input>
            </div>
             <div>
             {(typeof weather.main !="undefined") ? 
            (
            <div>
                <div className="location-box">
                   <div className="location">{weather.name} , {weather.sys.country} </div>
                   <div className="date">{getDateBuilder(new Date())} </div>     
                </div>
            <div className="weather-box">
                <div className="temp">{Celcius(weather.main.temp)}&#8451;</div>
            <div className="temp-range"><span>{Celcius(weather.main.temp_min)}&#8451;</span><span>{Celcius(weather.main.temp_max)}&#8451;</span></div>
                <div className="weather">{weather.weather[0].main}</div>
            </div>
            </div>
            ):
            ('')}
             </div>
            </main>
        </div>
        )

}
export default WeatherApp