"use client";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
export default function SearchBar() {
	const [text, setText] = useState("");
	const [items,setItems] = useState([]);
	const searchTrigger = () => {
		if(text.trim() !== null){
			const options = {
				method: 'GET',
				headers: {
				  accept: 'application/json',
				  Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY_API}`,
				}
			  };
			  
			  fetch(`https://api.themoviedb.org/3/search/movie?query=${text}&include_adult=false&language=en-US&page=1`, options)
				.then(response => response.json())
				.then(res => setItems(res.results))
				
		}
	}
	useEffect(() => {
		searchTrigger();
	}
	,[text])
	return (
		<div className="searchbar">
			<BsSearch className="search_icon" />
			<input
				placeholder="hôm nay bạn muốn xem gì?"
				value={text}
				className="search_input"
				spellCheck="false"
				onChange={(e) => setText(e.target.value)}
			/>
			<div className="search_items">
				{items.slice(0,8).map((item) => {
					return (
						<Link href={`/movies/${item.id}`} className="search_item" key={item.id}>
							<img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} className="search_img"/>
							<p>{item.title}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
