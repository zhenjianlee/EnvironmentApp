import chart from '../assets/pm25chart.png'
import styles from './Advisory.module.css';


const Advisory = () => {


    return (
    <div className={styles.Advisory}>
            <h1> PM2.5 Index for Reference</h1>
            <div className={styles.container}>
                <div name="empty spacing"></div>
                <img src = {chart} className={styles.img}/>
                <div name="empty spacing"></div>
            </div>
            <p>Source from https://www.health.ny.gov/environmental/indoors/air/</p>
    </div>
    );

}

export default Advisory;