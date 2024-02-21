import "./App.css";

//library
import dataAPI from "./api/mock_api";
import React, { useState, useEffect } from "react";
import {Link, Routes, Route ,BrowserRouter} from "react-router-dom"

//components
import Pm25 from "./components/Pm25";
import Layout from "./components/Layout";
import Advisory from "./components/Advisory";
import Error404 from "./components/Error404";

function App() {

  // Pm25 useStates Pm25
  const [minutes, setMinutes] = useState(60)          // minutes setting can be changed via prompt depending on user
  const [isLoading, setisLoading] = useState(false);  // this is for load/ not loading status
  const [log, setLog] = useState([]);                 // this is for collecting the data from API
  const [time, setTime] = useState(60*minutes);       // this is the coutdown timer that counts every 1 second. it resets after each countdown. it is for display

  // Pm25 coutdown timer function for display purpose 
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTime((seconds)=>(seconds - 1))} ,1000);
    return ()=>clearInterval(interval);
  },[]);

  // Pm25 timer function to call API and reset coutdown timer
  useEffect(()=>{
    const interval = setInterval(()=>{
      loadData();
      setTime(60*minutes)} ,1000*60*minutes);
    return ()=>clearInterval(interval);
  },[minutes]);

  // Pm25 for changing the duration of countdown (minutes)
  useEffect(()=>{
    setTime(minutes*60)},
    [minutes]);

  // Pm25 load API from GovData
  const loadData = async () => {
    try {
      setisLoading(true);
      const response = await dataAPI.get("/environment/pm25");
      console.log("Raw data", response.data); // get whole data

      // console.log("Time-->", response.data.items[0].update_timestamp) // get data as object
      // console.log("PM2.5-->",response.data.items[0].readings.pm25_one_hourly); //get data as object

      console.log("AOB", response.data.items); // get data as array of object

      // !!! This way of doing does not work when using timer. It only overwrites the first row and does not add new rows.
      /*
      The issue you're facing is due to the closure of the log state variable inside your loadData function. 
      When you use setLog(newLog); to update the state of log, it doesn't immediately change the value of log. 
      State updates in React are asynchronous, and the log variable inside your loadData function 
      still holds the old value when you push a new item into it.

      // ++ Get response as an object, and then insert data into an array. Become array of objects
      const newLog = [...log, response.data.items[0]];
      setLog(newLog);
      */
      setLog((prevLog)=> [...prevLog, response.data.items[0]]) // corrected version

      console.log("New Log", log);
    } catch (error) {
      console.log(" Error ! ! ! ", error.message);
    } finally {
      setisLoading(false);
    }
  };

  //Pm25 for changing timer countdown
  const handlerMinutes = () => {
      const input = prompt("Please enter new coutdown duration in minutes (integer only)")
      setMinutes(parseFloat(input))
      setTime((60*minutes))

  }

  return (
    <div className="App">
    
      <BrowserRouter>
        <nav className="container">
          <Link to = "/" className = "Link"> Home </Link>
          <Link to = "/pm25" className = "Link"> PM2.5 Data </Link>
          <Link to = "/advisory" className = "Link"> Advisory </Link>
       </nav>
        <Routes>
          <Route path="/" element= {<Layout/>}/>
          <Route path = "/pm25" element ={<Pm25 log={log} 
                                                    time={time} 
                                                    loadData={loadData} 
                                                    handlerMinutes={handlerMinutes} 
                                                    isLoading={isLoading}/>}/>
          <Route path = "/advisory" element = {<Advisory/>}/>
          <Route path = "*" element ={<Error404/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

