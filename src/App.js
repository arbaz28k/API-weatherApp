import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect ,useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
 
   const [data , setdata]= useState({})
   const [InputCity, setInputCity]= useState("")
   const apiKey = "3eafd636665e582043a33021b7d5116c";



   const getWeather = (cityName) => {
     if (!cityName) return;

      let apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

      Axios.get(apiURL)
      .then((res)=>{
        console.log("response", res.data);
        setdata(res.data);
      }).catch((err)=>{
        console.log('err',err);
      })

   }

   //change input function
   const handleInputChange = (e) => {
      setInputCity(e.target.value);
   }

   //handle Click function
   const handleClick = () =>{
      getWeather(InputCity);
   }



   useEffect(()=>{
      getWeather('agra');
   }, [])

   const getTime = (timeStamp) => {
    return `${new Date(timeStamp*1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`;
   };


   //just to get weather main
  //  const n=0;

  return (
    <div className="col-md-12">

      <div className='weatherImg'>
        <h1 className='heading'>Weather App</h1>

        <div className='search-location'> 
          <input type="type" className='form-control' placeholder="Enter location"  onChange={handleInputChange} />
          <button className='btn btn-primary' type='submit' onClick={handleClick}>Search</button>
        </div>  
      </div>

      <div className='col-md-12 weather-container'>
        <div className='weather-screen' style={{display:"flex", justifyContent:"space-around" ,alignItems:"center"}}>
  
          <div className='details-container'>
            <img src='https://cdn-icons-png.flaticon.com/512/1163/1163661.png' className='weather-icon' alt=''/>
            <div className='location'>{data?.name}</div>
            <div className='temp'>{((data?.main?.temp)-273.15).toFixed()} °C</div>
            {/* <div className='humidity'>{data?.weather[n]?.main}</div> */}
          </div>

          <div className='details-container weather-details'>

            <div className='detail-block-row'>
              <div id='sunrise' className='detail-blocks'>
                <div>
                  <img className='detail-icons' src="https://cdn-icons-png.flaticon.com/512/3920/3920688.png" alt=""/>
                </div>
                <div style={{textAlign:"center"}}>
                  <div className='weather-imformation'>{getTime(data?.sys?.sunrise)}</div>
                  <label className='information-label'>sunrise</label>
                </div>
              </div>

              <div id='sunset' className='detail-blocks'>
                <div>
                  <img className='detail-icons' src="https://cdn-icons-png.flaticon.com/512/3920/3920799.png" alt=""/>
                </div>

                <div style={{textAlign:"center"}}>
                  <div className='weather-imformation'>{getTime(data?.sys?.sunset)}</div>
                  <label className='information-label'>sunset</label>
                </div>
                  
              </div>
            </div>

            <div className='detail-block-row'>

              <div id='humidity' className='detail-blocks'>
                <div>
                  <img className='detail-icons' src="https://cdn-icons-png.flaticon.com/512/5664/5664982.png" alt=""/>
                </div>
                <div style={{textAlign:"center"}}>
                  <div className='weather-imformation'>{data?.main?.humidity} </div>
                  <label className='information-label'>Humidity</label>
                </div>

              </div>

              <div id='wind' className='detail-blocks'>
                <div>
                  <img className='detail-icons' src="https://cdn-icons-png.flaticon.com/512/1585/1585400.png" alt=""/>
                </div>
                <div style={{textAlign:"center"}}>
                  <div className='weather-imformation'>{data?.wind?.speed}</div>
                  <label className='information-label'>Wind</label>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
