import { useNavigate } from "react-router-dom";

import styles from './Layout.module.css'

const Layout = () => {

    const nav = useNavigate();

    return (
        <div >

            <h1 className={styles.title} >Singapore Live Environmental Readings App</h1>

            <h2 > DataGovSG provides live data. This App obtains live data via API .get and stores it on your machine.
            </h2>
            <p>Please visit "https://beta.data.gov.sg/collections/1394/view" for more info.</p>
            <div className = {styles.container}>
            <p name="left blank"></p>

            <p className ={styles.p}>The PM2.5 monitor is now available.<br/> Please click  
            <button className={styles.button} onClick={()=>{nav("/pm25")}}>Here</button>
            to navigate to data. </p>

            <p className ={styles.p}>More features are on their way! Stay tuned.
                </p>

            <p className ={styles.p}> This app is developed by software engineering enthusiast ZJ , please visit https://github.com/zjzjzjzjzjzjzj and support me! </p>

            <p name="left blank"></p>



        </div>
            
        </div>
    )

}

export default Layout;