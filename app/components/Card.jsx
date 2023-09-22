import React from 'react'
import Rating from './Rating'
import Link from 'next/link'
export default function Card({type,id, title, overview, poster_path, release_date, vote_average}){
    return(     
    <Link href={`/movies/${id}`} className="card" style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${poster_path})`}}>
        <div className="card_front" >
            {type === 'upcoming' && <div className="card_font_date">{release_date}</div>}
            <div className="card_font_title">
                <p>{title}</p>
            </div>
        </div>
        <div className="card_back">
            <div className="card_back_title">
                <p>{title}</p>
            </div>
            <div className="card_back_date">
                date: {release_date}
            </div>
            <div style={{display: 'flex', gap:10}}>
            voted: 
            <Rating rating={vote_average}/>
            </div>
            <div className="card_back_overview">
                {overview}
            </div>
        </div>
    </Link>
  )
}
