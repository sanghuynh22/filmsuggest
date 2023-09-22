"use client";
import React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
export default function Header() {
	return (
		<div className="header">
			<Link href="/">
				<img src="/logo.png" />
			</Link>
			<SearchBar />
		</div>
	);
}
