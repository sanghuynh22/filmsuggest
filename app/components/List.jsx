'use client'
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from 'next/link'
export default function List({type,title,id}) {
	const [movies,setMovies] = useState([])
	const [page,setPage] = useState(1)
	const [pages,setPages] = useState([1,2,3,4,5])
	const options = {
		method: 'GET',
		headers: {
		  accept: 'application/json',
		  Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY_API}`,
		}
	  };
	const handleClick = () => {
		handleGetList()
	}
	const handleClickMore = () => {
	}
	const handleGetList = async() => {
		if(type === 'trending' || type === 'more' ){
			
			  
			  fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
				.then(response => response.json())
				.then(response => setMovies(response.results))
	
		}else if(type === 'upcoming'){
			
			  fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
				.then(response => response.json())
				.then(response => setMovies(response.results))
		}else if(type ==='random'){
			const randomPage = Math.floor(Math.random() * 500)
			
			  
			  fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc`, options)
			  .then(response => response.json())
			  .then(response => setMovies(response.results))
		}	
		else if(type === 'similar'){
			
			  
			const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options)
			const result = await data.json()
			const moviesSimilar = result.results
			if(moviesSimilar.length <= 0){
				fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
				.then(response => response.json())
				.then(response => setMovies(response.results))
			}else
				setMovies(moviesSimilar)
		}
	}
	const handleUpdatePage = (page) => {
		
		  fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`, options)
			.then(response => response.json())
			.then(response => setMovies(response.results))
			.then(response =>setPage(page))
	}
	const handleClickNext = () => {
		if (page >= 5) return;
		setPage(page + 1);
		handleUpdatePage(page + 1);
		  
	}
	const handleClickPrev = () => {
		if (page > 1) {
			setPage(page - 1);
			handleUpdatePage(page - 1);
		  }
	}
	useEffect(() => {
		handleGetList()
	},[])
	return <div className="list">
		<h3>{title}</h3>
		<div className="cards">
			{ type !== "more" ? movies?.slice(0,10).map((m) => {
				return(
					<Card key={Math.random()} type={type} id={m.id} title={m.title} overview={m.overview} poster_path={m.poster_path} release_date={m.release_date} vote_average={m.vote_average}/>
				)
			}):
			movies.map((m) => {
				return(
					<Card key={Math.random()} type={type} id={m.id} title={m.title} overview={m.overview} poster_path={m.poster_path} release_date={m.release_date} vote_average={m.vote_average}/>
				)
			})
			}
		</div>
		{type==="random" &&
				<div className="random_button" onClick={handleClick}>
					<p>Phims khác</p>
				</div>
		}
		{type=="trending" &&
				<Link href="/movies/more" className="random_button" onClick={handleClickMore}>
					<p>More</p>
				</Link>
		}
		{type=="more" &&
				<div className="pagination">
					<p onClick={handleClickPrev} className={`arrow ${page <= 1 && 'disabled'}`}>&lt;</p>
					{pages.map((p) => {
						return(<div className={`pagination_dot ${p == page && 'active'}`} key={p} onClick={() => handleUpdatePage(p)}>
							<p >{p}</p>
						</div>)
					})}
					<p onClick={handleClickNext}className={`arrow ${page === 5 && 'disabled'}`}>&gt;</p>

				</div>
		}
	</div>;
}
