"use client";
import Rating from "@/app/components/Rating";
import React, { useEffect, useState } from "react";
import { getNameGeners } from "@/app/utils/geners";
import Header from "@/app/components/Header";
import List from "@/app/components/List";
export default function page({ params }) {
	const [detail, setDetail] = useState(null);
	const getDetail = () => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTdiZDM3NTViNjg4NDQ4NDA5YWY1NDY4MDI0YjY2ZSIsInN1YiI6IjY1MGMyMjk5MmM2YjdiMDBjNGZkZGYwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NNZbxeLCWEzzwOWMYKn67Q-FI5zRDGobLemokoi-r8M",
			},
		};

		fetch(
			`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => setDetail(response));
	};
	useEffect(() => {
		getDetail();
	}, []);
	return (
		<>
			<Header />

			{detail && (
				<div className="detail">
					<div className="detail_info">
						<div className="detail_left">
							<img
								src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
								className="detail_img"
							/>
						</div>
						<div className="detail_right">
							<div className="detail_title">
								<p>{detail?.title}</p>
							</div>
							<div className="detail_title" style={{ display: "flex", gap: 10, alignItems: "center" }}>
								<p>Ngày ra mắt:</p>
								<p>{detail?.release_date}</p>
							</div>
							<div className="detail_geners">
								<p>Thể loại:</p>
								{getNameGeners(detail?.genres).map((ge) => {
									return (
										<div className="detail_genre" key={Math.random()}>
											{ge}
										</div>
									);
								})}
							</div>
							<div style={{ display: "flex", gap: 10, alignItems: "center" }}>
								<p> Vote:</p>
								<Rating rating={detail?.vote_average} add={"bigger"} />
							</div>
							<div className="detail_title">
								<p style={{fontSize:"1.5rem",textDecoration:"underline",marginBottom:10}}> Tóm tắt:</p>
								<p>{detail?.overview}</p>
							</div>
							<div className="detail_buttons">
								<div className="detail_button">
									<p>Xem phim</p>
								</div>
								<div className="detail_button">
									<p>xem trailer</p>
								</div>
							</div>
						</div>
					</div>
					<List type="similar" title="Phim tương tự" id={params.id} />
				</div>
			)}
		</>
	);
}
