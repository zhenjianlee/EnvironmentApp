import styles from "./Pm25.module.css";

function Pm25({ log , time , loadData, handlerMinutes, isLoading }) {
  // ++ import log as an object
  // console.log("log",log)
  // console.log("u_timestamp", log.update_timestamp)
  // console.log("readings" ,log.readings.pm25_one_hourly)

  //++ import log as an array of object
  // console.log("index 0",log[0].readings.pm25_one_hourly)

  return (
    <div>

      <h2 className={styles.countdown}> Countdown :{time} seconds or {(time/60).toFixed(1)} minutes or {(time/60/60).toFixed(1)} hours </h2>

      <button className={styles.button} onClick={loadData}>GET Live Data Manually</button>
      <button className={styles.button} onClick={() => handlerMinutes() }>Change Countdown Duration</button>
   
      <h3 className={styles.title}>PM2.5 Readings (µg/m³)</h3>

      {isLoading && <p>Data is Loading!</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Date Time UTC</th>
            <th>West</th>
            <th>East</th>
            <th>Central</th>
            <th>South</th>
            <th>North</th>
          </tr>
        </thead>
        <tbody>
          {log.length > 0 &&
            log.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.update_timestamp} </td>
                <td>{item.readings.pm25_one_hourly.west}</td>
                <td>{item.readings.pm25_one_hourly.east}</td>
                <td>{item.readings.pm25_one_hourly.central}</td>
                <td>{item.readings.pm25_one_hourly.south}</td>
                <td>{item.readings.pm25_one_hourly.north}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <p> DataGovSG https://beta.data.gov.sg/collections/1394/view provides data on hourly basis.<br/> You may set the countdown timer to refresh faster if you wish.</p>

    </div>
  );
}

export default Pm25;

// Using map function
/*



*/

// Simple Table

/*

<h3> Singapore PM2.5 Readings (µg/m³)</h3>
<table>
    <thead>
        <tr> 
            <th>Time </th>
            <th>West</th>
            <th>East</th>
            <th>Central</th>
            <th>South</th>
            <th>North</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{log.update_timestamp }</td>
            <td>{log.readings.pm25_one_hourly.west} </td>
            <td>{log.readings.pm25_one_hourly.east} </td>
            <td>{log.readings.pm25_one_hourly.central}</td>
            <td>{log.readings.pm25_one_hourly.south} </td>
            <td>{log.readings.pm25_one_hourly.north} </td>
        </tr>
    </tbody>
</table>

*/
