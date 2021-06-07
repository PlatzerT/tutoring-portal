import React from 'react';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
const root = process.cwd();

export default function TestPage({ news }) {
	console.log(path);
	async function download() {
		const res = await fetch('http://localhost:3000/api/test');
		console.log(res);
		res.blob().then((blob) => {
			let url = window.URL.createObjectURL(blob);
			let a = document.createElement('a');
			a.href = url;
			a.download = 'test.pdf';
			a.click();
			a.remove();
		});
	}
	return (
		<div>
			<button onClick={(e) => download()}>DL</button>
			<a href="/contacts/PHILIPP__ph_pl.at/MEDT/article-fill.svg" download>
				ok
			</a>
			<br></br>
			<a href={`${root}/news/1/test.jpg`} download>
				DOWNLOAD
			</a>
		</div>
	);
}

export async function getStaticProps() {
	const dir = path.join(root, 'news', '1');
	const filenames = fs.readdirSync(dir);
	const news = filenames.map((filename) => {
		const filePath = path.join(dir, filename);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		return {
			filename,
			content: fileContents,
		};
	});

	return {
		props: {
			news,
		},
	};
}
