import React from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";
export default function Rating({rating,add}) {
  return (
    <div className={`circleRating ${add}`}>
            <CircularProgressbar 
                value={rating}
                maxValue={10}
                text={rating.toFixed(1)}
                styles={buildStyles({
                    pathColor: rating < 5? "red": rating < 7? "orange": "green",
                    textSize: '40px',
                })}
            />
    </div>
  )
}
